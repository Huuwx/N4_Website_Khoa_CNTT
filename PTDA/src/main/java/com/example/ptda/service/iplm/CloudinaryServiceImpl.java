package com.example.ptda.service.iplm;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryServiceImpl {
    private final Cloudinary cloudinary;

    // Danh sách định dạng ảnh được phép upload
    private static final List<String> ALLOWED_FORMATS = Arrays.asList(
            "image/gif", "image/webp", "image/apng", "image/jpeg", "image/png"
    );

    public CloudinaryServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        System.out.println("Uploading file: " + file.getOriginalFilename());

        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "image",
                            "folder", "uploads/anh_dong"
                    ));
            System.out.println("Upload successful: " + uploadResult.get("secure_url"));
            return uploadResult.get("secure_url").toString();
        } catch (Exception e) {
            System.out.println("Upload failed: " + e.getMessage());
            throw new IOException("Lỗi upload file: " + e.getMessage());
        }
    }
    public void deleteFile(String fileUrl) throws IOException {
        if (fileUrl == null || fileUrl.isEmpty()) {
            System.out.println("URL ảnh không hợp lệ!");
            return;
        }

        try {
            // Lấy public_id chính xác từ URL (bỏ domain, version)
            String[] parts = fileUrl.split("/");
            String fileName = parts[parts.length - 1]; // Lấy tên file có đuôi .jpg, .png, ...
            String publicId = "uploads/anh_dong/" + fileName.substring(0, fileName.lastIndexOf(".")); // Thêm thư mục vào public_id

            System.out.println("Public ID dùng để xóa: " + publicId);

            // Xóa ảnh trên Cloudinary
            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

            // Kiểm tra kết quả xóa
            if ("ok".equals(result.get("result"))) {
                System.out.println("✅ Xóa ảnh thành công trên Cloudinary!");
            } else {
                System.out.println("❌ Không thể xóa ảnh trên Cloudinary: " + result);
            }
        } catch (Exception e) {
            System.out.println("⚠️ Lỗi khi xóa ảnh trên Cloudinary: " + e.getMessage());
            throw new IOException("Lỗi xóa file trên Cloudinary: " + e.getMessage());
        }
    }



}
