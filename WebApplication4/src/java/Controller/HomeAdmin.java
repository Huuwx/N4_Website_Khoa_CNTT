package Controller;

import DAO.UserDAO;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.TaiKhoan;

@WebServlet(name="HomeAdmin", urlPatterns={"/HomeAdmin"})
public class HomeAdmin extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
    String username = request.getParameter("username");

    List<TaiKhoan> list = new ArrayList<>();
    String idDeleteParam = request.getParameter("iddelete");
    String idVoHieuHoaParam = request.getParameter("idvohieuhoa");
    if (idDeleteParam != null && !idDeleteParam.isEmpty()) {
        try {
            int idDelete = Integer.parseInt(idDeleteParam);
            UserDAO userDAO = new UserDAO();
            boolean success = userDAO.disableTaiKhoan(idDelete); // Viết phương thức deleteUser() trong UserDAO

            if (success) {
                request.getSession().setAttribute("message", "Xóa tài khoản thành công!");
            } else {
                request.getSession().setAttribute("error", "Xóa tài khoản thất bại!");
            }
        } catch (NumberFormatException e) {
            request.setAttribute("error", "ID không hợp lệ!");
        }
    }
     if (idVoHieuHoaParam != null && !idVoHieuHoaParam.isEmpty()) {
        try {
            int idvohieuhoa = Integer.parseInt(idVoHieuHoaParam);
            UserDAO userDAO = new UserDAO();
            boolean success = userDAO.VoHieuHoaTaiKhoan(idvohieuhoa); // Viết phương thức deleteUser() trong UserDAO

            if (success) {
                request.getSession().setAttribute("message", "Vô hiệu hóa tài khoản thành công!");
            } else {
                request.getSession().setAttribute("error", "Vô hiệu hóa tài khoản không thành công!");
            }
        } catch (NumberFormatException e) {
            request.setAttribute("error", "ID không hợp lệ!");
        }
    }
    int page = 1;
    int pageSize = 5;

    String pageParam = request.getParameter("page");
    if (pageParam != null) {
        try {
            page = Integer.parseInt(pageParam);
        } catch (NumberFormatException e) {
            page = 1;
        }
    }

    UserDAO userDAO = new UserDAO();
    int totalRecords = userDAO.getTotalTaiKhoan();
    int totalPages = (int) Math.ceil((double) totalRecords / pageSize);
        List<TaiKhoan> list1 = new ArrayList<>();
    UserDAO user = new UserDAO();
        // Kiểm tra nếu có tên người dùng tìm kiếm
        if (username != null && !username.trim().isEmpty()) {
            list1 = user.searchAccountsByUsername(username); // Cập nhật phương thức tìm kiếm của bạn
        } else {
            list1 = user.getAllTaiKhoan(page, 5); // Lấy tất cả tài khoản nếu không có tên người dùng
        }
        request.setAttribute("taiKhoanList1", list1);
        request.setAttribute("hasData", !list1.isEmpty());
    list = userDAO.getAllTaiKhoan(page, pageSize);
    request.setAttribute("taiKhoanList", list);
    request.setAttribute("currentPage", page);
    request.setAttribute("totalPages", totalPages);

    request.getRequestDispatcher("trangChuAdmin.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
