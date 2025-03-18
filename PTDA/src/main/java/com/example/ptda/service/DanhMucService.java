package com.example.ptda.service;

import com.example.ptda.dto.DanhMucDTO;
import com.example.ptda.dto.ResponseDTO;

import java.util.List;

public interface DanhMucService {
    List<DanhMucDTO> getAllDanhMuc();
    DanhMucDTO createDanhMuc(DanhMucDTO danhMucDTO);
    DanhMucDTO updateDanhMuc(Long id, DanhMucDTO danhMucDTO);
    void deleteDanhMuc(Long id);
}
