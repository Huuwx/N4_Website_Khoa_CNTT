/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author duc
 */
public class BaiVietAnh {
    private Integer idbv;
    private Integer idgv;
        private String tenBaiViet;
    private String noiDung;
    private String ngayDang;
    private String ngayChinhSua;
    private Integer idDanhMuc;
    private String anh;

    public BaiVietAnh() {
    }

    public BaiVietAnh(Integer idbv, Integer idgv, String tenBaiViet, String noiDung, String ngayDang, String ngayChinhSua, Integer idDanhMuc, String anh) {
        this.idbv = idbv;
        this.idgv = idgv;
        this.tenBaiViet = tenBaiViet;
        this.noiDung = noiDung;
        this.ngayDang = ngayDang;
        this.ngayChinhSua = ngayChinhSua;
        this.idDanhMuc = idDanhMuc;
        this.anh = anh;
    }
    
    public Integer getIdbv() {
        return idbv;
    }

    public void setIdbv(Integer idbv) {
        this.idbv = idbv;
    }

    public Integer getIdgv() {
        return idgv;
    }

    public void setIdgv(Integer idgv) {
        this.idgv = idgv;
    }

    public String getTenBaiViet() {
        return tenBaiViet;
    }

    public void setTenBaiViet(String tenBaiViet) {
        this.tenBaiViet = tenBaiViet;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public String getNgayDang() {
        return ngayDang;
    }

    public void setNgayDang(String ngayDang) {
        this.ngayDang = ngayDang;
    }

    public String getNgayChinhSua() {
        return ngayChinhSua;
    }

    public void setNgayChinhSua(String ngayChinhSua) {
        this.ngayChinhSua = ngayChinhSua;
    }

    public Integer getIdDanhMuc() {
        return idDanhMuc;
    }

    public void setIdDanhMuc(Integer idDanhMuc) {
        this.idDanhMuc = idDanhMuc;
    }

    public String getAnh() {
        return anh;
    }

    public void setAnh(String anh) {
        this.anh = anh;
    }
}
