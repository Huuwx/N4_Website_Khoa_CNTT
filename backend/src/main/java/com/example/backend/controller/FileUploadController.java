package com.example.backend.controller;

import com.example.backend.dto.common.ApiResponse;
import com.example.backend.dto.common.UploadResponse;
import com.example.backend.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<UploadResponse>> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<UploadResponse>builder()
                            .status("ERROR")
                            .message("Please select a file to upload")
                            .timestamp(java.time.LocalDateTime.now())
                            .build());
        }

        // Check if file is an image
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.<UploadResponse>builder()
                            .status("ERROR")
                            .message("Only image files are allowed")
                            .timestamp(java.time.LocalDateTime.now())
                            .build());
        }

        try {
            String imageUrl = fileUploadService.uploadImage(file);
            UploadResponse response = UploadResponse.builder()
                    .url(imageUrl)
                    .build();
                    
            return ResponseEntity.ok(ApiResponse.<UploadResponse>builder()
                    .status("SUCCESS")
                    .message("File uploaded successfully")
                    .data(response)
                    .timestamp(java.time.LocalDateTime.now())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.<UploadResponse>builder()
                            .status("ERROR")
                            .message("Failed to upload file: " + e.getMessage())
                            .timestamp(java.time.LocalDateTime.now())
                            .build());
        }
    }
}