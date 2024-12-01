package com.example.financemanager.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import java.io.IOException;

@Controller
public class GoogleOAuthController {
    @Autowired
    private GoogleAuthorizationCodeFlow googleAuthorizationCodeFlow;

    @GetMapping("/oauth2/authorize")
    public void authorize(HttpServletResponse response) throws IOException {
        String authorizationUrl = googleAuthorizationCodeFlow.newAuthorizationUrl()
                .setRedirectUri("http://localhost:8000/oauth2/callback")
                .build();
        response.sendRedirect(authorizationUrl);
        System.out.println("called");
    }
}