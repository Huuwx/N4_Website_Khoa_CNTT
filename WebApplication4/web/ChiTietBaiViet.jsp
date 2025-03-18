<%@page import="model.BaiVietAnh"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    BaiVietAnh baiViet = (BaiVietAnh) request.getAttribute("baiViet");
    if (baiViet == null) {
    }else{}
%>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Chi Tiết Bài Viết</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f8f8;
            margin: 0;
            padding: 0;
        }
        /* Nội dung bài viết (bên trái) */
        .post-content img {
            max-width: 100%;
            height: auto;
            margin-bottom: 15px;
            border-radius: 5px;
        }
        .post-content p {
            text-align: justify;
            line-height: 1.6;
        }
        /* Sidebar (bên phải) */
        .sidebar .widget {
            background: #fff;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .sidebar .widget-title {
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
            color: #8b0000;
        }
        /* Khối Khoa CNTT màu xanh đậm */
        .info-box {
            background: #2a2a6d; /* Màu xanh đậm */
            color: #fff;
            padding: 15px;
            border-radius: 5px;
        }
        .info-box h5 {
            color: #fff;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .info-box p {
            margin-bottom: 5px;
        }
        .info-box .btn-contact {
            background: #d50000;
            color: #fff;
            border: none;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <%@ include file="templates/header.jsp" %>

    <div class="container my-4">
        <div class="row">
            <div class="col-md-8">
                <h2><%= baiViet.getTenBaiViet() %></h2>
                 <p class="text-muted">
                     <p class="text-muted">
                    Ngày đăng: 
                    <%
                        String ngayDang = baiViet.getNgayDang().substring(0,10); // "2024-03-13"
                        String[] parts = ngayDang.split("-"); // ["2024", "03", "13"]
                        String ngayDaoNguoc = parts[2] + "-" + parts[1] + "-" + parts[0]; // "13-03-2024"
                    %>
                    <%= ngayDaoNguoc %>
                </p>
                <div class="post-content">
                    <img src="<%= baiViet.getAnh() %>" alt="Ảnh bài viết">
                    <p><%= baiViet.getNoiDung()%></p>
                </div>
            </div>

            <!-- Cột phải: Sidebar -->
            <div class="col-md-4">
                <div class="sidebar">
                    <!-- Widget 1: Tin tức khác -->
                    <div class="widget">
                        <div class="widget-title">Tin tức khác</div>
                        <ul>
                            <li><a href="#">Thông báo tuyển sinh</a></li>
                            <li><a href="#">Hội nghị khoa học</a></li>
                            <li><a href="#">Cựu sinh viên tiêu biểu</a></li>
                        </ul>
                    </div>
                    <!-- Widget 2: Khoa Công nghệ thông tin -->
                    <div class="widget info-box">
                       <h5 style="color: black;">Khoa Công nghệ thông tin</h5>
                       <p style="color : black;">Nhà C1, Đại học Thủy Lợi</p>
                        <p style="color : black;" >175 Tây Sơn, Đống Đa, Hà Nội</p>
                        <p style="color : black;">(+84)-024 3 5632211</p>
                        <p style="color : black;" >Thứ Hai – Thứ Sáu: 8:00 A.M. – 5:00 P.M.</p>
                        <p style="color : black;">Mạng xã hội:  
                            <a href="#" style="color:#fff;">FB</a> | 
                            <a href="#" style="color:#fff;">YT</a> | 
                            <a href="#" style="color:#fff;">Tw</a>
                        </p>
                        <button class="btn btn-contact">Liên Hệ</button>
                    </div>
                </div>
            </div>
        </div> <!-- row -->
    </div> <!-- container -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
