package com.blokaly.vhcn

import com.finfabrik.common.LoggerDelegate
import com.finfabrik.common.Logging
import com.finfabrik.indy.*
import org.hyperledger.indy.sdk.IndyException


object VCBoxSchema {

    @JvmStatic
    fun main(args: Array<String>) {
        run()
    }

    private const val SCHEMA_ATTRIBUTES = """["name", "email", "result", "expire"]"""
    private const val TAG = "COVID19_TEST"
    private const val name = "Health_Department"

    private fun run() {
        val log = object : Logging {
            val logger by LoggerDelegate()
        }
        val logInfo: (String) -> Unit = { msg -> log.logger.info(msg) }

        // ********************************
        // Health Department Workflow Steps
        // ********************************
        try {
            logInfo("Set protocol version 2 to work with Indy Node 1.4")
            indySetProtocolVersion()
            val genesisPath = this::class.java.classLoader.getResource("vcbox_transactions_genesis").path

            // **************************************
            // 1. Connect to Hyperledger Indy Network
            // **************************************
            logInfo("Open connections to ledger")
            val pool = indyCreateAndOpenPoolHandle(name, genesisPath)

            // **************************************
            // 2. Create Indy Wallet
            // **************************************
            logInfo("Create wallet")
            val wallet = indyCreateAndOpenWallet(name)

            // **************************************
            // 3. Create Indy DID
            // **************************************
            logInfo("Create DID")
            val seed = "000000000000000000000000Trustee1"
            val gDid = indyCreateAndStoreMyDid(wallet, """{"seed": "$seed"}""")
            logInfo("ownerDid : $gDid")

            // **************************************
            // 4. Create Indy Credential Schema
            // **************************************
            logInfo("Create credential schema")
            val schema = indyIssuerCreateSchema(gDid, TAG, "1.0", SCHEMA_ATTRIBUTES)
            logInfo("schema created ${schema.first} -> ${schema.second}")

            // **************************************
            // 5. Store Schema on the Indy Ledger
            // **************************************
            logInfo("Post schema to ledger")
            if (!indyPostSchemaToLedger(pool, wallet, gDid, schema.second)) {
                throw Exception("post schema failed")
            }

        }  catch (iex: IndyException) {
            log.logger.error("Indy Error[{}]: {}", iex.sdkErrorCode, iex.message)
        } finally {
            logInfo("Test run completed")
        }
    }
}

