package com.example.ptda.service.iplm;
import com.example.ptda.entity.AnhDong;
import com.example.ptda.respository.AnhDongRepository;
import com.example.ptda.service.AnhDongService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class AnhDongServiceImpl implements AnhDongService {
    private final String uploadDir = "uploads/anh_dong"; // Thư mục lưu ảnh
    private final CloudinaryServiceImpl cloudinaryService;
    private final AnhDongRepository anhDongRepository;

    public AnhDongServiceImpl(CloudinaryServiceImpl cloudinaryService, AnhDongRepository anhDongRepository) {
        this.cloudinaryService = cloudinaryService;
        this.anhDongRepository = anhDongRepository;
    }

    @Override
    public AnhDong uploadAnh(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("File không được để trống.");
        }

        String url = cloudinaryService.uploadFile(file);
        AnhDong anhDong = new AnhDong();
        anhDong.setAnh(url);
        return anhDongRepository.save(anhDong);
    }

    // ✅ Cập nhật ảnh theo ID
//    public AnhDong updateAnh(Long id, MultipartFile file) throws IOException {
//        Optional<AnhDong> optionalAnhDong = anhDongRepository.findById(id);
//        if (optionalAnhDong.isEmpty()) {
//            throw new IOException("Ảnh không tồn tại!");
//        }
//
//        AnhDong anhDong = optionalAnhDong.get();
//
//        // ✅ Xóa ảnh cũ trên Cloudinary trước khi upload ảnh mới
//        cloudinaryService.deleteFile(anhDong.getAnh());
//
//        // ✅ Upload ảnh mới lên Cloudinary
//        String url = cloudinaryService.uploadFile(file);
//
//        // ✅ Lưu URL ảnh mới vào database
//        anhDong.setAnh(url);
//        return anhDongRepository.save(anhDong);
//    }

    // ✅ Xóa ảnh theo ID
    @Override
    public boolean deleteAnh(Long id) throws IOException {
        Optional<AnhDong> optionalAnhDong = anhDongRepository.findById(id);
        if (optionalAnhDong.isEmpty()) {
            return false;
        }

        AnhDong anhDong = optionalAnhDong.get();

        // ✅ Xóa ảnh trên Cloudinary trước khi xóa trong DB
        try {
            cloudinaryService.deleteFile(anhDong.getAnh());
        } catch (IOException e) {
            System.out.println("Lỗi khi xóa ảnh trên Cloudinary: " + e.getMessage());
            return false; // Không xóa khỏi DB nếu xóa trên Cloudinary thất bại
        }

        // ✅ Xóa record trong database
        anhDongRepository.deleteById(id);
        return true;
    }

    @Override
    public List<AnhDong> getAllAnh() {
        return anhDongRepository.findAll();
    }

    @Override
    public Optional<AnhDong> getAnhById(Long id) {
        return anhDongRepository.findById(id);
    }

//    private String saveFileToStorage(MultipartFile file) throws IOException {
//        // Ở đây bạn có thể lưu file vào Cloudinary, AWS S3, hoặc lưu local
//        // Giả sử lưu vào Cloudinary, giả lập bằng đường dẫn ảnh:
//        return "https://res.cloudinary.com/demo/image/upload/" + file.getOriginalFilename();
//    }
}

