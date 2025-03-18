<%-- 
    Document   : suaTaiKhoan.jsp
    Created on : Mar 9, 2025, 11:35:22 PM
    Author     : duc
--%>

<%@page import="model.TaiKhoan"%>
<%@page import="model.TaiKhoan"%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<% 
    TaiKhoan tk = (TaiKhoan) request.getAttribute("taikhoan"); 
    if (tk == null) { 
        System.out.println("null");
    } 
%>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sửa Tài Khoản</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .form-container {
            width: 400px;
            margin: 50px auto;
            padding: 20px;
            background: #fff;
            border: 2px solid black;
            border-radius: 0; /* Không bo góc */
        }
        .form-title {
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .btn-submit, .btn-cancel {
            font-size: 14px;
            padding: 5px 15px;
            border-radius: 0; /* Không bo góc */
        }
        .btn-submit {
            background-color: #b30000;
            color: white;
        }
        .btn-cancel {
            background-color: #ccc;
        }
        .btn-submit:hover {
            background-color: #800000;
        }
        .form-control, .form-select {
            border-radius: 0; /* Không bo góc */
        }
        .gender-group {
            display: flex;
            align-items: center;
            gap: 10px; /* Khoảng cách giữa các lựa chọn */
        }
        .button-group {
            display: flex;
            justify-content: flex-end; /* Căn phải */
            gap: 10px;
        }
        /* Ẩn mặc định radio button */
        .gender-group input[type="radio"] {
            display: none;
        }
        /* Tạo radio tùy chỉnh */
        .gender-group label {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-weight: bold;
        }
        /* Tạo vòng tròn cho radio */
        .gender-group label::before {
            content: "";
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 2px solid #aaa;
            display: inline-block;
            margin-right: 5px;
            transition: all 0.3s;
        }
        /* Khi được chọn, vòng tròn có màu đỏ */
        .gender-group input[type="radio"]:checked + label::before {
            background-color: red;
            border-color: red;
        }
    </style>
</head>
<body>

<div class="form-container">
    <h4 class="form-title">SỬA TÀI KHOẢN</h4>
    
    <form action="Edit" method="post">
        <input type="hidden" name="id" value="<%= (tk != null) ? tk.getIdgv() : "" %>">

        <div class="mb-3">
            <label class="form-label">TÀI KHOẢN</label>
            <input type="text" class="form-control" name="username" value="<%= (tk != null) ? tk.getTaiKhoan() : "" %>" required>
        </div>

        <div class="mb-3">
            <label class="form-label">MẬT KHẨU</label>
            <input type="password" class="form-control" name="password" value="<%= (tk != null) ? tk.getMatKhau() : "" %>" required>
        </div>

        <div class="mb-3">
            <label class="form-label">HỌ TÊN</label>
            <input type="text" class="form-control" name="fullname" value="<%= (tk != null) ? tk.getHoTen() : "" %>" required>
        </div>

        <div class="mb-3">
            <label class="form-label">GIỚI TÍNH:</label>
            <input type="radio" id="male" name="gender" value="Nam" <%= (tk != null && "Nam".equals(tk.getGioiTinh())) ? "checked" : "" %>>
            <label for="male">Nam</label>
            <input type="radio" id="female" name="gender" value="Nữ" <%= (tk != null && "Nữ".equals(tk.getGioiTinh())) ? "checked" : "" %>>
            <label for="female">Nữ</label>
        </div>

        <div class="mb-3">
            <label class="form-label">SĐT</label>
            <input type="text" class="form-control" name="phone" value="<%= (tk != null) ? tk.getSdt() : "" %>" required>
        </div>

        <div class="mb-3">
            <label class="form-label">EMAIL</label>
            <input type="email" class="form-control" name="email" value="<%= (tk != null) ? tk.getEmail() : "" %>" required>
        </div>

        <div class="mb-3">
            <label class="form-label">TRẠNG THÁI TÀI KHOẢN</label>
            <select class="form-control" name="status">
                <option value="Hoat dong" <%= (tk != null && "Hoat dong".equals(tk.getTrangThai())) ? "selected" : "" %>>Hoạt động</option>
                <option value="Khong hoat dong" <%= (tk != null && "Khong hoat dong".equals(tk.getTrangThai())) ? "selected" : "" %>>Không hoạt động</option>
                <option value="Vo hieu hoa" <%= (tk != null && "Vo hieu hoa".equals(tk.getTrangThai())) ? "selected" : "" %>>Vô hiệu hóa</option>
            </select>
        </div>
            <% String error = (String) session.getAttribute("error"); %>
                <% if (error != null) { %>
                <div class="alert alert-danger"><%= error %></div>
                 <% session.removeAttribute("error"); %>  <!-- Xóa thông báo lỗi khỏi session -->
            <% } %>

        <div class="button-group">
            <button type="submit" class="btn btn-danger">XÁC NHẬN</button>
            <a href="HomeAdmin" class="btn btn-secondary">HỦY BỎ</a>
        </div>
    </form>
</div>
</body>
</html>
