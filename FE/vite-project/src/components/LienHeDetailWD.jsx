import { useState } from "react";
import HeaderNav from "./HeaderNav";

export default function RequestDetail() {
  const [status, setStatus] = useState("ĐANG XỬ LÝ");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="container">
        <HeaderNav />
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        {/* Tiêu đề */}
        <h2 className="text-center font-bold text-lg mb-4">XEM CHI TIẾT YÊU CẦU</h2>

        {/* Trạng thái xử lý */}
        <div className="flex justify-center mb-4">
          <select
            value={status}
            onChange={handleStatusChange}
            className="border-2 border-gray-300 px-4 py-2 rounded-full cursor-pointer text-center font-semibold"
          >
            <option value="ĐANG XỬ LÝ">ĐANG XỬ LÝ</option>
            <option value="ĐÃ XỬ LÝ">ĐÃ XỬ LÝ</option>
          </select>
        </div>

        {/* Nội dung yêu cầu */}
        <div className="border-2 border-gray-300 p-4 rounded-2xl bg-gray-50">
          <p><strong>STT:</strong> 1 <span className="ml-4"><strong>ID:</strong> LH001</span></p>
          <p><strong>NGÀY LIÊN HỆ:</strong> 28/2/2025</p>
          <p><strong>HỌ TÊN:</strong> NGUYỄN VĂN B</p>
          <p><strong>EMAIL:</strong> nguyenvanb@gmail.com</p>
          <p><strong>NỘI DUNG:</strong> Xin hãy cho tôi thêm thông tin về Khoa CNTT Đại học Thủy Lợi</p>
        </div>

        {/* Nút xác nhận và hủy bỏ */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-800 transition">
            XÁC NHẬN
          </button>
          <button className="border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-200 transition">
            HỦY BỎ
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
