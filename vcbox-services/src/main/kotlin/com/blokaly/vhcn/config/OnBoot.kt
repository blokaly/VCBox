package com.blokaly.vhcn.config

import com.finfabrik.common.LoggerDelegate
import com.blokaly.vhcn.services.IndyService
import org.joda.time.DateTimeZone
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

@Component
class OnBoot(private val indyService: IndyService) : ApplicationRunner {
    private val logger by LoggerDelegate()
    override fun run(args: ApplicationArguments?) {
        DateTimeZone.setDefault(DateTimeZone.UTC)
        logger.info("Default timezone set to UTC")
        indyService.initService()
        logger.info("Indy service initiated")
    }
}