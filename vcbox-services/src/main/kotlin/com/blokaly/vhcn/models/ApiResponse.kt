package com.blokaly.vhcn.models

import com.fasterxml.jackson.annotation.JsonFormat
import org.joda.time.DateTime
import org.springframework.http.HttpStatus

data class ResponseDto<T>(val data: T,
                          val httpStatus: HttpStatus,
                          @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
                          val timeStamp: DateTime? = DateTime.now())

