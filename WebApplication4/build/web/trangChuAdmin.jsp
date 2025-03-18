<%@page import="model.TaiKhoan"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<% ArrayList<TaiKhoan> list = (ArrayList<TaiKhoan>) request.getAttribute("taiKhoanList"); 
    boolean hasData = (list != null && !list.isEmpty());
%>
<% 
if (list != null) {
} else {
    out.println("ListPhim null");
}
%>
<%
    String message = (String) session.getAttribute("message");
    if (message != null) {
%>
    <div class="alert alert-success"><%= message %></div>
<%
        session.removeAttribute("message"); // Xóa thông báo sau khi hiển thị
    }
%>


<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Quản Lý Tài Khoản</title>
    <!-- Nếu muốn dùng Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script
    <!-- Icon Font Awesome (nếu cần) -->
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>

    <style>
        /* Thiết lập font chữ (hiển thị tiếng Việt) */
        body {
            font-family: sans-serif;
        }
        /* Tiêu đề chính */
        .main-title {
            font-size: 2rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: left;
            margin-bottom: 20px;
        }
        /* Nút Thêm */
        .btn-add {
            background-color: #28a745;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 10px;
        }
        .btn-add:hover {
            opacity: 0.9;
        }
        /* Container chứa nút Thêm và thanh tìm kiếm */
        .toolbar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        /* Thanh tìm kiếm */
        .search-input {
            width: 250px;
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        /* Bảng với bo góc */
        .table-custom {
            width: 100%;
            /* Sử dụng separate + spacing để bo góc */
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 10px;
            border: 1px solid #ccc;   /* Tạo đường viền chung cho bảng */
            border-radius: 10px;      /* Bo góc chung cho bảng */
            overflow: hidden;         /* Để bo góc có hiệu lực ở các cạnh */
        }
        .table-custom thead {
            background-color: #f8f9fa;
        }
        .table-custom th, .table-custom td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
            vertical-align: middle;
        }
        .table-custom th {
            font-weight: bold;
        }
        /* Bo góc riêng cho thead / tbody nếu muốn chi tiết hơn */
        .table-custom thead tr:first-child th:first-child {
            border-top-left-radius: 10px;
        }
        .table-custom thead tr:first-child th:last-child {
            border-top-right-radius: 10px;
        }
        .table-custom tbody tr:last-child td:first-child {
            border-bottom-left-radius: 10px;
        }
        .table-custom tbody tr:last-child td:last-child {
            border-bottom-right-radius: 10px;
        }
        /* Hành động */
        .btn-action {
            border: none;
            background: none;
            cursor: pointer;
            padding: 0 5px;
        }
        .text-success {
            color: green;
        }
        .text-danger {
            color: red;
        }
        /* Phân trang */
        .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            gap: 5px;
        }
        .pagination-container .page-item {
            display: inline-block;
            margin: 0 2px;
            cursor: pointer;
        }
        .pagination-container .page-item.active a {
            font-weight: bold;
        }
        .pagination-container a {
            text-decoration: none;
            color: black;
            padding: 5px 10px;
            border: 1px solid #ccc;
        }
        .pagination-container a:hover {
            background-color: #e9ecef;
        }
        /* Màu mũi tên (tùy chọn) */
        .arrow-disabled {
            color: #999;
        }
        .search-box {
    position: relative;
    display: flex;
    align-items: center;
}

.search-input {
    width: 250px;
    padding: 8px 30px 8px 35px; /* Chừa không gian bên trái cho icon */
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px; /* Điều chỉnh kích thước icon */
    color: #888;
}

    </style>
</head>
 
<body class="p-3">
<%@ include file="templates/headeradm.jsp" %> 
    <h1 class="main-title">Quản Lý Tài Khoản</h1>
    
    <!-- Thanh công cụ: Nút Thêm + Tìm kiếm -->
    <div class="toolbar-container">
    <a href="Signup" class="btn-add">Thêm</a>
    <div class="search-box">
        <i class="bi bi-search search-icon"></i>
        <input type="text" id="searchInput" class="search-input" placeholder="Tìm kiếm tài khoản..."
         oninput="searchAccount()">
    </div>
