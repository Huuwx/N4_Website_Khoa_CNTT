package com.example.ptda.controller;

import com.example.ptda.dto.DanhMucDTO;
import com.example.ptda.dto.ResponseDTO;
import com.example.ptda.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/danh-muc")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép React truy cập
public class DanhMucController {
    @Autowired
    private DanhMucService danhMucService;

    @GetMapping
    public ResponseEntity<ResponseDTO<List<DanhMucDTO>>> getAllDanhMuc() {
        ResponseDTO<List<DanhMucDTO>> response = danhMucService.getAllDanhMuc();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<DanhMucDTO>> getDanhMucById(@PathVariable Long id) {
        ResponseDTO<DanhMucDTO> response = danhMucService.getDanhMucById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ResponseDTO<DanhMucDTO>> createDanhMuc(@RequestBody DanhMucDTO danhMucDTO) {
        ResponseDTO<DanhMucDTO> response = danhMucService.createDanhMuc(danhMucDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<DanhMucDTO>> updateDanhMuc(@PathVariable Long id, @RequestBody DanhMucDTO danhMucDTO) {
        ResponseDTO<DanhMucDTO> response = danhMucService.updateDanhMuc(id, danhMucDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO<String>> deleteDanhMuc(@PathVariable Long id) {
        ResponseDTO<String> response = danhMucService.deleteDanhMuc(id);
        return ResponseEntity.ok(response);
    }
}
