package com.blokaly.vhcn

import com.finfabrik.common.LoggerDelegate
import com.finfabrik.common.Logging
import com.finfabrik.indy.*
import org.hyperledger.indy.sdk.IndyException
import java.math.BigInteger
import java.nio.charset.Charset
import java.util.*
import java.util.zip.Deflater
import java.util.zip.Inflater
import javax.xml.bind.DatatypeConverter


object TestMain {
    private val jsonStringLength = 1024 * 8

    fun run() {
        val log = object : Logging {
            val logger by LoggerDelegate()
        }
        val logInfo: (String) -> Unit = { msg -> log.logger.info(msg) }

        val government = mutableMapOf<String, Any>()
        val hospital = mutableMapOf<String, Any>()
        val airport = mutableMapOf<String, Any>()
        val john = mutableMapOf<String, Any>()

        val tag = "vhcn"
        val gName = "government"
        val hName = "hospital"
        val aName = "airport"
        val jName = "John"

        try {
            logInfo("Set protocol version 2 to work with Indy Node 1.4")
            indySetProtocolVersion()

            val genesisPath = this::class.java.classLoader.getResource("vcbox_transactions_genesis").path

            // Government Workflow Steps

            logInfo("Government opens connections to ledger")
            val gPool = indyCreateAndOpenPoolHandle(gName, genesisPath)
            government["pool"] = gPool

            logInfo("Government creates wallet")
            val gWallet = indyCreateAndOpenWallet(gName)
            government["wallet"] = gWallet

            logInfo("Government creates DID")
            val seed = "000000000000000000000000Steward1"
            val gDid = indyCreateAndStoreMyDid(gWallet, """{"seed": "$seed"}""")
            government["did"] = gDid
            logInfo("ownerDid : $gDid")

            logInfo("Government creates credential schema")
            val schema = indyIssuerCreateSchema(gDid, "vhcn", "1.0", """["email", "pass", "expire"]""")
            logInfo("schema created ${schema.first} -> ${schema.second}")
            government["schemaId"] = schema.first
            government["schema"] = schema.second

            logInfo("Government posts schema to ledger")
            if (!indyPostSchemaToLedger(gPool, gWallet, gDid, schema.second)) {
                throw Exception("post schema failed")
            }
/*

            // Hospital Workflow Steps
            logInfo("Hospital opens connection to ledger")
            val hPool = indyCreateAndOpenPoolHandle(hName, genesisPath)
            hospital["pool"] = hPool

            logInfo("Hospital creates wallet")
            val hWallet = indyCreateAndOpenWallet(hName)
            hospital["wallet"] = hWallet

            logInfo("Hospital creates DID")
            val hDid = indyCreateAndStoreMyDid(hWallet, """{"seed": "000000000000000000000000Steward2"}""")
            hospital["did"] = hDid
            logInfo("Hospital Did : $hDid")

            logInfo("Hospital gets schema from ledger")
            val schemaFromLedger = indyGetSchemaFromLedger(hPool, hDid, schema.first)
            logInfo("schema from ledger: $schemaFromLedger")

            logInfo("Hospital creates credential definition for schema")
            val credentialDef = indyIssuerCreateAndStoreCredentialDef(hWallet, hDid, schemaFromLedger, tag, "CL", """{"support_revocation":false}""")
            logInfo("credential def: ${credentialDef.first} -> ${credentialDef.second}")
            val compressedDef = compressToStringBase64(credentialDef.second)
            logInfo("Compressed credDef: $compressedDef")
            hospital["credDefId"] = credentialDef.first
            hospital["credDef"] = credentialDef.second

            logInfo("Hospital posts credential definition")
            indyPostCredDefToLedger(hPool, hWallet, hDid, credentialDef.second)

            logInfo("Hospital creates credential offer")
            val credOffer = indyIssuerCreateCredentialOffer(hWallet, hospital["credDefId"] as String)
            hospital["credOffer"] = credOffer;
            logInfo("Hospital credential offer : $credOffer")

            // John Workflow Steps
            logInfo("John create wallet")
            val jWallet = indyCreateAndOpenWallet(jName)
            john["wallet"] = jWallet

            logInfo("John creates DID")
            val jDid = indyCreateAndStoreMyDid(jWallet, """{"seed": null}""")
            john["did"] = jDid
            logInfo("John Did : $jDid")

            logInfo("John creates master secret")
            val jMasterSecret = indyProverCreateMasterSecret(john["wallet"] as Int)
            logInfo("John MaterSecret : $jMasterSecret")

            // John retrieved the credOffer by scanning QR code, then
            logInfo("John creates credential request")
            val credReq = indyProverCreateCredentialReq(john["wallet"] as Int, john["did"] as String, hospital["credOffer"] as String, decompressToStringBase64(compressedDef), jMasterSecret)
            john["credReq"] = credReq.first
            john["credReqMetadata"] = credReq.second
            logInfo("John credReq : ${john["credReq"]}" as String)
            logInfo("John credReqMetadata : ${john["credReqMetadata"]}" as String)

            // John sent cred request to hospital and examined by a doctor, then
            logInfo("Hospital issues credential")
            val expireTime = currentTimeInSeconds() + 24 * 60 * 60 // expire in one day
            logInfo("Cred expire: $expireTime")
            val credValues = """ {
                |"email": {"raw": "test@gmail.com", "encoded": "1139481716457488690172217916278103335"},
                |"pass": {"raw": "1", "encoded": "1"},
                |"expire": {"raw": "$expireTime", "encoded": "$expireTime"}
                |}""".trimMargin().trimIndent()
            val cred = indyIssuerCreateCredential(hospital["wallet"] as Int, hospital["credOffer"] as String, john["credReq"] as String, credValues, null, -1)

            val credJson = cred.first
            logInfo("Hospital issued Cred: $credJson")

            // John received the credential and stored locally
            indyProverStoreCredential(jWallet, null, john["credReqMetadata"] as String, credJson,  hospital["credDef"] as String, null)

            // Airport Workflow Steps
            logInfo("Airport open connections to ledger")
            val aPool = indyCreateAndOpenPoolHandle(aName, genesisPath)
            airport["pool"] = aPool

            logInfo("Airport creates wallet")
            val aWallet = indyCreateAndOpenWallet(aName)
            airport["wallet"] = aWallet

            logInfo("Airport creates DID")
            val aDid = indyCreateAndStoreMyDid(aWallet, """{"seed": null}""")
            airport["did"] = aDid
            logInfo("Airport Did : $aDid")

            logInfo("Airport gets schema from ledger")
            val aSchema = indyGetSchemaFromLedger(aPool, aDid, schema.first)

            logInfo("Airport gets definition from ledger")
            val aDef = indyGetCredDefFromLedger(aPool, aDid, credentialDef.first)

            airport["schemas"] = JSONObject().put(schema.first, JSONObject(aSchema)).toString()
            airport["credDefs"] = JSONObject().put(credentialDef.first, JSONObject(aDef)).toString()

            // Airport prepares proof request
            val verificationTime = currentTimeInSeconds();
            logInfo("Proof check time limit: $verificationTime")
            val proofReq = """{
                |"nonce": "123432421212",
                |"name": "proof_req_1",
                |"version": "0.1",
                |"requested_attributes": {},
                |"requested_predicates": {
                |    "predicate1_referent": {
                |        "name": "pass",
                |        "p_type": ">",
                |        "p_value": 0,
                |        "restrictions": {"cred_def_id": "${hospital["credDefId"]}"}
                |    },
                |    "predicate2_referent": {
                |        "name": "expire",
                |        "p_type": ">=",
                |        "p_value": $verificationTime,
                |        "restrictions": {"cred_def_id": "${hospital["credDefId"]}"}
                |    }
                |}
                |}""".trimMargin()

            // John received the proof request by scanning the QR code, then
            val searchHandle = indyProverSearchCredentialsForProofRequest(jWallet, proofReq)
            val credAttr = indyProverFetchCredentialsForProofRequest(searchHandle, "predicate1_referent", 10)
            val attrJson = JSONArray(credAttr)[0] as JSONObject
            john["credInfoForAttribute"] = attrJson.getJSONObject("cred_info").toString()
            indyProverCloseCredentialsSearchForProofReq(searchHandle)

            logInfo("CredInfo: ${john["credInfoForAttribute"]}")

            val attRef = JSONObject(john["credInfoForAttribute"] as String).get("referent") as String
            john["requestedCredentials"] = """{
                |"self_attested_attributes": {},
                |"requested_attributes": {},
                |"requested_predicates": {
                |    "predicate1_referent": {"cred_id": "$attRef"},
                |    "predicate2_referent": {"cred_id": "$attRef"}
                |}
                |}""".trimMargin().trimIndent()

            john["schemas"] = JSONObject().put(government["schemaId"] as String, JSONObject(government["schema"] as String)).toString()
            john["credDefs"] = JSONObject().put(hospital["credDefId"] as String, JSONObject(hospital["credDef"] as String)).toString()

            // John generates proof
            john["proof"] = indyProverCreateProof(jWallet, proofReq, john["requestedCredentials"] as String, jMasterSecret, john["schemas"] as String,
                john["credDefs"] as String, "{}")
            logInfo("Proof: ${john["proof"]}")

            // Airport verifies John's proof
            val verifiedBeforeRevocation = indyVerifierVerifyProof(proofReq, john["proof"] as String,  airport["schemas"] as String, airport["credDefs"] as String, "{}", "{}")
            if (verifiedBeforeRevocation) {
                logInfo("OK : proof is verified as expected :-)")
            } else {
                logInfo("KO : proof is expected to be verified but it is NOT... :-(")
            }
*/

        }  catch (iex: IndyException) {
            log.logger.error("Indy Error[{}]: {}", iex.sdkErrorCode, iex.message)
        } finally {
            logInfo("Test run completed")
            logInfo("DELETE the pool and wallets to rerun the test")
            logInfo("Reminder: you need to recreate (down and up) the Indy Network to rerun this test!!")
        }
    }

    private fun compressToStringBase64(data:String):String = compressToStringBase64(data.toByteArray())

    private fun compressToStringBase64(data:ByteArray):String {
        val output = ByteArray(jsonStringLength)
        val compresser = Deflater(Deflater.BEST_COMPRESSION)
        compresser.setInput(data)
        compresser.finish()
        val compressedDataLength = compresser.deflate(output)
        compresser.end()
        return DatatypeConverter.printBase64Binary(output.copyOf(compressedDataLength))
    }

    private fun decompressToStringBase64(base64String: String): String {
        val compressedData = DatatypeConverter.parseBase64Binary(base64String)
        val deCompressor = Inflater()
        deCompressor.setInput(compressedData, 0, compressedData.size)
        val output = ByteArray(jsonStringLength)
        val decompressedDataLength = deCompressor.inflate(output)
        deCompressor.end()
        return String(output, 0, decompressedDataLength, Charset.forName("UTF-8"))
    }

//    private fun compressLargeNumber(input:String) = compressToStringBase64(BigInteger(input).toByteArray())
    private fun compressLargeNumber(input:String) = String(Base64.getEncoder().encode(BigInteger(input).toByteArray()))

    @JvmStatic
    fun main(args: Array<String>) {
        run()
    }
}

