package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tai_khoan")
@Data
public class TaiKhoan {
    @Id
    @Column(name = "tai_khoan", unique = true, nullable = false)
    private String taiKhoan;

    @OneToOne
    @JoinColumn(name = "idgv", nullable = false)
    private ThongTinGiangVien giangVien;

    private String matKhau;
    private String hoTen;
    private String gioiTinh;
    private String sdt;
    private String email;
    private String trangThai;
    private String phanQuyen;
    private String ngayTao;
    private String ngayChinhSua;
}
