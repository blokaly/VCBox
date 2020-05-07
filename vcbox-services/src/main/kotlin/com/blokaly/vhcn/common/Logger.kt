package com.blokaly.vhcn.common

import org.slf4j.Logger
import org.slf4j.LoggerFactory.getLogger
import kotlin.properties.ReadOnlyProperty
import kotlin.reflect.KProperty

// Companion
class LoggerInCompanionObject {
    companion object : Logging {
        @JvmStatic
        private val logger by LoggerDelegate()

    }
}

// Delegate
class LoggerDelegate<in R : Any> : ReadOnlyProperty<R, Logger> {
    override fun getValue(thisRef: R, property: KProperty<*>) = getLogger(getClassForLogging(thisRef.javaClass))!!
}

// Extended
interface Logging

inline fun <reified T : Logging> T.logger(): Logger = getLogger(getClassForLogging(T::class.java))

inline fun <T : Any> getClassForLogging(javaClass: Class<T>): Class<*> {
    return javaClass.enclosingClass ?: javaClass
}