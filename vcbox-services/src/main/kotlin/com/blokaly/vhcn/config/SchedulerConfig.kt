package com.blokaly.vhcn.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.SchedulingConfigurer
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler
import org.springframework.scheduling.config.ScheduledTaskRegistrar


@Configuration
class SchedulerConfig : SchedulingConfigurer {
    private val poolSize = 3

    @Bean("IndyAgentScheduler")
    fun poolScheduler(): ThreadPoolTaskScheduler {
        val threadPoolTaskScheduler = ThreadPoolTaskScheduler()
        threadPoolTaskScheduler.poolSize = poolSize
        threadPoolTaskScheduler.setThreadNamePrefix("indyagent-scheduler-")
        threadPoolTaskScheduler.initialize()
        return threadPoolTaskScheduler
    }

    override fun configureTasks(scheduledTaskRegistrar: ScheduledTaskRegistrar) {
        scheduledTaskRegistrar.setTaskScheduler(poolScheduler())
    }
}