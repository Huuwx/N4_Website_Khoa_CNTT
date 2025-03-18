/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author duc
 */
public class ConnectDatabase {
    private static final String URL = "jdbc:sqlserver://LAPTOP-C20LJJ1M:1433;databaseName=Test;encrypt=true;trustServerCertificate=true";
    private static final String USER = "sa";
    private static final String PASSWORD = "manh0906";
    
    public Connection getConnection() {
        Connection con = null;
        try {
            // Load driver
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            // Kết nối CSDL
            con = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("✅ Kết nối database thành công!");
        } catch (ClassNotFoundException e) {
            System.out.println("❌ Không tìm thấy driver SQL Server!");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("❌ Kết nối database thất bại!");
            e.printStackTrace();
        }
        return con; // Trả về connection (không trả về null)
    }
}
