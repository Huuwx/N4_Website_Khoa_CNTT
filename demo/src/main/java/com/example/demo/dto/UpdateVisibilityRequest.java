package com.example.demo.dto;

import lombok.Data;

@Data
public class UpdateVisibilityRequest {
    private boolean hienAnh;
    private boolean hienLinhVucNghienCuu;
    private boolean hienHocVi;
    private boolean hienKhoa;
    private boolean hienBoMon;
}
