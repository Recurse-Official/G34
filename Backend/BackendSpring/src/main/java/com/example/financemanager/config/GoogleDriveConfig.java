package com.example.financemanager.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;

@Configuration
public class GoogleDriveConfig {

    @Value("${google.credentials.file}")
    private String credentialsFile;

    @Value("${google.redirect-uri}")
    private String redirectUri;

    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    @Bean
    public GoogleAuthorizationCodeFlow googleAuthorizationCodeFlow() throws Exception {
        var httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        InputStream in = GoogleDriveConfig.class.getResourceAsStream("/credentials.json");

        var clientSecrets = GoogleClientSecrets.load(
                JSON_FACTORY,
                new InputStreamReader(in)
        );
        System.out.println(clientSecrets);


        return new GoogleAuthorizationCodeFlow.Builder(
                httpTransport,
                JSON_FACTORY,
                clientSecrets,
                Collections.singletonList(DriveScopes.DRIVE)
        ).setAccessType("offline").build();

    }

    @Bean
    public Drive googleDriveService(GoogleAuthorizationCodeFlow flow) throws Exception {
        Drive builder = new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                null
        ).setApplicationName("YourAppName").build();

        System.out.println("Builder is: " + builder.files().toString());

        return builder;
    }
}

