package com.blokaly.vhcn.models

import javax.validation.constraints.NotNull

sealed class WalletDto {
    enum class Action { CREATE, OPEN }

    data class Request(val wid: String, val wkey: String, @field:NotNull val action: Action)

    data class Response(val handle: Int? = null)
}

sealed class CredOfferDto {
    data class TemplateRequest(val offer:String, val vkey:String)
    data class TemplateResponse(val url:String)
    data class DefOfferResponse(val definition:String, val offer:String, val vkey:String)
}

sealed class CredRequestDto {
    data class CredRequest(val requester:String, val request:String)
    data class CredReqResponse(val reqId:String)
}

sealed class IssuedCredential {
    data class CredentialResponse(val credId:String = "")
}

sealed class Credential {
    data class CredRequest(val reqId:String)
    data class CredResponse(val reqId:String)
}