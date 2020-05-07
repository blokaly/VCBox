package com.blokaly.vhcn

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableAsync

@SpringBootApplication
@EnableAsync
class VCBoxService

fun main(args: Array<String>) {
    print("start the application ~~~")
    runApplication<VCBoxService>(*args)

}