package com.example.ptda.service;

import java.util.List;

import com.example.ptda.entity.LienHeKhoa;

public interface LienHeKhoaService {
    List<LienHeKhoa> getAllLienHeKhoa();
    LienHeKhoa getLienHeKhoaById(Long id);
    LienHeKhoa createLienHeKhoa(LienHeKhoa lienHeKhoa);
    LienHeKhoa updateLienHeKhoa(Long id, LienHeKhoa lienHeKhoa);
    void deleteLienHeKhoa(Long id);
}