package com.example.financemanager.entity;

import org.springframework.stereotype.Component;

@Component
public class Token {
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