</div>

</div>


    <!-- Bảng tài khoản -->
    <table class="table-custom">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tài Khoản</th>
                <th>Mật Khẩu</th>
                <th>Họ Tên</th>
                <th>Giới Tính</th>
                <th>SDT</th>
                <th>Loại Tài Khoản</th>
                <th>Trạng Thái Tài Khoản</th>
                <th>Hành Động</th>
            </tr>
        </thead>
      <tbody id="accountTable">
                <% if (hasData) { 
                    for (int i = 0; i < list.size(); i++) { 
                        TaiKhoan tk = list.get(i);
                %>
                    <tr>
                        <td><%= i + 1 %></td>
                        <td><%= tk.getTaiKhoan() %></td>
                        <td><%= tk.getMatKhau() %></td>
                        <td><%= tk.getHoTen() %></td>
                        <td><%= tk.getGioiTinh() %></td>
                        <td><%= tk.getSdt() %></td>
                        <td><%= tk.getPhanQuyen() %></td>
                        <td class="<%= tk.getTrangThai().equals("Hoạt Động") ? "text-success" : "text-danger" %>">
                            <%= tk.getTrangThai() %>
                        </td>
                        <td>
                       <a href="Edit?id=<%= tk.getIdgv() %>">
                       <img src="img/pen.png" alt="Bút chì" width="24" height="24"></a>
                        <a href="HomeAdmin?iddelete=<%= tk.getIdgv() %>" onclick="return confirmDelete(<%= tk.getIdgv() %>)">
                            <img src="img/thungrac.png" alt="Thùng rác" width="24" height="24">
                        </a>
                        <a href="HomeAdmin?idvohieuhoa=<%= tk.getIdgv() %>" onclick="return confirmVoHieuHoa(<%= tk.getIdgv() %>)">
                            <img src="img/vohieuhoa.jpg" alt="Vo hieu hoa" width="24" height="24">
                        </a>
                        </td>
                    </tr>
                <% } } %>
            </tbody>
</tbody>

    </table>

    <!-- Thanh phân trang -->
<%@ page import="java.lang.Integer" %>
<% 
    int currentPage = (Integer) request.getAttribute("currentPage"); 
    int totalPages = (Integer) request.getAttribute("totalPages"); 
%>

<nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
        <% if (currentPage > 1) { %>
            <li class="page-item">
                <a class="page-link" href="HomeAdmin?page=<%= currentPage - 1 %>">&laquo;</a>
            </li>
        <% } %>

        <% for (int i = 1; i <= totalPages; i++) { 
            if (i == 1 || i == totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) { %>
                <li class="page-item <%= (i == currentPage) ? "active" : "" %>">
                    <a class="page-link" href="HomeAdmin?page=<%= i %>"><%= i %></a>
                </li>
            <% } else if (i == currentPage - 3 || i == currentPage + 3) { %>
                <li class="page-item disabled"><span class="page-link">...</span></li>
            <% } 
        } %>

        <% if (currentPage < totalPages) { %>
            <li class="page-item">
                <a class="page-link" href="HomeAdmin?page=<%= currentPage + 1 %>">&raquo;</a>
            </li>
        <% } %>
    </ul>
</nav>

    
    <!-- Nếu dùng Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- JavaScript Lọc theo từ khóa trong bảng -->
    <script>
        function searchAccount() {
    let searchValue = document.getElementById("searchInput").value.trim();
     window.location.href = "HomeAdmin?username=" + encodeURIComponent(searchValue);
    fetch("HomeAdmin?username=" + encodeURIComponent(searchValue))
        .then(response => response.text()) 
        .then(data => {
            document.getElementById("aaccountTable").innerHTML = data;
        })
        .catch(error => console.error("Lỗi tìm kiếm:", error));
}

    </script>
    <script>
function confirmDelete(id) {
        return confirm("Bạn có chắc chắn muốn xóa tài khoản này không!!!")
}
</script>
    <script>
    function confirmVoHieuHoa(id) {
        return confirm("Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không!!!");
    }
    </script>


</body>
</html>
