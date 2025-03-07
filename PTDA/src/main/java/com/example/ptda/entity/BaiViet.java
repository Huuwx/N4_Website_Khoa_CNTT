package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bai_viet")
@Data
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
