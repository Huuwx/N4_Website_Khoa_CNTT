package com.example.ptda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ptda.entity.BaiViet;
import com.example.ptda.service.BaiVietService;

@RestController
@RequestMapping("/api/articles")
public class BaiVietController {

    @Autowired
    private BaiVietService baiVietService;

    @GetMapping
    public ResponseEntity<List<BaiViet>> getAllBaiViet() {
        return new ResponseEntity<>(baiVietService.getAllBaiViet(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaiViet> getBaiVietById(@PathVariable Long id) {
        BaiViet baiViet = baiVietService.getBaiVietById(id);
        return baiViet != null 
            ? new ResponseEntity<>(baiViet, HttpStatus.OK)
            : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<BaiViet> createBaiViet(@RequestBody BaiViet baiViet) {
        return new ResponseEntity<>(baiVietService.createBaiViet(baiViet), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaiViet> updateBaiViet(@PathVariable Long id, @RequestBody BaiViet baiViet) {
        BaiViet updatedBaiViet = baiVietService.updateBaiViet(id, baiViet);
        return updatedBaiViet != null
            ? new ResponseEntity<>(updatedBaiViet, HttpStatus.OK)
            : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBaiViet(@PathVariable Long id) {
        baiVietService.deleteBaiViet(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
