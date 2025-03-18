<%@page import="model.TaiKhoan"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    TaiKhoan currUser = (TaiKhoan) session.getAttribute("giaovien");
%>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Nhập - Khoa CNTT</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            margin: 0;
            background-color: #ffffff;
        }
        .navbar-container {
            background-color: #4A6F7A;
            padding: 10px 20px;
            display: flex;
            justify-content: flex-end;
        }
        .navbar {
            display: flex;
            align-items: center;
        }
        .navbar .user-menu a {
            color: black;
            text-decoration: none;
            margin: 0 10px;
            font-weight: bold;
            transition: background-color 0.3s ease, color 0.3s ease;
            padding: 5px 10px;
            border-radius: 5px;
        }
        .navbar .user-menu a:hover,
        .navbar .user-menu a:focus {
            background-color: red;
            color: white;
        }
        .navbar .user-menu .contact {
            background-color: transparent;
            color: black;
        }
        .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            background-color: white;
        }
        .header {
            display: flex;
            align-items: center;
        }
        .header img {
            height: 60px;
            margin-right: 10px;
        }
        .header .logo-text {
            font-size: 12px;
            font-weight: normal;
            line-height: 1.2;
            color: #4A6F7A;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        .menu {
            display: flex;
            justify-content: center;
            font-weight: bold;
            position: relative;
            z-index: 1000; /* Đặt giá trị cao hơn các phần khác */
        }
        .menu a {
            color: black;
            text-decoration: none;
            margin: 0 15px;
            transition: color 0.3s ease, background-color 0.3s ease;
            padding: 5px 10px;
            border-radius: 5px;
            position: relative;
        }
        .menu a:hover,
        .menu a:focus {
            color: red;
        }
        .menu a::after {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            background-color: red;
            position: absolute;
            bottom: 0;
            left: 0;
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        .menu a:hover::after,
        .menu a:focus::after {
            transform: scaleX(1);
        }
        .submenu {
            display: none;
            position: absolute;
            top: 30px;
            left: 0;
            background-color: white;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .submenu a {
            display: block;
            padding: 5px 0;
        }
        .menu #tuyensinh:hover + .submenu,
        .submenu:hover {
            display: block;
        }
    </style>
</head>
<body>
    <div class="navbar-container">
    <nav class="navbar">
        <div class="user-menu">
            <% if (currUser != null) { %>
                <a href="#"><%= currUser.getTaiKhoan() %></a>
            <% } else { %>
             <a href="Login" class="btn btn-custom">
                 <i class="bi bi-person"></i> Đăng nhập
             </a>
            <% } %>
            <a href="Logout">Đăng Xuất</a>
            <a href="LienHe" class="contact">Liên Hệ</a>
        </div>
    </nav>
</div>

</div>

    <div class="header-container">
        <div class="header">
        <a href="home">
          <img src="img/logo.png" alt="Logo" />
        </a>

            <div class="logo-text">
                KHOA CÔNG NGHỆ THÔNG TIN<br>
                FACULTY OF COMPUTER SCIENCE AND ENGINEERING THUYLOI UNIVERSITY
            </div>
        </div>
        <nav class="menu">
            <a href="#" id="tuyensinh">Tuyển Sinh</a>
            <div class="submenu">
                <a href="#">Chất Lượng Cao</a>
                <a href="#">Đại Học</a>
                <a href="#">Thạc Sĩ</a>
                <a href="#">Tiến Sĩ</a>
            </div>
            <a href="#">Giới Thiệu</a>
            <a href="#">Doanh Nghiệp</a>
            <a href="#">Đào Tạo</a>
            <a href="#">Khoa Công Nghệ</a>
            <a href="#">Hợp Tác Đối Ngoại</a>
        </nav>
    </div>
    <div class="content">
        <!-- Nội dung trang -->
    </div>
</body>
</html>
