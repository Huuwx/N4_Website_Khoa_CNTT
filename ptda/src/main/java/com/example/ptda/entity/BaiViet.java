package com.example.ptda.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Setter; // Thêm import này

@Entity
@Table(name = "bai_viet")
@Data
@Setter // Thêm @Setter
public class BaiViet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idbv;

    private String tenBaiViet;
    private String noiDung;
    private String ngayDang;
    private String ngayChinhSua;

    @ManyToOne
    @JoinColumn(name = "id_danhmuc", nullable = false)
    private DanhMuc danhMuc;

    @ManyToOne
    @JoinColumn(name = "id_taikhoan", nullable = false)
    private TaiKhoan taiKhoan;
}