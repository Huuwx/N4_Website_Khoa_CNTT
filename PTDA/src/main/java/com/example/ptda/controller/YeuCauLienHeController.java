package com.example.ptda.controller;

import com.example.ptda.dto.YeuCauLienHeDTO;
import com.example.ptda.dto.ResponseDTO;
import com.example.ptda.service.YeuCauLienHeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/yeu-cau-lien-he")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép React truy cập
public class YeuCauLienHeController {

    @Autowired
    private YeuCauLienHeService yeuCauLienHeService;

    // Lấy danh sách tất cả yêu cầu liên hệ
    @GetMapping
    public ResponseEntity<ResponseDTO<List<YeuCauLienHeDTO>>> getAllYeuCau() {
        ResponseDTO<List<YeuCauLienHeDTO>> response = yeuCauLienHeService.getAllYeuCau();
        return ResponseEntity.ok(response);
    }

    // Lấy yêu cầu liên hệ theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<YeuCauLienHeDTO>> getYeuCauById(@PathVariable Long id) {
        ResponseDTO<YeuCauLienHeDTO> response = yeuCauLienHeService.getYeuCauById(id);
        return ResponseEntity.ok(response);
    }

    // Tạo mới yêu cầu liên hệ
    @PostMapping
    public ResponseEntity<ResponseDTO<YeuCauLienHeDTO>> createYeuCau(@RequestBody YeuCauLienHeDTO yeuCauDTO) {
        ResponseDTO<YeuCauLienHeDTO> response = yeuCauLienHeService.createYeuCau(yeuCauDTO);
        return ResponseEntity.ok(response);
    }

    // Cập nhật thông tin yêu cầu liên hệ
    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<YeuCauLienHeDTO>> updateYeuCau(
            @PathVariable Long id, 
            @RequestBody YeuCauLienHeDTO yeuCauDTO) {
        ResponseDTO<YeuCauLienHeDTO> response = yeuCauLienHeService.updateYeuCau(id, yeuCauDTO);
        return ResponseEntity.ok(response);
    }

    // Xóa yêu cầu liên hệ
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO<String>> deleteYeuCau(@PathVariable Long id) {
        ResponseDTO<String> response = yeuCauLienHeService.deleteYeuCau(id);
        return ResponseEntity.ok(response);
    }
}
