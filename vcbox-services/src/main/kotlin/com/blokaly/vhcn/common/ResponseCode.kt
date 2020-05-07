package com.blokaly.vhcn.common

import com.blokaly.vhcn.models.ResponseDto
import org.springframework.http.ResponseEntity

fun <T> buildResponseEntity(responseDto: ResponseDto<T>) = ResponseEntity(responseDto, responseDto.httpStatus)