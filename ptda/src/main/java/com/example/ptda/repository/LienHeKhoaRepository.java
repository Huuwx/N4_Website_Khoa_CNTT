package com.example.ptda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ptda.entity.LienHeKhoa;

@Repository
public interface LienHeKhoaRepository extends JpaRepository<LienHeKhoa, Long> {
}