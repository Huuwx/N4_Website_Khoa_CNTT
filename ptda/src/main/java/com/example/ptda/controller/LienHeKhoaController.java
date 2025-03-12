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

import com.example.ptda.entity.LienHeKhoa;
import com.example.ptda.service.LienHeKhoaService;

@RestController
@RequestMapping("/api/lien-he-khoa")
public class LienHeKhoaController {

    @Autowired
    private LienHeKhoaService lienHeKhoaService;

    @GetMapping
    public ResponseEntity<List<LienHeKhoa>> getAllLienHeKhoa() {
        return new ResponseEntity<>(lienHeKhoaService.getAllLienHeKhoa(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LienHeKhoa> getLienHeKhoaById(@PathVariable Long id) {
        LienHeKhoa lienHeKhoa = lienHeKhoaService.getLienHeKhoaById(id);
        if (lienHeKhoa != null) {
            return new ResponseEntity<>(lienHeKhoa, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<LienHeKhoa> createLienHeKhoa(@RequestBody LienHeKhoa lienHeKhoa) {
        return new ResponseEntity<>(lienHeKhoaService.createLienHeKhoa(lienHeKhoa), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LienHeKhoa> updateLienHeKhoa(@PathVariable Long id, @RequestBody LienHeKhoa lienHeKhoa) {
        LienHeKhoa updatedLienHeKhoa = lienHeKhoaService.updateLienHeKhoa(id, lienHeKhoa);
        if (updatedLienHeKhoa != null) {
            return new ResponseEntity<>(updatedLienHeKhoa, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLienHeKhoa(@PathVariable Long id) {
        lienHeKhoaService.deleteLienHeKhoa(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}