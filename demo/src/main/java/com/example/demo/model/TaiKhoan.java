package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tai_khoan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaiKhoan {
    @Id
    @Column(name = "tai_khoan", unique = true, nullable = false)
    private String taiKhoan;

    @OneToOne
    @JoinColumn(name = "idgv", nullable = false)
    @JsonBackReference
    private ThongTinGiangVien giangVien;

    @Column(nullable = false)
    private String matKhau;

    @Column(nullable = false)
    private String hoTen;

    private String gioiTinh;
    private String sdt;

    @Column(unique = true)
    private String email;

    private String trangThai;
    private String phanQuyen;
    private String ngayTao;
    private String ngayChinhSua;
}