package com.example.ptda.dto;

import lombok.Data;

@Data
public class BaiVietDTO {
    private Long idbv;
    private String tenBaiViet;
    private String noiDung;
    private String ngayDang;
    private String ngayChinhSua;
    private Long idDanhMuc;
    private String taiKhoan;
}