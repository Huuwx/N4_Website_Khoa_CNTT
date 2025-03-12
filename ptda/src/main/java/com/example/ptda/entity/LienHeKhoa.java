package com.example.ptda.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Setter;

@Entity
@Table(name = "lien_he_khoa")
@Data
@Setter
public class LienHeKhoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sdt;
    private String diaChi;
    private String email;
    private String noiDung;
}