package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "danh_muc")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanhMuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenDanhMuc;

    @ManyToOne
    @JoinColumn(name = "nhom_danh_muc_id", nullable = false) // Đảm bảo không null
    private NhomDanhMuc nhomDanhMuc;
}
