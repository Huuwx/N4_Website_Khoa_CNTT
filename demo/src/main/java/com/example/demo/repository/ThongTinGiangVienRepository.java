package com.example.demo.repository;

import com.example.demo.model.ThongTinGiangVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThongTinGiangVienRepository extends JpaRepository<ThongTinGiangVien, Long> {
}