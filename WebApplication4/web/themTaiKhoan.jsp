<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thêm Tài Khoản</title>
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
            border: none;
        }
        .btn-cancel {
            background-color: #ccc;
            border: none;
        }
        .btn-submit:hover {
            background-color: #800000;
        }
        .form-control {
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
    <h4 class="form-title">THÊM TÀI KHOẢN</h4>
    
    <form action="Signup" method="post">
        <div class="mb-3">
            <label class="form-label">TÀI KHOẢN</label>
            <input type="text" class="form-control" name="username" required>
        </div>
        
        <div class="mb-3">
            <label class="form-label">MẬT KHẨU</label>
            <input type="password" class="form-control" name="password" required>
        </div>

        <div class="mb-3">
            <label class="form-label">HỌ TÊN</label>
            <input type="text" class="form-control" name="fullname" required>
        </div>

        <div class="mb-3 gender-group">
            <label class="form-label">GIỚI TÍNH:</label>
            <input type="radio" id="male" name="gender" value="Nam" checked>
            <label for="male">Nam</label>

            <input type="radio" id="female" name="gender" value="Nữ">
            <label for="female">Nữ</label>
        </div>

        <div class="mb-3">
            <label class="form-label">SĐT</label>
            <input type="text" class="form-control" name="phone" required>
        </div>

        <div class="mb-3">
            <label class="form-label">EMAIL</label>
            <input type="email" class="form-control" name="email" required>
        </div>
                   <% String error = (String) request.getAttribute("error"); %>
                <% if (error != null) { %>
                    <div class="alert alert-danger"><%= error %></div>
                <% } %>

        <div class="button-group">
            <button type="submit" class="btn btn-submit">XÁC NHẬN</button>
            <button type="reset" class="btn btn-cancel">HỦY BỎ</button>
        </div>
    </form>
</div>

</body>
</html>
