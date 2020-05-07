package com.blokaly.vhcn.services

import com.blokaly.vhcn.config.IndyClientProperties
import com.finfabrik.common.LoggerDelegate
import com.finfabrik.indy.*
import org.hyperledger.indy.sdk.ErrorCode
import org.hyperledger.indy.sdk.IndyException
import org.json.JSONArray
import org.springframework.beans.factory.DisposableBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.core.env.Environment
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler
import org.springframework.stereotype.Service
import org.springframework.util.ResourceUtils
import java.io.File
import java.time.Instant
import javax.servlet.ServletContext


@Service
class IndyWrapper(private val clientProperties: IndyClientProperties, @Qualifier("IndyAgentScheduler") private val scheduler: ThreadPoolTaskScheduler) : IndyClient, DisposableBean {

    private val logger by LoggerDelegate()

    private val uninitiated: Int = 0
    private var poolHandle: Int = uninitiated
    private var tailsWriter: Int = uninitiated
    private var tailsReader: Int = uninitiated

    @Autowired
    private lateinit var environment: Environment

    @Autowired
    private lateinit var servletContext: ServletContext



    override fun initService() {

        logger.info("setting Indy lib protocol version")
        indySetProtocolVersion()

        val activeProfile = environment.activeProfiles[0]
        logger.info("active profile :  '$activeProfile'")

        val poolName = clientProperties.poolName
        logger.info("Creating indy pool '$poolName'")
        val result = try {
            if (File(indyPoolFilePath()).exists()) null
            else {
                val genesisPath = if (activeProfile.contains("local")) ResourceUtils.getFile(clientProperties.genesisFile).absolutePath else clientProperties.genesisFile
                val config = """{"genesis_txn": "$genesisPath"}"""
                logger.info("config: $config")
                indyCreatePoolLedger(poolName, config)
            }
        } catch (ex: IndyException) {
            ex
        }

        when {
            result == null || (result is IndyException && ErrorCode.valueOf(result.sdkErrorCode) == ErrorCode.PoolLedgerConfigAlreadyExistsError)
            -> indyPoolConnect(poolName)
            else -> throw result as IndyException
        }

        servletContext.setAttribute("poolHandle",poolHandle)

        logger.info("start create wallet")
        if(createWallet("proxy", "passwd")){
            logger.info("create wallet finished~~~")
            val wallet = openWallet("proxy", "passwd")
            servletContext.setAttribute("wallet",wallet)
            logger.info("create did")
            val did = createAndStoreDid(wallet, "000000000000000000000000Steward2").toString()
            servletContext.setAttribute("did", did)
        }

        logger.info("finish~~~")
    }

    private fun indyPoolConnect(poolName: String) {
        try {
            logger.info("Opening indy pool '$poolName'")
            poolHandle = indyOpenPoolLedger(poolName)
            logger.info("Indy pool opened, handle is '$poolHandle'")
        } catch (iex:IndyException) {
            if (clientProperties.poolConnectionRetry) {
                logger.info("Failed to open indy pool, will retry in 15 seconds")
                scheduler.schedule({indyPoolConnect(poolName)}, Instant.now().plusSeconds(clientProperties.reconnectInterval))
            } else {
                throw iex
            }
        }
    }

    override fun proverCreateMasterSecret(walletHandle: Int, masterSecret: String?): String {
        logger.debug("create Master Secret for walletHandle '$walletHandle'")
        return indyProverCreateMasterSecret(walletHandle, masterSecret)
    }

    override fun createWallet(walletId: String, walletKey: String): Boolean {
        try {
            logger.debug("creating new indy wallet $walletId")
            indyCreateWallet(walletId, getWalletUri())
            return true
        } catch (ex: Exception) {
            if(ex is IndyException && ex.sdkErrorCode == ErrorCode.WalletAlreadyExistsError.value()) {
                logger.debug("Indy wallet $walletId already exists")
                return true
            }

            logger.error("Error create indy wallet $walletId", ex)
            return false
        }
    }

    override fun openWallet(walletId: String, walletKey: String): Int {
        return try {
            logger.debug("opening indy wallet $walletId")
            indyOpenWallet(walletId, getWalletUri())
        } catch (ex: Exception) {
            logger.error("Error open indy wallet $walletId", ex)
            0
        }
    }

