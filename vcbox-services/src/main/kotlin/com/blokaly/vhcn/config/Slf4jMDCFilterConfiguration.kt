package com.blokaly.vhcn.config

import com.blokaly.vhcn.config.Slf4jMDCFilter
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

//see https://medium.com/@d.lopez.j/spring-boot-setting-a-unique-id-per-request-dd648efef2b

@Configuration
class Slf4jMDCFilterConfiguration {

    private val responseHeader = "Event-ID"
    private val mdcTokenKey = "tracking.evtId"

    @Bean
    fun servletRegistrationBean(): FilterRegistrationBean<Slf4jMDCFilter> {
        val registrationBean = FilterRegistrationBean<Slf4jMDCFilter>()
        val log4jMDCFilterFilter = Slf4jMDCFilter(responseHeader, mdcTokenKey)
        registrationBean.filter = log4jMDCFilterFilter
        registrationBean.order = 2
        return registrationBean
    }
}