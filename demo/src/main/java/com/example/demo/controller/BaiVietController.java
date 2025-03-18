package com.example.demo.controller;

import com.example.demo.dto.baiviet.BaiVietDTO;
import com.example.demo.dto.baiviet.BaiVietResponse;
import com.example.demo.service.BaiVietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bai-viet")
public class BaiVietController {

    @Autowired
    private BaiVietService baiVietService;

    @GetMapping
    public ResponseEntity<List<BaiVietResponse>> getAllBaiViet() {
        return ResponseEntity.ok(baiVietService.getAllBaiViet());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaiVietResponse> getBaiVietById(@PathVariable Long id) {
        BaiVietResponse baiViet = baiVietService.getBaiVietById(id);
        if (baiViet == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(baiViet);
    }

    @GetMapping("/search")
    public ResponseEntity<List<BaiVietResponse>> searchBaiVietByTitle(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long idDanhMuc) {

        if (title != null && !title.isEmpty()) {
            return ResponseEntity.ok(baiVietService.searchBaiVietByTitle(title));
        } else if (idDanhMuc != null) {
            return ResponseEntity.ok(baiVietService.getBaiVietByDanhMuc(idDanhMuc));
        } else {
            return ResponseEntity.ok(baiVietService.getAllBaiViet());
        }
    }

    @PostMapping
    public ResponseEntity<BaiVietResponse> createBaiViet(@RequestBody BaiVietDTO baiVietDTO) {
        return new ResponseEntity<>(baiVietService.createBaiViet(baiVietDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaiVietResponse> updateBaiViet(
            @PathVariable Long id,
            @RequestBody BaiVietDTO baiVietDTO) {

        BaiVietResponse updatedBaiViet = baiVietService.updateBaiViet(id, baiVietDTO);
        return ResponseEntity.ok(updatedBaiViet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBaiViet(@PathVariable Long id) {
        boolean deleted = baiVietService.deleteBaiViet(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}