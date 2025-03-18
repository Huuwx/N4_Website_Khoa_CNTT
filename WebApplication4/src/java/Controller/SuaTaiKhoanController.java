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
import model.TaiKhoan;

/**
 *
 * @author duc
 */
@WebServlet(name="SuaTaiKhoanController", urlPatterns={"/Edit"})
public class SuaTaiKhoanController extends HttpServlet {

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
            out.println("<title>Servlet SuaTaiKhoanController</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SuaTaiKhoanController at " + request.getContextPath () + "</h1>");
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
    String id = request.getParameter("id");
    if (id != null) {
    int idnew = Integer.parseInt(id);
    UserDAO user = new UserDAO();
    TaiKhoan tk = user.getTaiKhoanById(idnew);  // Lấy tài khoản từ DB

    if (tk != null) {
        request.setAttribute("taikhoan", tk);  // Đẩy tài khoản sang JSP
    } else {
        request.setAttribute("error", "Không tìm thấy tài khoản!");
    }
    }
    request.getRequestDispatcher("suaTaiKhoan.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
protected void doPost(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {
    request.setCharacterEncoding("UTF-8"); // Hỗ trợ tiếng Việt

    try {
        // 🟢 Lấy dữ liệu từ form và kiểm tra đầu vào
        String idParam = request.getParameter("id");
        int id = (idParam != null && !idParam.trim().isEmpty()) ? Integer.parseInt(idParam) : -1;

        if (id == -1) {
            request.setAttribute("error", "ID không hợp lệ!");
            request.getRequestDispatcher("suaTaiKhoan.jsp").forward(request, response);
            return;
        }

        String username = request.getParameter("username");
        String password = request.getParameter("password"); // Nếu cần mã hóa, xử lý trước khi lưu
        String fullname = request.getParameter("fullname");
        String gender = request.getParameter("gender");
        String phone = request.getParameter("phone");
        String email = request.getParameter("email");
        String status = request.getParameter("status");

        // 🟢 Ghi log để kiểm tra giá trị đầu vào
        System.out.println("ID nhận được: " + id);
        System.out.println("Username: " + username);
        System.out.println("Fullname: " + fullname);
        System.out.println("Gender: " + gender);
        System.out.println("Phone: " + phone);
        System.out.println("Email: " + email);
        System.out.println("Status: " + status);
        TaiKhoan tk = new TaiKhoan( username,id, password, fullname, gender, phone, email, status, "", "", "");
        UserDAO userDAO = new UserDAO();
        boolean success = userDAO.updateUser(tk);
        System.out.println("Kết quả updateUser: " + success);
        System.out.println("Cập nhật thành công? " + success);
        
        if (success) {
            request.getSession().setAttribute("message", "Update khoản thành công!");
            response.sendRedirect(request.getContextPath() + "/HomeAdmin");
        } else {
            request.setAttribute("error", "Cập nhật thất bại!");
            request.setAttribute("taikhoan", tk);
            request.getRequestDispatcher("suaTaiKhoan.jsp").forward(request, response);
        }
    } catch (NumberFormatException e) {
        System.err.println("Lỗi chuyển đổi ID: " + e.getMessage());
        request.setAttribute("error", "ID không hợp lệ!");
        request.getRequestDispatcher("suaTaiKhoan.jsp").forward(request, response);
    } catch (Exception e) {
            request.getSession().setAttribute("error", "Lỗi: " + e.getMessage());
            response.sendRedirect(request.getContextPath() + "/Edit?id=" + request.getParameter("id"));
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
