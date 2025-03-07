package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "anh_dong")
@Data
public class AnhDong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnh;

    private String anh;
}
