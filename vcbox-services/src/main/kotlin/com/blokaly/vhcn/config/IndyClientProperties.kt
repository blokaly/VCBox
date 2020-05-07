package com.blokaly.vhcn.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "indy.client")
class IndyClientProperties {
    lateinit var poolName: String
    lateinit var genesisFile: String
    lateinit var walletsPath: String
    lateinit var tailsPath: String
    lateinit var maxCredNum: String
    var poolConnectionRetry = false
    var reconnectInterval: Long = 15
}