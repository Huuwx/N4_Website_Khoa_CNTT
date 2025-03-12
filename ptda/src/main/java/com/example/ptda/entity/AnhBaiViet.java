package com.example.ptda.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "anh_bai_viet")
@Data
public class AnhBaiViet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_anh")
    private Long idAnh;

    @ManyToOne
    @JoinColumn(name = "idbv", nullable = false)
    private BaiViet baiViet;

    private String anh;
}