/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */

package Controller;

import DAO.UserDAO;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import model.TaiKhoan;

/**
 *
 * @author duc
 */
@WebServlet(name="Login", urlPatterns={"/Login"})
public class Login extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Login</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Login at " + request.getContextPath () + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
         request.getRequestDispatcher("DangNhap.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // Kiểm tra nếu tài khoản hoặc mật khẩu bị bỏ trống
        if (username == null || username.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            request.setAttribute("errorMessage", "Tài khoản và mật khẩu không được để trống!");
            request.getRequestDispatcher("DangNhap.jsp").forward(request, response);
            return; // Dừng lại để tránh thực thi tiếp
        }

        TaiKhoan taiKhoan = new TaiKhoan(username,0, password, "", "", "","","","","", "");
        UserDAO dao = new UserDAO();

if (dao.checkUser(taiKhoan)) {
    String role = dao.getRole(taiKhoan);
    String trangThai = dao.getTrangThai(taiKhoan);

    if (trangThai != null && !trangThai.equals("Vo hieu hoa")) {
        if (role != null) { 
            HttpSession session = request.getSession(); 

            if (role.equals("admin")) {
                session.setAttribute("Admin", taiKhoan);
                response.sendRedirect(request.getContextPath() + "/HomeAdmin");
            } else {
                session.setAttribute("giaovien", taiKhoan);
                response.sendRedirect(request.getContextPath() + "/home");
            }
        } else {
            request.setAttribute("errorMessage", "Lỗi hệ thống! Không thể lấy thông tin vai trò.");
            request.getRequestDispatcher("DangNhap.jsp").forward(request, response);
        }
    } else {
        request.setAttribute("errorMessage", "Tài khoản của bạn bị khóa.vui lòng liên hệ bộ phận hỗ trợ.");
        request.getRequestDispatcher("DangNhap.jsp").forward(request, response);
    }
} else {
    request.setAttribute("errorMessage", "Tài khoản hoặc mật khẩu không đúng!");
    request.getRequestDispatcher("DangNhap.jsp").forward(request, response);
}
    }


    /**
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
