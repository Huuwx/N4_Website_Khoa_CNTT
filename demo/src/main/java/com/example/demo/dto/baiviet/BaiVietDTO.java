package com.example.demo.dto.baiviet;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BaiVietDTO {
    private Long idbv;
    private String tenBaiViet;
    private String noiDung;
    private LocalDateTime ngayDang;
    private LocalDateTime ngayChinhSua;
    private Long idDanhMuc;
    private String idTaiKhoan;
    private List<String> danhSachAnh;
}
