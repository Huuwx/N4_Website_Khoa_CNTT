package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponseDto {
    // Thông tin tài khoản
    private String taiKhoan;
    private String hoTen;
    private String email;
    private String sdt;
    private String gioiTinh;
    private String phanQuyen;

    // Thông tin giảng viên
    private String anh;
    private String linhVucNghienCuu;
    private String hocVi;
    private String khoa;
    private String boMon;
    private String chucVu;

    // Trạng thái hiển thị
    private boolean hienAnh;
    private boolean hienLinhVucNghienCuu;
    private boolean hienHocVi;
    private boolean hienKhoa;
    private boolean hienBoMon;
    private boolean hienChucVu;
}
