package com.example.demo.repository;

import com.example.demo.model.AnhBaiViet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnhBaiVietRepository extends JpaRepository<AnhBaiViet, Long> {
    List<AnhBaiViet> findByBaiViet_Idbv(Long idbv);
    void deleteByBaiViet_Idbv(Long idbv);
}