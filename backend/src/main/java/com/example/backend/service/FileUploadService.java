package com.example.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class FileUploadService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) {
        try {
            // Generate a unique public ID for the image
            String publicId = "articles/" + UUID.randomUUID().toString();

            // Upload to Cloudinary
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", publicId,
                            "resource_type", "auto"
                    ));

            // Return the secure URL of the uploaded image
            return result.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }

    public void deleteFile(String imageUrl) {
        try {
            // Extract public ID from the URL
            String publicId = extractPublicIdFromUrl(imageUrl);
            if (publicId != null) {
                // Delete from Cloudinary
                cloudinary.uploader().destroy(publicId,
                        ObjectUtils.asMap("resource_type", "image"));
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete image: " + e.getMessage());
        }
    }

    private String extractPublicIdFromUrl(String imageUrl) {
        // Example URL: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/articles/image-id
        try {
            String[] parts = imageUrl.split("/");
            // Get everything after "upload/"
            boolean found = false;
            StringBuilder publicId = new StringBuilder();
            for (String part : parts) {
                if (found) {
                    publicId.append(part).append("/");
                }
                if (part.equals("upload")) {
                    found = true;
                    // Skip the version number
                    continue;
                }
            }
            // Remove trailing slash and return
            String result = publicId.toString();
            return result.endsWith("/") ? result.substring(0, result.length() - 1) : result;
        } catch (Exception e) {
            return null;
        }
    }
}