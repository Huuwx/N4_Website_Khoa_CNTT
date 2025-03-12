package com.example.ptda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ptda.entity.BaiViet;

@Repository
public interface BaiVietRepository extends JpaRepository<BaiViet, Long> {
}