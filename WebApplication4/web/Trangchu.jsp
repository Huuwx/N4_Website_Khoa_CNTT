<%@page import="model.BaiVietAnh"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    List<BaiVietAnh> danhSachBaiViet = (List<BaiVietAnh>) request.getAttribute("baiVietList");
    Integer currentPage = (Integer) request.getAttribute("currentPage");
    Integer totalPages = (Integer) request.getAttribute("totalPages");
    if (currentPage == null) {
        currentPage = 0;
    }
    if (totalPages == null) {
        totalPages = 1;
    }
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Trang Chủ</title>
        <!-- Bootstrap CSS -->
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f8f8f8;
            }

            /* Banner */
            .banner-container {
                position: relative;
                width: 100%;
            }
            .custom-banner {
               height: 400px; /* Tăng chiều cao */
              object-fit: cover;
             }

            .banner-img {
                width: 100%;
                height: 250px;
                object-fit: cover;
            }

            /* Bảng tiêu đề */
            .table-container {
                width: 75%;  /* Giảm chiều rộng */
                max-width: 900px; /* Giới hạn tối đa */
                background-color: #fff;
                text-align: center;
                border-collapse: collapse;
                margin: -40px auto 10px auto; /* Kéo lên chồng vào banner */
                position: relative;
                z-index: 10;
                border-radius: 5px;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            }

            .table-container th {
                padding: 12px;
                font-size: 16px;
                font-weight: bold;
                text-transform: uppercase;
                border-right: 2px solid #ccc;
                background-color: #fff;
            }

            .table-container th:last-child {
                border-right: none;
            }

            /* Nội dung mô tả */
            .description {
                width: 75%;
                max-width: 900px;
                padding: 20px;
                font-size: 14px;
                text-align: justify;
                margin: auto;
                background-color: white;
                border-radius: 5px;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
                line-height: 1.6;
            }

            /* Tiêu đề tin tức */
           .section-title {
                font-weight: bold;
                color: #003366;
                text-transform: uppercase;
                display: flex;
                align-items: center;
                margin-left: 20px; /* Đẩy cả tiêu đề vào 20px */
            }

            .section-title {
                font-weight: bold;
                color: #003366;
                text-transform: uppercase;
                display: flex;
                align-items: center;
                margin-left: 20px; /* Đẩy cả tiêu đề vào 20px */
            }

            .section-title::before {
                content: "";
                width: 5px; /* Độ dày của vạch đỏ */
                height: 20px; /* Chiều cao của vạch đỏ */
                background-color: #8b0000;
                margin-right: 10px; /* Khoảng cách giữa vạch đỏ và chữ */
            }

            .section-title::after {
                content: "";
                flex-grow: 1;
                height: 2px;
                background-color: #8b0000;
                margin-left: 10px; /* Khoảng cách giữa chữ và đường kẻ dài */
            }

            /* Nút "XEM TẤT CẢ" */
            .view-all {
                text-align: left;
                font-size: 12px; /* Giảm kích thước chữ */
                color: red;
                font-weight: bold;
                margin-left: 30px; /* Căn trái, đẩy vào thêm 10px */
                margin-top: 5px;
            }
.featured-student {
    display: flex;
    align-items: center;
    justify-content: center; /* Căn giữa nội dung */
    margin: 20px auto;
    width: 100%; /* Chiếm hết chiều ngang */
    background-color: #e0e6ed;
    padding: 40px; /* Tăng khoảng cách */
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.featured-student img {
    width: 450px; /* Tăng kích thước ảnh */
    height: auto;
    border-radius: 5px;
    margin-right: 20px;
}

.featured-student div {
    flex-grow: 1;
    text-align: center; /* Căn giữa nội dung chữ */
}

.featured-student h3 {
    color: #003366;
    font-weight: bold;
    text-align: center;
    font-size: 28px; /* Tăng kích thước chữ */
}

.featured-student p {
    font-size: 18px; /* Tăng kích thước chữ mô tả */
    text-align: justify;
    max-width: 800px; /* Giữ văn bản không quá dài */
    margin: auto;
}


            /* Đối tác */
            .partners {
                width: 75%;
                max-width: 900px;
                margin: auto;
                padding: 20px 0;
                border-top: 2px solid #8b0000;
                font-weight: bold;
            }
             .event-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 20px;
        }
        .event {
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
        }
        .event img {
            width: 100%;
            height: auto;
            border-radius: 5px;
        }
        .pagination-container {
    display: flex;
    justify-content: center;  /* Căn giữa theo chiều ngang */
    align-items: center;       /* Căn giữa theo chiều dọc */
    gap: 8px;                  /* Khoảng cách giữa các nút */
    margin-top: 20px;          /* Tạo khoảng cách với nội dung trên */
}

.pagination-container .btn {
    min-width: 40px;           /* Đảm bảo nút có kích thước đều */
    text-align: center;        /* Căn giữa chữ */
    font-weight: bold;         /* Chữ đậm hơn */
    border-radius: 8px;        /* Bo góc */
}

.pagination-container .btn-primary {
    background-color: #007bff; /* Màu xanh nổi bật */
    border-color: #007bff;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
}

