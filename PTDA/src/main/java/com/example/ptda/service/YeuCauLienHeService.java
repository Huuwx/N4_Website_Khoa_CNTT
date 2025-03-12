package com.example.ptda.service;

import com.example.ptda.dto.YeuCauLienHeDTO;
import com.example.ptda.dto.YeuCauLienHeDTO;
import com.example.ptda.dto.ResponseDTO;

import java.util.List;

public interface YeuCauLienHeService {
    ResponseDTO<List<YeuCauLienHeDTO>> getAllYeuCau();
    ResponseDTO<YeuCauLienHeDTO> getYeuCauById(Long id);
    ResponseDTO<YeuCauLienHeDTO> createYeuCau(YeuCauLienHeDTO yeuCauLienHeDTO);
    ResponseDTO<YeuCauLienHeDTO> updateYeuCau(Long id, YeuCauLienHeDTO yeuCauLienHeDTO);
    ResponseDTO<String> deleteYeuCau(Long id);
}

