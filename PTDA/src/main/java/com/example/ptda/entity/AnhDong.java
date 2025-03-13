package com.example.ptda.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "anh_dong")
@Data

public class AnhDong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnh;

    private String anh;
}