    override fun createAndStoreDid(walletHandle: Int, seed: String, existingDid:String?): String? {
        try {
            logger.debug("creating indy did with wallet handle $walletHandle")
            return indyCreateAndStoreMyDid(walletHandle, """{"seed":"$seed"}""")
        } catch (ex: Exception) {
            if(ex is IndyException && ex.sdkErrorCode == ErrorCode.DidAlreadyExistsError.value()) {
                logger.debug("Indy did already exists, returning existing: $existingDid")
                return existingDid
            }
            logger.error("Error create indy did with wallet handle $walletHandle", ex)
            return null
        }
    }

    override fun getPubKeyForLocalDid(walletHandle: Int, did: String): String? {
        return try {
            indyKeyForLocalDid(walletHandle, did)
        } catch (ex: Exception) {
            logger.error("Error get pubkey for indy did with wallet handle $walletHandle", ex)
            null
        }
    }

    override fun issuerCreateSchema(issuer: String, name: String, version: String, schema: String): Pair<String, String> {
        logger.debug("$issuer creating credential schema $schema")
        return indyIssuerCreateSchema(issuer, name, version, schema)
    }

    override fun postSchemaToLedger(wallet: Int, did: String, schema: String): Boolean {
        logger.debug("building schema request")
        val request = indyBuildSchemaRequest(did, schema)
        logger.debug("posting schema request")
        val res = indySignAndSubmitRequest(poolHandle, wallet, did, request)
        val check = checkIndyJsonResponse(res)
        val ok = check.first
        if (!ok) {
            logger.error("failed to post schema to ledger: ${check.second}")
        }
        return ok
    }

    override fun issuerCreateAndStoreCredentialDef(walletHandle: Int, issuerDid: String, schemaId: String, tag: String, revocable: Boolean): Pair<String, String> {
        val schema = indyGetSchemaFromLedger(poolHandle, issuerDid, schemaId)
        return indyIssuerCreateAndStoreCredentialDef(walletHandle, issuerDid, schema, tag, "CL", """{"support_revocation":$revocable}""")
    }

    override fun postCredDefToLedger(wallet: Int, did: String, credDef: String): Boolean {
        val credDefRequest = indyBuildCredDefRequest(did, credDef)
        val res = indySignAndSubmitRequest(poolHandle, wallet, did, credDefRequest)
        val check = checkIndyJsonResponse(res)
        return if (!check.first) {
            logger.error("failed to post cred definition to ledger: ${check.second}")
            false
        } else {
            true
        }
    }

    override fun issuerCreateCredentialOffer(wallet: Int, credDefId: String): String? {
        return try {
            logger.debug("create credential offer")
            indyIssuerCreateCredentialOffer(wallet, credDefId)
        } catch (ex: Exception) {
            logger.error("Error create credential offer", ex)
            null
        }
    }

    override fun issuerCreateCredential(wallet: Int, credOffer: String, credReq: String, credValues: String, revRegId: String?): Triple<String, String, String> {
        logger.debug("creating Credential")
        if (revRegId == null) {
            return indyIssuerCreateCredential(wallet, credOffer, credReq, credValues, revRegId, -1)
        } else {
            return indyIssuerCreateCredential(wallet, credOffer, credReq, credValues, revRegId, tailsReader)
        }
    }

    override fun issuerRevokeCredential(wallet: Int, revRegId: String, credRevocId: String): String {
        logger.debug("revoking Credential")
        return indyIssuerRevokeCredential(wallet, tailsReader, revRegId, credRevocId)
    }

    override fun issuerRecoverCredential(wallet: Int, revRegId: String, credRevocId: String): String {
        logger.debug("recovering Credential")
        return indyIssuerRecoverCredential(wallet, tailsReader, revRegId, credRevocId)
    }

    override fun issuerCreateAndStoreRevocationRegistry(wallet: Int, issuerDid: String, tag: String, credDefId: String): Triple<String, String, String>? {
        return try {
            logger.debug("create and store revocation registry")
            val revocRegConfig = """{"max_cred_num": ${clientProperties.maxCredNum.toInt()}, "issuance_type": "ISSUANCE_ON_DEMAND"}"""
            indyIssuerCreateAndStoreRevocReg(wallet, issuerDid, null, tag, credDefId, revocRegConfig, tailsWriter)
        } catch (ex: Exception) {
            logger.error("Error create and store revocation registry", ex)
            null
        }
    }

