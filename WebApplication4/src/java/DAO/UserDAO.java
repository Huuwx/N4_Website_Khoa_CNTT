/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.ArrayList;
import java.util.List;

import model.TaiKhoan;

/**
 *
 * @author duc
 */
public class UserDAO {
    public boolean checkUser(TaiKhoan taiKhoan) {
        String sql = "SELECT * FROM tai_khoan WHERE tai_khoan = ? AND mat_khau = ?";
        try (Connection conn = new ConnectDatabase().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, taiKhoan.getTaiKhoan());
            stmt.setString(2, taiKhoan.getMatKhau());
            ResultSet rs = stmt.executeQuery();

            return rs.next();  // Nếu có kết quả → Đăng nhập thành công
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    public String getRole(TaiKhoan taiKhoan) {
    String sql = "SELECT phan_quyen FROM tai_khoan WHERE tai_khoan = ? AND mat_khau = ?";
    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setString(1, taiKhoan.getTaiKhoan());
        stmt.setString(2, taiKhoan.getMatKhau());
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) { 
            return rs.getString("phan_quyen");  
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return null;  
}
    public String getTrangThai(TaiKhoan taiKhoan) {
    String sql = "SELECT trang_thai FROM tai_khoan WHERE tai_khoan = ? AND mat_khau = ?";
    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setString(1, taiKhoan.getTaiKhoan());
        stmt.setString(2, taiKhoan.getMatKhau());
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) { 
            return rs.getString("trang_thai");  
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return null;  // Trả về null nếu không tìm thấy vai trò
}
public ArrayList<TaiKhoan> getAllTaiKhoan(int page, int pageSize) {
    ArrayList<TaiKhoan> list = new ArrayList<>();
    int offset = (page - 1) * pageSize;

   String sql = "SELECT * FROM tai_khoan ORDER BY ngay_tao DESC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";
    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setInt(1, offset);
        stmt.setInt(2, pageSize);

        try (ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                TaiKhoan tk = new TaiKhoan(
                    rs.getString("tai_khoan"),  
                    rs.getInt("idgv"),  
                    rs.getString("mat_khau"),  
                    rs.getString("ho_ten"),  
                    rs.getString("gioi_tinh"),  
                    rs.getString("sdt"),  
                    rs.getString("email"),  
                    rs.getString("trang_thai"),  
                    rs.getString("phan_quyen"),  
                    rs.getString("ngay_tao"),  
                    rs.getString("ngay_chinh_sua")  
                );
                list.add(tk);
            }
        }

    } catch (SQLException e) {
        e.printStackTrace();
    }
    return list;
}

