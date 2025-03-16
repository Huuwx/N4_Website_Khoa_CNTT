package com.example.ptda.controller;

import com.example.ptda.dto.NhomDanhMucDTO;
import com.example.ptda.service.NhomDanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhom-danh-muc")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NhomDanhMucController {
    private final NhomDanhMucService nhomDanhMucService;

    @PostMapping("/create")
    public ResponseEntity<NhomDanhMucDTO> createNhomDanhMuc(@RequestBody NhomDanhMucDTO nhomDanhMucDTO) {
        return ResponseEntity.ok(nhomDanhMucService.createNhomDanhMuc(nhomDanhMucDTO));
    }

    @GetMapping
    public ResponseEntity<List<NhomDanhMucDTO>> getAllNhomDanhMuc() {
        return ResponseEntity.ok(nhomDanhMucService.getAllNhomDanhMuc());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNhomDanhMuc(@PathVariable Long id) {
        nhomDanhMucService.deleteNhomDanhMuc(id);
        return ResponseEntity.ok("Xóa nhóm danh mục thành công!");
    }
}
