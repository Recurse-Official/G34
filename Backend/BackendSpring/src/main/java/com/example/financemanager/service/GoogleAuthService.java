package com.example.financemanager.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.HashMap;
import java.util.Map;

@Service
public class GoogleAuthService {

    private static final String TOKEN_URL = "https://oauth2.googleapis.com/token";

    public String getAccessToken(String authorizationCode, String clientId, String clientSecret, String redirectUri) {
        RestTemplate restTemplate = new RestTemplate();

        // Request body
        Map<String, String> body = new HashMap<>();
        body.put("code", authorizationCode);
        body.put("client_id", clientId);
        body.put("client_secret", clientSecret);
        body.put("redirect_uri", redirectUri);
        body.put("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                TOKEN_URL, HttpMethod.POST, entity, Map.class
        );

        // Parse the response
        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = response.getBody();
            return (String) responseBody.get("access_token");
        } else {
            throw new RuntimeException("Failed to get access token: " + response.getStatusCode());
        }
    }
}
