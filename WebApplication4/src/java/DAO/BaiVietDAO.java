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
import model.BaiVietAnh;

/**
 *
 * @author duc
 */
public class BaiVietDAO {
        public ArrayList<BaiVietAnh> getAllBaiViet(int page, int pageSize) {
        ArrayList<BaiVietAnh> list = new ArrayList<>();
        int offset = (page - 1) * pageSize;

        String sql = "SELECT * FROM bai_anh ORDER BY ngay_dang DESC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";

        try (Connection conn = new ConnectDatabase().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, offset);
            stmt.setInt(2, pageSize);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    BaiVietAnh bv = new BaiVietAnh(
                        rs.getInt("idbv"),
                        rs.getInt("idgv"),
                        rs.getString("ten_bai_viet"),
                        rs.getString("noi_dung"),
                        rs.getString("ngay_dang"),
                        rs.getString("ngay_chinh_sua"),
                        rs.getInt("id_danhmuc"),
                        rs.getString("anh")
                    );
                    list.add(bv);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }
     public int countBaiViet() {
        int count = 0;
        String sql = "SELECT COUNT(*) AS total FROM bai_viet";
        
        try (Connection conn = new ConnectDatabase().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            if (rs.next()) {
                count = rs.getInt("total");
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return count;
    }
public BaiVietAnh getBaiVietById(int idbv) {
    BaiVietAnh bv = null;
    String sql = "SELECT * FROM bai_anh WHERE idbv = ?";

    try (Connection conn = new ConnectDatabase().getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setInt(1, idbv);

        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                bv = new BaiVietAnh(
                    rs.getInt("idbv"),
                    rs.getInt("idgv"),
                    rs.getString("ten_bai_viet"),
                    rs.getString("noi_dung"),
                    rs.getString("ngay_dang"),
                    rs.getString("ngay_chinh_sua"),
                    rs.getInt("id_danhmuc"),
                    rs.getString("anh")
                );
            }
        }

    } catch (SQLException e) {
        e.printStackTrace();
    }
    return bv;
}

}
