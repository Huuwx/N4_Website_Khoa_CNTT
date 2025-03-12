package com.example.ptda.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ptda.entity.LienHeKhoa;
import com.example.ptda.exception.ResourceNotFoundException;
import com.example.ptda.repository.LienHeKhoaRepository;
import com.example.ptda.service.LienHeKhoaService;

@Service
public class LienHeKhoaServiceImpl implements LienHeKhoaService {

    @Autowired
    private LienHeKhoaRepository lienHeKhoaRepository;

    @Override
    public List<LienHeKhoa> getAllLienHeKhoa() {
        return lienHeKhoaRepository.findAll();
    }

    @Override
    public LienHeKhoa getLienHeKhoaById(Long id) {
        Optional<LienHeKhoa> lienHeKhoa = lienHeKhoaRepository.findById(id);
        return lienHeKhoa.orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy liên hệ khoa với id: " + id));
    }

    @Override
    public LienHeKhoa createLienHeKhoa(LienHeKhoa lienHeKhoa) {
        return lienHeKhoaRepository.save(lienHeKhoa);
    }

    @Override
    public LienHeKhoa updateLienHeKhoa(Long id, LienHeKhoa lienHeKhoa) {
        if (!lienHeKhoaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy liên hệ khoa với id: " + id);
        }
        return lienHeKhoaRepository.save(lienHeKhoa);
    }

    @Override
    public void deleteLienHeKhoa(Long id) {
        if (!lienHeKhoaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy liên hệ khoa với id: " + id);
        }
        lienHeKhoaRepository.deleteById(id);
    }
}