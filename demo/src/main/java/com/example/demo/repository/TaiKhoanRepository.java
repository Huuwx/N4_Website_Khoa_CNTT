package com.example.demo.repository;

import com.example.demo.model.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String> {
    Optional<TaiKhoan> findByTaiKhoan(String taiKhoan);
    boolean existsByTaiKhoan(String taiKhoan);
    boolean existsByEmail(String email);
}