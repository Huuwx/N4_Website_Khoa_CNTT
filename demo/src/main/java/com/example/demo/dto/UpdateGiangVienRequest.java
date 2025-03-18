package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateGiangVienRequest {
    private String anh;

    @NotBlank(message = "Lĩnh vực nghiên cứu không được để trống")
    private String linhVucNghienCuu;

    @NotBlank(message = "Học vị không được để trống")
    private String hocVi;

    @NotBlank(message = "Khoa không được để trống")
    private String khoa;

    @NotBlank(message = "Bộ môn không được để trống")
    private String boMon;


    // Trạng thái hiển thị (cho phép null để chỉ cập nhật khi cần)
    private Boolean hienAnh;
    private Boolean hienLinhVucNghienCuu;
    private Boolean hienHocVi;
    private Boolean hienKhoa;
    private Boolean hienBoMon;
}
