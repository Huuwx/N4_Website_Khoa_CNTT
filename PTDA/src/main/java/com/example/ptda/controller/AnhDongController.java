package com.example.ptda.controller;

import com.example.ptda.entity.AnhDong;
import com.example.ptda.service.AnhDongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/anh-dong")
@CrossOrigin(origins = "*")  // Hỗ trợ frontend gọi API
public class AnhDongController {
    private final AnhDongService anhDongService;

    public AnhDongController(AnhDongService anhDongService) {
        this.anhDongService = anhDongService;
    }

    // ✅ API: Lấy danh sách tất cả ảnh
    @GetMapping("/upload")
    public ResponseEntity<List<AnhDong>> getAllAnh() {
        List<AnhDong> danhSachAnh = anhDongService.getAllAnh();
        return ResponseEntity.ok(danhSachAnh);
    }

    // ✅ API: Lấy ảnh theo ID
    @GetMapping("/upload/{id}")
    public ResponseEntity<?> getAnhById(@PathVariable Long id) {
        Optional<AnhDong> anhDong = anhDongService.getAnhById(id);
        return anhDong.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body((AnhDong) Map.of("error", "Không tìm thấy ảnh")));
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadAnh(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File không được để trống"));
        }

        try {
            System.out.println("File nhận được: " + file.getOriginalFilename()); // Debug log
            AnhDong anhDong = anhDongService.uploadAnh(file);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Upload thành công!");
            response.put("url", anhDong.getAnh());
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ API: Cập nhật ảnh theo ID
//    @PutMapping("/update/{id}")
//    public ResponseEntity<?> updateAnh(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
//        if (file == null || file.isEmpty()) {
//            return ResponseEntity.badRequest().body(Map.of("error", "File không được để trống"));
//        }
//
//        try {
//            System.out.println("Cập nhật file: " + file.getOriginalFilename()); // Debug log
//            AnhDong anhDong = anhDongService.updateAnh(id, file);
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "Cập nhật ảnh thành công!");
//            response.put("url", anhDong.getAnh());
//            return ResponseEntity.ok(response);
//        } catch (IOException e) {
//            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
//        }
//    }

    // ✅ API: Xóa ảnh theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAnh(@PathVariable Long id) throws IOException {
        boolean deleted = anhDongService.deleteAnh(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Xóa ảnh thành công!"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy ảnh để xóa"));
        }
    }

}


