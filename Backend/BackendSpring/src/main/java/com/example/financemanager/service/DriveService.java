package com.example.financemanager.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.HashMap;
import java.util.Map;

@Service
public class DriveService {

    private static final String DRIVE_API_URL = "https://www.googleapis.com/drive/v3/files";

    public String createFile(String accessToken, String fileName, String mimeType, String content) {
        RestTemplate restTemplate = new RestTemplate();

        // File metadata
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("name", fileName);
        metadata.put("mimeType", mimeType);

        // File content
        String boundary = "foo_bar_baz";
        StringBuilder body = new StringBuilder();
        body.append("--").append(boundary).append("\r\n");
        body.append("Content-Type: application/json; charset=UTF-8\r\n\r\n");
        body.append(metadata.toString()).append("\r\n");
        body.append("--").append(boundary).append("\r\n");
        body.append("Content-Type: ").append(mimeType).append("\r\n\r\n");
        body.append(content).append("\r\n");
        body.append("--").append(boundary).append("--");

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.parseMediaType("multipart/related; boundary=" + boundary));

        HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                DRIVE_API_URL + "?uploadType=multipart", HttpMethod.POST, entity, Map.class
        );

        // Parse the response
        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = response.getBody();
            return (String) responseBody.get("id");
        } else {
            throw new RuntimeException("Failed to create file: " + response.getStatusCode());
        }
    }
}
