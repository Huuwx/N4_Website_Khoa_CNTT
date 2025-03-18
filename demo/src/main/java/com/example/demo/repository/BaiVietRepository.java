package com.example.demo.repository;

import com.example.demo.model.BaiViet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BaiVietRepository extends JpaRepository<BaiViet, Long> {
    List<BaiViet> findByTenBaiVietContaining(String tenBaiViet);
    List<BaiViet> findByDanhMuc_IdDanhMuc(Long idDanhMuc);
}