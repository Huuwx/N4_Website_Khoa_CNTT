package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "thong_tin_giang_vien")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinGiangVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idgv;

    private String anh;

    @Column(name = "linh_vuc_nghien_cuu")
    private String linhVucNghienCuu;

    @Column(name = "hoc_vi")
    private String hocVi;

    private String khoa;

    @Column(name = "bo_mon")
    private String boMon;

    // @Column(name = "chuc_vu")
    // private String chucVu;

    // Các cột kiểm soát hiển thị thông tin trên FE
    private boolean hienAnh = true;
    private boolean hienLinhVucNghienCuu = true;
    private boolean hienHocVi = true;
    private boolean hienKhoa = true;
    private boolean hienBoMon = true;
    // private boolean hienChucVu = true;

    @OneToOne(mappedBy = "giangVien", cascade = CascadeType.ALL)
    @JsonBackReference
    private TaiKhoan taiKhoan;
}
