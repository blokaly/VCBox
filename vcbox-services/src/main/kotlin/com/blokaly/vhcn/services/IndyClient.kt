package com.blokaly.vhcn.services

interface IndyClient {
    fun initService()
    fun proverCreateMasterSecret(walletHandle: Int, masterSecret: String? = null): String
    fun createWallet(walletId: String, walletKey: String): Boolean
    fun openWallet(walletId: String, walletKey: String): Int
    fun createAndStoreDid(walletHandle: Int, seed: String, existingDid:String? = null): String?
    fun getPubKeyForLocalDid(walletHandle: Int, did: String): String?
    fun issuerCreateSchema(issuer: String, name: String, version: String, schema: String): Pair<String, String>
    fun postSchemaToLedger(wallet: Int, did: String, schema: String): Boolean
    fun issuerCreateAndStoreCredentialDef(walletHandle: Int, issuerDid: String, schemaId: String, tag: String, revocable: Boolean): Pair<String, String>
    fun postCredDefToLedger(wallet: Int, did: String, credDef: String): Boolean
    fun issuerCreateCredentialOffer(wallet: Int, credDefId: String): String?
    fun issuerCreateCredential(wallet: Int, credOffer: String, credReq: String, credValues: String, revRegId: String? = null): Triple<String, String, String>
    fun issuerRevokeCredential(wallet: Int, revRegId: String, credRevocId: String): String
    fun issuerRecoverCredential(wallet: Int, revRegId: String, credRevocId: String) : String
    fun issuerCreateAndStoreRevocationRegistry(wallet: Int, issuerDid: String, tag: String, credDefId: String): Triple<String, String, String>?
    fun postRevocationDefAndEntryToLedger(wallet: Int, did: String, revRegDefId: String, revRegDef: String, revRegEntry: String): Boolean
    fun postRevocRegEntryRequestToLedger(wallet: Int, did: String, revRegDefId: String, revRegEntry: String): Boolean
    fun proverCreateCredentialRequest(wallet: Int, proverDid: String, credentialOfferJson: String, credentialDefJson: String, masterSecretId: String): Pair<String, String>
    fun proverStoreCredential(wallet: Int, credId: String?, credReqMetadataJson: String, credJson: String, credDefJson: String, revRegDefJson: String? = null): String?
    fun proverSearchCredentialsForProofRequest(walletHandle: Int, profReqJason: String, extraQueryJson: String? = null): Int
    fun proverFetchCredentialsForProofRequest(handle: Int, itemRef: String, count: Int): String
    fun proverCloseCredentialsSearchForProofReq(searchHandle: Int)
    fun getRevocRegDeltaFromLedger(did: String, revRegDefId: String, from: Long, to: Long): Triple<String, String, Long>
    fun getRevocRegDefFromLedger(did: String, revRegDefId: String): String
    fun getRevocRegFromLedger(did: String, revRegDefId: String, timestamp: Long): Triple<String, String, Long>
    fun createRevocationState(revRegDef: String, revRegDelta: String, timestamp: Long, credRevId: String): String
    fun proverCreateProof(wallet: Int, request: String, credential: String, masterSecretId: String, schema: String, credDef: String, revoc: String = "{}"): String
    fun getDefinitionFromLedger(poolHandle:Int, did:String, credDefId: String):String
}