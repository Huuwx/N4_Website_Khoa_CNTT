package com.example.ptda.entity;

import jakarta.persistence.*;
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
