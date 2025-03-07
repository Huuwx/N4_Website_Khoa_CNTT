package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "yeu_cau_lien_he")
@Data
public class YeuCauLienHe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLienHe;

    private String ngayLienHe;
    private String hoTen;
    private String email;
    private String noiDung;
    private String trangThai;
}
