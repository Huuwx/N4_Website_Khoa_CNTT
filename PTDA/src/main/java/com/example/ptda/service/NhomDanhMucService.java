package com.example.ptda.service;

import com.example.ptda.dto.NhomDanhMucDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NhomDanhMucService {
    List<NhomDanhMucDTO> getAllNhomDanhMuc(); // Trả về DTO thay vì entity

    @Transactional
    NhomDanhMucDTO createNhomDanhMuc(NhomDanhMucDTO nhomDanhMucDTO);
    void deleteNhomDanhMuc(Long id);
}
