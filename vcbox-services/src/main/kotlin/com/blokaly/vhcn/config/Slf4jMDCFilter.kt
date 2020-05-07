package com.blokaly.vhcn.config

import org.slf4j.MDC
import org.springframework.web.filter.OncePerRequestFilter
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class Slf4jMDCFilter(private val responseHeader: String, private val mdcTokenKey: String) : OncePerRequestFilter() {

    @Throws(java.io.IOException::class, ServletException::class)
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        try {
            val token = UUID.randomUUID().toString().toUpperCase().replace("-", "")
            MDC.put(mdcTokenKey, token)
            if (responseHeader.isNotEmpty()) {
                response.addHeader(responseHeader, token)
            }
            chain.doFilter(request, response)
        } finally {
            MDC.remove(mdcTokenKey)
        }
    }

    override fun isAsyncDispatch(request: HttpServletRequest): Boolean = false

    override fun shouldNotFilterErrorDispatch(): Boolean = false
}