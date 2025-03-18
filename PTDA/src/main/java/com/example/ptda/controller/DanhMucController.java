package com.example.ptda.controller;

import com.example.ptda.dto.DanhMucDTO;
import com.example.ptda.service.DanhMucService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/danh-muc")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Hỗ trợ gọi API từ frontend (có thể thay "*" bằng domain cụ thể)
public class DanhMucController {
    private final DanhMucService danhMucService;

    @GetMapping
    public ResponseEntity<List<DanhMucDTO>> getAllDanhMuc() {
        return ResponseEntity.ok(danhMucService.getAllDanhMuc());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // Trả về 201 Created khi tạo thành công
    public DanhMucDTO createDanhMuc(@Valid @RequestBody DanhMucDTO danhMucDTO) {
        return danhMucService.createDanhMuc(danhMucDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DanhMucDTO> updateDanhMuc(@PathVariable Long id, @Valid @RequestBody DanhMucDTO danhMucDTO) {
        return ResponseEntity.ok(danhMucService.updateDanhMuc(id, danhMucDTO));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Trả về 204 No Content khi xóa thành công
    public void deleteDanhMuc(@PathVariable Long id) {
        danhMucService.deleteDanhMuc(id);
    }
}

