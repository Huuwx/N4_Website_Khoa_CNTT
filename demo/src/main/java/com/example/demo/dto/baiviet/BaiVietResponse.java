package com.example.demo.dto.baiviet;

import com.example.demo.model.DanhMuc;
import com.example.demo.model.TaiKhoan;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BaiVietResponse {
    private Long idbv;
    private String tenBaiViet;
    private String noiDung;
    private LocalDateTime ngayDang;
    private LocalDateTime ngayChinhSua;
    private DanhMuc danhMuc;


    private String idTaiKhoan;
    private String hoTenTaiKhoan;

    private List<String> danhSachAnh;
}
