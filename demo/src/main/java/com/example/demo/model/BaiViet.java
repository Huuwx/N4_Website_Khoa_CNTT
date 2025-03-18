package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "bai_viet")
@Data
public class BaiViet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idbv;

    private String tenBaiViet;

    @Column(columnDefinition = "TEXT")
    private String noiDung;

    private LocalDateTime ngayDang;
    private LocalDateTime ngayChinhSua;
    private boolean daPheDuyet;
    private int luotXem;

    @ManyToOne
    @JoinColumn(name = "id_danhmuc", nullable = false)
    private DanhMuc danhMuc;

    @ManyToOne
    @JoinColumn(name = "id_taikhoan", nullable = false)
    private TaiKhoan taiKhoan;

    public void setIdbv(Long id) {
        this.idbv = id;
    }
}
