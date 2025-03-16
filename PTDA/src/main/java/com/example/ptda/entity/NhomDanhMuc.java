package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "nhom_danh_muc")
@Data
public class NhomDanhMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tenNhom;

    @OneToMany(mappedBy = "nhomDanhMuc", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DanhMuc> danhMucs;
}
