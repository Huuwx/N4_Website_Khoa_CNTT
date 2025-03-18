/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author duc
 */
public class TaiKhoan {
    private String taiKhoan;
    private int idgv;
    private String matKhau;
    private String hoTen;
    private String gioiTinh;
    private String sdt;
    private String email;
    private String trangThai;
    private String phanQuyen;
    private String ngayTao;
    private String ngayChinhSua;

    public TaiKhoan(int id, String username, String password, String fullname, String gender, String phone, String email1, String status) {
    }

    public TaiKhoan(String taiKhoan, int idgv, String matKhau, String hoTen, String gioiTinh, String sdt, String email, String trangThai, String phanQuyen, String ngayTao, String ngayChinhSua) {
        this.taiKhoan = taiKhoan;
        this.idgv = idgv;
        this.matKhau = matKhau;
        this.hoTen = hoTen;
        this.gioiTinh = gioiTinh;
        this.sdt = sdt;
        this.email = email;
        this.trangThai = trangThai;
        this.phanQuyen = phanQuyen;
        this.ngayTao = ngayTao;
        this.ngayChinhSua = ngayChinhSua;
    }

    public String getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(String taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public int getIdgv() {
        return idgv;
    }

    public void setIdgv(int idgv) {
        this.idgv = idgv;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getPhanQuyen() {
        return phanQuyen;
    }

    public void setPhanQuyen(String phanQuyen) {
        this.phanQuyen = phanQuyen;
    }

    public String getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(String ngayTao) {
        this.ngayTao = ngayTao;
    }

    public String getNgayChinhSua() {
        return ngayChinhSua;
    }

    public void setNgayChinhSua(String ngayChinhSua) {
        this.ngayChinhSua = ngayChinhSua;
    }

    @Override
    public String toString() {
        return "TaiKhoan{" + "taiKhoan=" + taiKhoan + ", idgv=" + idgv + ", matKhau=" + matKhau + ", hoTen=" + hoTen + ", gioiTinh=" + gioiTinh + ", sdt=" + sdt + ", email=" + email + ", trangThai=" + trangThai + ", phanQuyen=" + phanQuyen + ", ngayTao=" + ngayTao + ", ngayChinhSua=" + ngayChinhSua + '}';
    }


}