    override fun postRevocationDefAndEntryToLedger(wallet: Int, did: String, revRegDefId: String, revRegDef: String, revRegEntry: String): Boolean {
        indyPostRevocRegDefRequestToLedger(poolHandle, wallet, did, revRegDef)
        indyPostRevocRegEntryRequestToLedger(poolHandle, wallet, did, revRegDefId, revRegEntry)
        return true
    }

    override fun postRevocRegEntryRequestToLedger(wallet: Int, did: String, revRegDefId: String, revRegEntry: String): Boolean {
        logger.debug("for indyPostRevocRegEntryRequestToLedger")
        indyPostRevocRegEntryRequestToLedger(poolHandle, wallet, did, revRegDefId, revRegEntry)
        return true
    }

    override fun proverCreateCredentialRequest(wallet: Int, proverDid: String, credentialOfferJson: String, credentialDefJson: String, masterSecretId: String): Pair<String, String> {
        logger.debug("creating credential request")
        return indyProverCreateCredentialReq(wallet, proverDid, credentialOfferJson, credentialDefJson, masterSecretId)
    }

    override fun proverStoreCredential(wallet: Int, credId: String?, credReqMetadataJson: String, credJson: String, credDefJson: String, revRegDefJson: String?): String? {
        return try {
            logger.debug("for indyProverStoreCredential")
            indyProverStoreCredential(wallet, credId, credReqMetadataJson, credJson, credDefJson, revRegDefJson)
        } catch (ex: Exception) {
            logger.error("Error proverStoreCredential", ex)
            null
        }
    }

    override fun proverSearchCredentialsForProofRequest(walletHandle: Int, profReqJason: String, extraQueryJson: String?): Int {
        return try {
            logger.debug("for proverSearchCredentialsForProofRequest")
            indyProverSearchCredentialsForProofRequest(walletHandle, profReqJason, extraQueryJson)
        } catch (ex: Exception) {
            logger.error("Error proverSearchCredentialsForProofRequest", ex)
            0
        }
    }

    override fun proverFetchCredentialsForProofRequest(handle: Int, itemRef: String, count: Int): String {
        return indyProverFetchCredentialsForProofRequest(handle, itemRef, count)
    }

    override fun proverCloseCredentialsSearchForProofReq(searchHandle: Int) {
        indyProverCloseCredentialsSearchForProofReq(searchHandle)
    }

    override fun getRevocRegDeltaFromLedger(did: String, revRegDefId: String, from: Long, to: Long): Triple<String, String, Long> {
        // TODO check response and return a safer value
        return indyGetRevocRegDeltaFromLedger(poolHandle, did, revRegDefId, from, to)
    }

    override fun getRevocRegDefFromLedger(did: String, revRegDefId: String): String {
        return indyGetRevocRegDefFromLedger(poolHandle, did, revRegDefId)
    }

    override fun getRevocRegFromLedger(did: String, revRegDefId: String, timestamp: Long): Triple<String, String, Long> {
        return indyGetRevocRegFromLedger(poolHandle, did, revRegDefId, timestamp)
    }

    override fun createRevocationState(revRegDef: String, revRegDelta: String, timestamp: Long, credRevId: String): String {
        // TODO check response and return a safer value
        return indyCreateRevocationState(tailsReader, revRegDef, revRegDelta, timestamp, credRevId)
    }

    override fun proverCreateProof(wallet: Int, request: String, credential: String, masterSecretId: String, schema: String, credDef: String, revoc: String): String {
        // TODO check response and return a safer value
        return indyProverCreateProof(wallet, request, credential, masterSecretId, schema, credDef, revoc)
    }

    override fun getDefinitionFromLedger(poolHandle:Int, did:String, credDefId: String) = indyGetCredDefFromLedger(poolHandle, did, credDefId)

    private fun getWalletUri(): String = clientProperties.walletsPath

    @Throws(Exception::class)
    override fun destroy() {
        shutdownService()
    }

    fun shutdownService() {
        if (poolHandle != uninitiated) {
            indyClosePoolLedger(poolHandle)
        }
    }
}
