package com.blokaly.vhcn.exceptions

import com.finfabrik.common.LoggerDelegate
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
@RestController
class GlobalExceptionHandler : ResponseEntityExceptionHandler(){
    private val log by LoggerDelegate()

    @ExceptionHandler(Exception::class)
    fun handleAllExceptions(ex: Exception, webRequest: WebRequest): ResponseEntity<String> {
        log.error("Exception occurred : ", ex)
        return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
    }

}