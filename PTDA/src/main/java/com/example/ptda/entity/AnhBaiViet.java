package com.example.ptda.entity;

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

    private String anh;
}
