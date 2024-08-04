package com.mamdaero.domain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@EnableScheduling
@ComponentScan(basePackages = {"com.mamdaero.global", "com.mamdaero"})
@SpringBootApplication
public class MamdaeroApplication {

    public static void main(String[] args) {
        SpringApplication.run(MamdaeroApplication.class, args);
    }

}
