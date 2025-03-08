package com.example.ptda.service;

import com.example.ptda.dto.DanhMucDTO;
import com.example.ptda.dto.ResponseDTO;

import java.util.List;

public interface DanhMucService {
    ResponseDTO<List<DanhMucDTO>> getAllDanhMuc();
    ResponseDTO<DanhMucDTO> getDanhMucById(Long id);
    ResponseDTO<DanhMucDTO> createDanhMuc(DanhMucDTO danhMucDTO);
    ResponseDTO<DanhMucDTO> updateDanhMuc(Long id, DanhMucDTO danhMucDTO);
    ResponseDTO<String> deleteDanhMuc(Long id);
}