.pagination-container .btn-outline-secondary {
    border-radius: 8px; 
}

        </style>
    </head>
    <body>
        <%@ include file="templates/header.jsp" %>

        <!-- Banner -->
        
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
              </div>

              <div class="carousel-inner">
                  <div class="carousel-item active">
                      <img src="img/slide-7.jpg" class="d-block w-100 custom-banner" alt="Anh 1">
                  </div>
                  <div class="carousel-item">
                      <img src="img/slider-5.jpg" class="d-block w-100 custom-banner" alt="Anh 2">
                  </div>
                  <div class="carousel-item">
                      <img src="img/cntt_new.jpg" class="d-block w-100 custom-banner" alt="Anh 3">
                  </div>
              </div>

              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon"></span>
              </button>
          </div>

        <!-- Bảng ngang (thu nhỏ và căn giữa) -->
        <table class="table-container">
            <tr>
                <th>Môi Trường Giáo Dục</th>
                <th>Chương Trình Đào Tạo</th>
                <th>Hoạt Động Sinh Viên</th>
            </tr>
        </table>

        <!-- Nội dung mô tả -->
        <div class="description">
            Trở thành sinh viên của khoa, các bạn có một môi trường giáo dục tốt: Có các phòng học, phòng thí nghiệm, và trang thiết bị tối ưu để hỗ trợ việc giảng dạy và nghiên cứu trong lĩnh vực Công nghệ thông tin; Có các giảng viên giàu kinh nghiệm, có trình độ chuyên môn cao và đam mê trong lĩnh vực Công nghệ thông tin. 
            Các giảng viên cung cấp kiến thức mới nhất, hướng dẫn và hỗ trợ sinh viên trong quá trình học tập; Có chương trình học phong phú và đa dạng, bao gồm cả các môn học lý thuyết và thực hành. 
            Chương trình đáp ứng nhu cầu của ngành Công nghệ thông tin và cập nhật với các xu hướng công nghệ mới; 
            Tạo cơ hội cho sinh viên thực hành và thực tập trong các doanh nghiệp, tổ chức hoặc dự án thực tế; 
            Khuyến khích sự sáng tạo và tư duy độc lập của sinh viên. 
            Cung cấp các hoạt động ngoại khóa, dự án nghiên cứu, và hỗ trợ từ cộng đồng sinh viên và giảng viên để thúc đẩy sự phát triển cá nhân và tạo ra những ý tưởng mới.
        </div>

        <!-- Tin tức & sự kiện -->
        <div class="container mt-4">
        <div class="section-title">Tin tức & Sự kiện</div>
        <div class="row">
            <% if (danhSachBaiViet != null && !danhSachBaiViet.isEmpty()) {
                   for (BaiVietAnh bv : danhSachBaiViet) { %>
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <!-- Khi nhấn vào ảnh sẽ chuyển đến trang chi tiết bài viết -->
                        <a href="ChiTietBaiViet?id=<%= bv.getIdbv() %>">
                            <img src="<%= bv.getAnh() %>" class="card-img-top" alt="<%= bv.getTenBaiViet() %>">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title"><%= bv.getTenBaiViet() %></h5>
                            <p class="card-text">
                                <%= bv.getNoiDung().length() > 100 ? bv.getNoiDung().substring(0, 100) + "..." : bv.getNoiDung() %>
                            </p>
                        </div>
                    </div>
                </div>
            <%   }
               } else { %>
                <p class="text-center">Không có bài viết nào.</p>
            <% } %>
        </div>
        
        <!-- Phân trang -->
         <nav class="pagination-container">
        <% if (currentPage > 1) { %>
            <a class="btn btn-secondary" href="home?page=<%= currentPage - 1 %>">&laquo; Trước</a>
        <% } %>
        <% for (int i = 1; i <= totalPages; i++) { %>
            <a class="btn <%= (i == currentPage) ? "btn-primary" : "btn-outline-secondary" %>" href="home?page=<%= i %>"><%= i %></a>
        <% } %>
        <% if (currentPage < totalPages) { %>
            <a class="btn btn-secondary" href="home?page=<%= currentPage + 1 %>">Sau &raquo;</a>
        <% } %>
    </nav>


        <div class="section-title">Sinh viên tiêu biểu</div>
        <div class="featured-student">
            <img src="img/sinhvientieubieu.png" alt="Sinh viên tiêu biểu">
            <div>
                <h3>Dương Văn Phụng</h3>
                <p>
                    Trở thành sinh viên của khoa, các bạn có một môi trường giáo dục tốt: Có các phòng học, phòng thí nghiệm, và trang thiết bị tối ưu để hỗ trợ việc giảng dạy và nghiên cứu trong lĩnh vực Công nghệ thông tin. Có các giảng viên giàu kinh nghiệm, có trình độ chuyên môn cao và đam mê trong lĩnh vực Công nghệ thông tin. Các giảng viên cung cấp kiến thức mới nhất, hướng dẫn và hỗ trợ sinh viên trong quá trình học tập. Chương trình đào tạo đáp ứng nhu cầu của ngành Công nghệ thông tin và cập nhật với các xu hướng công nghệ mới. Tạo cơ hội cho sinh viên thực hành và thực tập trong các doanh nghiệp, tổ chức các dự án thực tế; khuyến khích sự sáng tạo và tư duy độc lập của sinh viên. Cung cấp các hoạt động ngoại khóa, dự án nghiên cứu, và sự hỗ trợ từ cộng đồng sinh viên và giảng viên để thúc đẩy sự phát triển cá nhân và tạo ra những ý tưởng mới. Có mối quan hệ chặt chẽ với các doanh nghiệp trong ngành Công nghệ thông tin, tạo cơ hội cho sinh viên tiếp cận với thực tế công việc, nhận được thông tin về xu hướng công nghệ.
                </p>
            </div>
        </div>

        <!-- Đối tác -->
        <div class="section-title">Đối tác</div>
        <div class="partners">
            Đang cập nhật thông tin đối tác...
        </div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    </body>
</html>
