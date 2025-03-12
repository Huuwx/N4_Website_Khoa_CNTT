package com.example.ptda.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ptda.entity.BaiViet;
import com.example.ptda.exception.ResourceNotFoundException;
import com.example.ptda.repository.BaiVietRepository;
import com.example.ptda.service.BaiVietService;

@Service
public class BaiVietServiceImpl implements BaiVietService {
    @Autowired
    private BaiVietRepository baiVietRepository;

    @Override
    public List<BaiViet> getAllBaiViet() {
        return baiVietRepository.findAll();
    }

    @Override
    public BaiViet getBaiVietById(Long id) {
        Optional<BaiViet> baiViet = baiVietRepository.findById(id);
        return baiViet.orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài viết với id: " + id));
    }

    @Override
    public BaiViet createBaiViet(BaiViet baiViet) {
        return baiVietRepository.save(baiViet);
    }

    @Override
    public BaiViet updateBaiViet(Long id, BaiViet baiViet) {
        if (!baiVietRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy bài viết với id: " + id);
        }
        return baiVietRepository.save(baiViet);
    }

    @Override
    public void deleteBaiViet(Long id) {
        if (!baiVietRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy bài viết với id: " + id);
        }
        baiVietRepository.deleteById(id);
    }
}