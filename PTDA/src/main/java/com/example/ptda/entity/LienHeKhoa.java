package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "lien_he_khoa")
@Data
public class LienHeKhoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sdt;
    private String diaChi;
    private String email;
    private String noiDung;
}
