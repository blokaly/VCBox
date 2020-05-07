package com.blokaly.vhcn.services

import com.blokaly.vhcn.models.WalletDto
import com.finfabrik.common.LoggerDelegate
import org.springframework.stereotype.Service
import java.lang.Exception

@Service
class WalletService(private val indyService: IndyService) {
    private val logger by LoggerDelegate()

    fun createIndyWallet(request: WalletDto.Request): Int {
        val bCreated = indyService.createWallet(request.wid, request.wkey)
        return if (bCreated) {
            openIndyWallet(request)
        } else {
           throw Exception("Failed to create indy wallet")
        }
    }

    fun openIndyWallet(request: WalletDto.Request): Int {
        val wHandle = indyService.openWallet(request.wid, request.wkey)
        logger.debug("Wallet opened : {} for id : {} ", wHandle, request.wid)
        return wHandle
    }
}