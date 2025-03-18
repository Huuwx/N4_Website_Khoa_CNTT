<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Nhập - Khoa CNTT</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
            margin: 0;
            background-color: #ffffff;
        }
        .login-container {
            display: flex;
            width: 80vw;
            height: 80vh;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        }
        .login-image {
            width: 40%;
            background: url('img/anhtruongtlu.png') no-repeat center center;
            background-size: cover;
            border-radius: 15px 0 0 15px;
            overflow: hidden;
        }
        .login-form {
            width: 60%;
            padding: 50px;
            text-align: center;
            background: white;
            border-radius: 0 15px 15px 0;
        }
        .login-form img {
            width: 80px;
            margin-bottom: 10px;
            border-radius: 50%;
        }
        .login-form h2 {
            margin-bottom: 20px;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 16px;
        }
        .login-form h2 span:first-child {
            color: white;
            display: block;
            text-shadow: -1px -1px 0 #2c5d63, 1px -1px 0 #2c5d63, -1px 1px 0 #2c5d63, 1px 1px 0 #2c5d63;
        }
        .login-form h2 span:last-child {
            color: #2c5d63;
            display: block;
        }
        .form-control {
            background-color: #E5E5E5;
            border: none;
            padding: 12px;
            text-transform: uppercase;
            font-weight: bold;
        }
        .form-control:focus {
            border: 2px solid #2c5d63;
            box-shadow: none;
        }
        .error-message {
            color: #a12222;
            font-weight: bold;
            margin-top: 10px;
        }
        .btn-login {
            background-color: #a12222;
            border: none;
            padding: 12px;
            border-radius: 5px;
            color: white;
            width: 100%;
            font-weight: bold;
            margin-top: 15px;
        }
        .btn-login:hover {
            background-color: #871818;
            transition: 0.3s;
        }
        .support-text {
            font-size: 14px;
            margin-top: 10px;
        }
        .support-text a {
            color: #a12222;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
<div class="login-container">
    <div class="login-image"></div>
    <div class="login-form">
        <img src="img/logo.png" alt="Logo">
        <h2>
            <span>KHOA CÔNG NGHỆ THÔNG TIN</span>
            <span>FACULTY OF COMPUTER SCIENCE AND ENGINEERING THUYLOI UNIVERSITY</span>
        </h2>
        <form action="Login" method="post">
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="TÀI KHOẢN" name="username" required>
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" placeholder="MẬT KHẨU" name="password" required>
            </div>
            <% String errorMessage = (String) request.getAttribute("errorMessage"); %>
            <% if (errorMessage != null) { %>
                <p class="error-message"><%= errorMessage %></p>
            <% } %>
            <button type="submit" class="btn-login">ĐĂNG NHẬP</button>
            <p class="support-text">NẾU BẠN CẦN HỖ TRỢ <a href="#">LIÊN HỆ</a></p>
        </form>
    </div>
</div>
</body>
</html>
