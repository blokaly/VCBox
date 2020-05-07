package com.blokaly.vhcn.controllers

import com.blokaly.vhcn.common.buildResponseEntity
import com.blokaly.vhcn.models.*
import com.blokaly.vhcn.services.IndyWrapper
import com.finfabrik.common.LoggerDelegate
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.servlet.ServletContext
import javax.validation.Valid
import javax.validation.constraints.NotBlank

@RestController
@Validated
@RequestMapping("/api/v1/indy/cred", produces = [MediaType.APPLICATION_JSON_VALUE])
class CredController(private val indyWrapper: IndyWrapper) {
    private val logger by LoggerDelegate()

    @Autowired
    private lateinit var servletContext: ServletContext

    @PostMapping("/template", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun createTemplate(@Valid @RequestBody req: CredOfferDto.TemplateRequest): ResponseEntity<ResponseDto<CredOfferDto.TemplateResponse>> {
        val offer = String(Base64.getDecoder().decode(req.offer))
        logger.info("Received cred offer $offer")

        val credDefId = JSONObject(offer).getString("cred_def_id")
        val definition = indyWrapper.getDefinitionFromLedger(servletContext.getAttribute("poolHandle") as Int, servletContext.getAttribute("did") as String,
            credDefId)

        servletContext.setAttribute("${credDefId}:vkey", req.vkey)
        servletContext.setAttribute("${credDefId}:credOffer", offer)
        servletContext.setAttribute("${credDefId}:credDef", definition)

        return buildResponseEntity(ResponseDto(CredOfferDto.TemplateResponse("http://10.208.0.100:8080/api/v1/indy/cred/id/${credDefId.replace(':','-')}"), HttpStatus.OK))
    }

    @GetMapping("/id/{uid}", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getCredDefAndOffer(@NotBlank @PathVariable uid: String): ResponseEntity<ResponseDto<CredOfferDto.DefOfferResponse>> {
        val defId = uid.replace('-',':')
        val vkey = servletContext.getAttribute("${defId}:vkey") as String
        val offer = Base64.getEncoder().encodeToString((servletContext.getAttribute("${defId}:credOffer") as String).toByteArray())
        val def = Base64.getEncoder().encodeToString((servletContext.getAttribute("${defId}:credDef") as String).toByteArray())

        return buildResponseEntity(ResponseDto(CredOfferDto.DefOfferResponse(def, offer, vkey), HttpStatus.OK))
    }

    @PostMapping("/request", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun forwardRequest(@Valid @RequestBody req: CredRequestDto.CredRequest): ResponseEntity<ResponseDto<CredRequestDto.CredReqResponse>> {

        val now = System.currentTimeMillis()
        val payload = JSONObject()
        payload.put("reqId", now.toString())
        payload.put("requester", req.requester)
        payload.put("request", req.request)
        val res = khttp.post(url = "http://localhost:3000/credrequest", data=payload)
        return if (res.statusCode==200) {
            servletContext.setAttribute("${now}:req", req.request)
            buildResponseEntity(ResponseDto(CredRequestDto.CredReqResponse(now.toString()), HttpStatus.OK))
        } else {
            buildResponseEntity(ResponseDto(CredRequestDto.CredReqResponse(now.toString()), HttpStatus.INTERNAL_SERVER_ERROR))
        }
    }

    @GetMapping("/issue/{uid}", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getIssuedCred(@NotBlank @PathVariable uid: String): ResponseEntity<ResponseDto<IssuedCredential.CredentialResponse>> {

        val request = servletContext.getAttribute("${uid}:req")
        val cred = servletContext.getAttribute("${uid}:cred")
        if (request != null && cred != null) {
            return buildResponseEntity(ResponseDto(IssuedCredential.CredentialResponse(System.currentTimeMillis().toString()), HttpStatus.OK))
        } else {
            return buildResponseEntity(ResponseDto(IssuedCredential.CredentialResponse(), HttpStatus.NOT_FOUND))
        }

    }

    @PostMapping("/credential", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun issueCredential(@Valid @RequestBody req: Credential.CredRequest): ResponseEntity<ResponseDto<Credential.CredResponse>> {
        logger.info("Received credential $req")
        servletContext.setAttribute("${req.reqId}:cred", true)
        return buildResponseEntity(ResponseDto(Credential.CredResponse(req.reqId), HttpStatus.OK))
    }

}