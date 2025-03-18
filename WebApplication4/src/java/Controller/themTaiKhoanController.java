package Controller;

import DAO.UserDAO;
import java.io.IOException;
import java.util.regex.Pattern;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.TaiKhoan;

@WebServlet(name = "themTaiKhoanController", urlPatterns = {"/Signup"})
public class themTaiKhoanController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("themTaiKhoan.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Lấy dữ liệu từ form đăng ký
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String fullname = request.getParameter("fullname");
        String gender = request.getParameter("gender");
        String phone = request.getParameter("phone");
        String email = request.getParameter("email");

        // Kiểm tra định dạng email (chỉ chấp nhận Gmail)
        String emailRegex = "^[a-zA-Z0-9._%+-]+@gmail\\.com$";
        if (!Pattern.matches(emailRegex, email)) {
            request.setAttribute("error", "Vui lòng nhập địa chỉ Gmail hợp lệ (ví dụ: example@gmail.com)!");
            request.getRequestDispatcher("themTaiKhoan.jsp").forward(request, response);
            return;
        }

        // Kiểm tra định dạng mật khẩu (ít nhất 8 ký tự, có số và ký tự đặc biệt)
        String passwordRegex = "^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$";
        if (!Pattern.matches(passwordRegex, password)) {
            request.setAttribute("error", "Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất 1 số và 1 ký tự đặc biệt!");
            request.getRequestDispatcher("themTaiKhoan.jsp").forward(request, response);
            return;
        }


        // Tạo đối tượng tài khoản với trạng thái mặc định "Hoạt động" và vai trò "Giảng viên"
        TaiKhoan tk = new TaiKhoan(username, 0, password, fullname, gender, phone, email, "Hoạt động", "Giảng viên", "", "");

        // Gọi DAO để thêm tài khoản vào CSDL
        UserDAO dao = new UserDAO();
        try {
            if (dao.registerUser(tk)) {
                request.getSession().setAttribute("message", "Tạo tài khoản thành công!");
                response.sendRedirect(request.getContextPath() + "/HomeAdmin");
            } else {
                request.setAttribute("error", "Đăng ký thất bại, vui lòng thử lại!");
                request.getRequestDispatcher("themTaiKhoan.jsp").forward(request, response);
            }
        } catch (Exception e) {
            request.setAttribute("error", "Lỗi: " + e.getMessage()); // Hiển thị lỗi SQL hoặc lỗi khác
            request.getRequestDispatcher("themTaiKhoan.jsp").forward(request, response);
        }
    }

    @Override
    public String getServletInfo() {
        return "Servlet xử lý đăng ký tài khoản";
    }
}
