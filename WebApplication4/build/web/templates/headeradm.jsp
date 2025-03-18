<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang Quản Trị</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        .navbar {
            background-color: #5A7D85;
            padding: 10px;
            display: flex;
            align-items: center;
            width: 100%;
            height: 80px;
            position: relative;
        }
        .menu-icon {
            cursor: pointer;
            font-size: 24px;
            background-color: #5A7D85;
            padding: 10px;
            border: none;
            color: white;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
        }
        .menu-container {
            position: absolute;
            top: 80px;
            left: 10px;
            width: 250px;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: none;
            flex-direction: column;
            padding: 10px;
            z-index: 1000;
        }
        .menu-container a {
            display: block;
            padding: 8px;
            font-weight: bold;
            color: black;
            text-decoration: none;
        }
        .menu-container a:hover, .menu-container a.active {
            background-color: #5A7D85;
            color: white;
        }
        .info-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: white;
            padding: 10px;
            border-bottom: 2px solid #ddd;
        }
        .info-section img {
            height: 80px;
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
    <nav class="navbar navbar-expand-lg">
        <button class="menu-icon" onclick="toggleMenu()">☰</button>
        <div class="menu-container" id="menu">
            <a href="#" onclick="setActive(this)">QUẢN LÝ DANH MỤC</a>
            <a href="#" onclick="setActive(this)">QUẢN LÝ YÊU CẦU LIÊN HỆ</a>
            <a href="#" onclick="setActive(this)">QUẢN LÝ BÀI VIẾT</a>
            <a href="#" onclick="setActive(this)">QUẢN LÝ TÀI KHOẢN</a>
            <a href="#" onclick="setActive(this)">QUẢN LÝ ẢNH ĐỘNG</a>
        </div>
    </nav>
    
</div>

    <div class="header-container">
        <div class="header">
            <img src="img/anh.png" alt="Logo">
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

    <script>
        function toggleMenu() {
            var menu = document.getElementById("menu");
            menu.style.display = menu.style.display === "flex" ? "none" : "flex";
        }

        function setActive(element) {
            var items = document.querySelectorAll(".menu-container a");
            items.forEach(item => item.classList.remove("active"));
            element.classList.add("active");
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
