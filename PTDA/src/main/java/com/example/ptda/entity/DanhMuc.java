package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

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