public boolean registerUser(TaiKhoan tk) throws Exception {
    String sql = "INSERT INTO tai_khoan (tai_khoan, mat_khau, ho_ten, gioi_tinh, sdt, email) " +
                 "VALUES (?, ?, ?, ?, ?, ?)";
    
    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        stmt.setString(1, tk.getTaiKhoan());
        stmt.setString(2, tk.getMatKhau()); // Nếu cần mã hóa, sử dụng BCrypt trước khi set
        stmt.setString(3, tk.getHoTen());
        stmt.setString(4, tk.getGioiTinh());
        stmt.setString(5, tk.getSdt());
        stmt.setString(6, tk.getEmail());

        stmt.executeUpdate();
        return true; // ✅ Đăng ký thành công
    } catch (SQLException e) {
        throw new Exception("Lỗi đăng ký: " + e.getMessage()); // ✅ Ném lỗi lên Servlet
    }
}
    public TaiKhoan getTaiKhoanById(int id) {
    String sql = "SELECT * FROM tai_khoan WHERE idgv = ?";  
    TaiKhoan tk = null;

    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setInt(1, id); 

        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {  // Nếu có kết quả thì tạo đối tượng TaiKhoan
                tk = new TaiKhoan(
                    rs.getString("tai_khoan"),
                    rs.getInt("idgv"),
                    rs.getString("mat_khau"),
                    rs.getString("ho_ten"),
                    rs.getString("gioi_tinh"),
                    rs.getString("sdt"),
                    rs.getString("email"),
                    rs.getString("trang_thai"),
                    rs.getString("phan_quyen"),
                    rs.getString("ngay_tao"),
                    rs.getString("ngay_chinh_sua")
                );
                System.out.println("Tìm thấy tài khoản: " + tk.getTaiKhoan());
            } else {
                System.out.println("Không tìm thấy tài khoản với ID: " + id);
            }
        }

    } catch (Exception e) {
        System.out.println("Lỗi truy vấn tài khoản: " + e.getMessage());
    }

    return tk;  // Trả về tài khoản hoặc null nếu không tìm thấy
}
public boolean updateUser(TaiKhoan tk) throws Exception {
    String sql = "UPDATE tai_khoan SET tai_khoan = ?, mat_khau = ?, ho_ten = ?, gioi_tinh = ?, sdt = ?, email = ?, trang_thai = ? WHERE idgv = ?";
    
    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setString(1, tk.getTaiKhoan());
        stmt.setString(2, tk.getMatKhau()); // Nếu cần mã hóa mật khẩu, xử lý trước khi set
        stmt.setString(3, tk.getHoTen());
        stmt.setString(4, tk.getGioiTinh());
        stmt.setString(5, tk.getSdt());
        stmt.setString(6, tk.getEmail());
        stmt.setString(7, tk.getTrangThai());
        stmt.setInt(8, tk.getIdgv()); // ID của tài khoản cần cập nhật

        int rowsAffected = stmt.executeUpdate();
        return rowsAffected > 0; // ✅ Trả về true nếu có dòng nào được cập nhật
    } catch (SQLException e) {
        throw new Exception("Lỗi cập nhật tài khoản: " + e.getMessage()); // ✅ Ném lỗi lên Servlet
    }
}
public int getTotalTaiKhoan() {
    int total = 0;
    String sql = "SELECT COUNT(*) FROM tai_khoan";

    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {

        if (rs.next()) {
            total = rs.getInt(1);
        }

    } catch (SQLException e) {
        e.printStackTrace();
    }
    return total;
}
public boolean disableTaiKhoan(int id) {
    String sql = "delete from tai_khoan where idgv = ?";
    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, id);
        
        int rowsUpdated = stmt.executeUpdate();
        return rowsUpdated > 0;
    } catch (SQLException e) {
        e.printStackTrace();
        return false;
    }
}
public boolean VoHieuHoaTaiKhoan(int id) {
    
    String sql = "update tai_khoan SET trang_thai = 'Vo hieu hoa' where idgv = ? ";
    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, id);
        int rowsUpdated = stmt.executeUpdate();
        return rowsUpdated > 0;
    } catch (SQLException e) {
        e.printStackTrace();
        return false;
    }
}
public List<TaiKhoan> searchAccountsByUsername(String username) {
    List<TaiKhoan> list = new ArrayList<>();
    
    String sql = "SELECT * FROM tai_khoan WHERE username LIKE ?";
    
    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        // Đảm bảo tham số username được nối với dấu % ở cả 2 đầu
        stmt.setString(1, "%" + username + "%");
        
        ResultSet rs = stmt.executeQuery();
        
        // Duyệt qua kết quả trả về và thêm vào danh sách
        while (rs.next()) {
            TaiKhoan tk = new TaiKhoan(
                    rs.getString("tai_khoan"),  // Tên tài khoản
                    rs.getInt("idgv"),           // ID Giảng viên
                    rs.getString("mat_khau"),    // Mật khẩu
                    rs.getString("ho_ten"),      // Họ tên
                    rs.getString("gioi_tinh"),   // Giới tính
                    rs.getString("sdt"),         // Số điện thoại
                    rs.getString("email"),       // Email
                    rs.getString("trang_thai"),  // Trạng thái tài khoản
                    rs.getString("phan_quyen"),  // Phân quyền
                    rs.getString("ngay_tao"),    // Ngày tạo tài khoản
                    rs.getString("ngay_chinh_sua") // Ngày chỉnh sửa tài khoản
            );
            list.add(tk);  // Thêm tài khoản vào danh sách
        }
    } catch (SQLException e) {
        e.printStackTrace();  // Thông báo lỗi chi tiết
    }
    return list;
}

 public List<TaiKhoan> getTaiKhoanByUsername(String username) {
    List<TaiKhoan> list = new ArrayList<>();
    try {
        Connection conn = new ConnectDatabase().getConnection();
        String sql = "SELECT * FROM TaiKhoan WHERE tai_khoan = ?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, username);
        ResultSet rs = ps.executeQuery();
        
        while (rs.next()) {
            TaiKhoan tk = new TaiKhoan(
                rs.getInt("id"),
                rs.getString("tai_khoan"),
                rs.getString("mat_khau"),
                rs.getString("ho_ten"),
                rs.getString("gioi_tinh"),
                rs.getString("sdt"),
                rs.getString("phan_quyen"),
                rs.getString("trang_thai")
            );
            list.add(tk);
        }
        conn.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
    return list;
}


}
