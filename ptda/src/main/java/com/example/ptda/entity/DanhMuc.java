package com.example.ptda.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "danh_muc")
@Data
public class DanhMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDanhMuc;

    private String maDanhMuc;
    private String tenDanhMuc;
    private String nhomDanhMuc;
}