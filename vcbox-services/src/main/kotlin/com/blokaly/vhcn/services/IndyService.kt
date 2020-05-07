package com.blokaly.vhcn.services

import com.finfabrik.common.LoggerDelegate
import org.springframework.stereotype.Service

@Service
class IndyService(private val indyWrapper: IndyWrapper) : IndyClient by indyWrapper {
    private val logger by LoggerDelegate()
}