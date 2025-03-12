package com.example.ptda.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "thong_tin_giang_vien")
@Data
public class ThongTinGiangVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idgv;

    private String anh;
    private String linhVucNghienCuu;
    private String hocVi;
    private String khoa;
    private String boMon;
    private String chucVu;
}