package com.example.ptda.service;

import java.util.List;

import com.example.ptda.entity.BaiViet;

public interface BaiVietService {
    List<BaiViet> getAllBaiViet();
    BaiViet getBaiVietById(Long id);
    BaiViet createBaiViet(BaiViet baiViet);
    BaiViet updateBaiViet(Long id, BaiViet baiViet);
    void deleteBaiViet(Long id);
}