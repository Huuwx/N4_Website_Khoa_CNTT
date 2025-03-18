package com.example.demo.model;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "anh_bai_viet")
@Data
public class AnhBaiViet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnh;

    @ManyToOne
    @JoinColumn(name = "idbv", nullable = false)
    private BaiViet baiViet;

    @Column(length = 500)
    private String anh;

    private String moTa;
    private boolean anhChinh;
}
