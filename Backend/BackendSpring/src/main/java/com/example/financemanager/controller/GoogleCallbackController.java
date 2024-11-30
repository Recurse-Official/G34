package com.example.financemanager.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.services.drive.Drive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoogleCallbackController {

    @Autowired
    private GoogleAuthorizationCodeFlow googleAuthorizationCodeFlow;

    @Autowired
    private Drive googleDriveService;

    @GetMapping("/oauth2/callback")
    public String callback(@RequestParam("code") String code) throws Exception {
        GoogleTokenResponse tokenResponse = googleAuthorizationCodeFlow.newTokenRequest(code)
                .setRedirectUri("http://localhost:8080/oauth2/callback")
                .execute();

        GoogleCredential credential = new GoogleCredential().setAccessToken(tokenResponse.getAccessToken());

        Drive driveService = new Drive.Builder(
                googleAuthorizationCodeFlow.getTransport(),
                googleAuthorizationCodeFlow.getJsonFactory(),
                credential
        ).setApplicationName("YourAppName").build();

        return "Authorization Successful! Access Token: " + tokenResponse.getAccessToken();
    }

}
