package com.example.financemanager.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.AbstractInputStreamContent;
import com.google.api.client.http.InputStreamContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
//import com.google.api.services.drive.model.FileContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
public class GoogleCallbackController {

    @Autowired
    private GoogleAuthorizationCodeFlow googleAuthorizationCodeFlow;

    @GetMapping("/oauth2/callback")
    public String callback(@RequestParam("code") String code) throws Exception {
        // Exchange authorization code for access token
        GoogleTokenResponse tokenResponse = googleAuthorizationCodeFlow.newTokenRequest(code)
                .setRedirectUri("http://localhost:8000/oauth2/callback")
                .execute();

        String accessToken = tokenResponse.getAccessToken();

        // Initialize Google Drive service
        Drive driveService = new Drive.Builder(
                googleAuthorizationCodeFlow.getTransport(),
                googleAuthorizationCodeFlow.getJsonFactory(),
                new GoogleCredential().setAccessToken(accessToken)
        ).setApplicationName("FinancialManager").build();

        // Create a file in Google Drive
        try {
            createFile(driveService);
        } catch (IOException e) {
            return "Failed to create file: " + e.getMessage();
        }

        return "File created successfully in Google Drive!";
    }

    private void createFile(Drive driveService) throws IOException {
        // Define file metadata
        File fileMetadata = new File();
        fileMetadata.setName("test.txt");

        // Define file content
        String content = "hello";
        InputStream inputStream = new ByteArrayInputStream(content.getBytes());
        InputStreamContent fileContent = new InputStreamContent("text/plain", inputStream);

        // Create the file in Google Drive
        driveService.files().create(fileMetadata, fileContent)
                .setFields("id")
                .execute();
    }
}