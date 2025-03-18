package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private String taiKhoan;
    private String hoTen;
    private String email;
    private String phanQuyen;

    // Thông tin giảng viên
    private Long idgv;
    private String anh;
    private String linhVucNghienCuu;
    private String hocVi;
    private String khoa;
    private String boMon;
}
