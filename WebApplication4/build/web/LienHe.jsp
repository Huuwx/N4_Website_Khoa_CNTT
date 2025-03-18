<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Liên hệ</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        /* Đặt font và reset mặc định */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        /* Banner trên cùng */
        .banner {
            background-color: #4e9cb2; /* Màu banner bạn tùy chỉnh */
            height: 120px;
            position: relative;
        }
        /* Logo trường hoặc tên trường */
        .logo {
            position: absolute;
            top: 10px;
            left: 20px;
            max-width: 200px;
        }
        /* Thanh menu đơn giản (nếu cần) */
        .navbar-custom {
            background-color: #4e9cb2;
            display: flex;
            justify-content: center;
            padding: 10px 0;
        }
        .navbar-custom a {
            color: #fff;
            margin: 0 15px;
            text-decoration: none;
            font-weight: bold;
        }
        .navbar-custom a:hover {
            text-decoration: underline;
        }
        /* Phần tiêu đề chính: LIÊN HỆ VỚI CHÚNG TÔI */
        .contact-heading {
            background-color: #d1d9df; /* Màu nền của khối tiêu đề */
            padding: 40px 0;
            text-align: center;
        }
        .contact-heading h1 {
            font-size: 2rem;
            font-weight: bold;
            color: #333;
        }
        /* Thông tin trường ở dưới tiêu đề */
        .contact-info {
            text-align: center;
            margin: 20px 0;
            font-size: 1.2rem;
            color: #555;
        }
        /* Ba cột liên hệ: Phone - Email - Location */
        .contact-details {
            padding: 30px 0;
        }
        .contact-details .col-md-4 {
            text-align: center;
            margin-bottom: 20px;
        }
        .contact-details h3 {
            font-size: 1.1rem;
            font-weight: bold;
            margin-top: 10px;
            color: #333;
        }
        .contact-details p {
            color: #555;
        }
        /* Footer nếu cần */
        .footer {
            background-color: #4e9cb2;
            color: #fff;
            text-align: center;
            padding: 15px 0;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <!-- Banner trên cùng -->
    <%@ include file="templates/header.jsp" %>
    <!-- Khối tiêu đề chính -->
    <div class="contact-heading">
        <h1>LIÊN HỆ VỚI CHÚNG TÔI</h1>
    </div>

    <!-- Thông tin trường -->
    <div class="contact-info">
        <p>NHÀ C1 - TRƯỜNG ĐẠI HỌC THỦY LỢI</p>
        <p>175 TÂY SƠN, ĐỐNG ĐA, HÀ NỘI</p>
    </div>

    <!-- Ba cột liên hệ: Phone - Email - Location -->
    <div class="container contact-details">
        <div class="row">
            <div class="col-md-4">
                <img src="img/phone.png" alt="Phone" width="60">
                <h3>PHONE</h3>
                <p>(024) 38522201</p>
            </div>
            <div class="col-md-4">
                <img src="img/email.png" alt="Email" width="60">
                <h3>EMAIL</h3>
                <p>contact@tlu.edu.vn</p>
            </div>
            <div class="col-md-4">
                <img src="img/location.png" alt="Location" width="60">
                <h3>LOCATION</h3>
                <p>175 Tây Sơn, Đống Đa, Hà Nội</p>
            </div>
        </div>
    </div>

    <!-- Footer (nếu cần) -->
    <div class="footer">
        <p>Bản quyền © 2025 Trường Đại học Thủy Lợi</p>
    </div>

    <!-- Bootstrap Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
