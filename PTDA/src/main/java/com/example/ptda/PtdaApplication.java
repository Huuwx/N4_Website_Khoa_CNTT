package com.example.ptda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.ptda")
public class PtdaApplication {
    public static void main(String[] args) {
        SpringApplication.run(PtdaApplication.class, args);
    }
}

