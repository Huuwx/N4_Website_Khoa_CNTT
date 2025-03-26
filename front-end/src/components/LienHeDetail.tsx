import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Select } from "antd";
import yeuCauLienHeService from "@/services/yeucaulienheService"; // Import đúng cách

export default function LienHeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state?.request;

  const [status, setStatus] = useState(request?.trangThai || "Chưa đọc");

  const handleUpdateStatus = async () => {
    try {
      await yeuCauLienHeService.updateTrangThaiYeuCau(request.id, status); // Đúng cách gọi API
      navigate("/quan-ly-yeu-cau-lien-he");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-center font-bold text-lg mb-4">XEM CHI TIẾT YÊU CẦU</h2>

          {/* Trạng thái xử lý */}
          <div className="flex justify-center mb-4">
            <Select
              value={status}
              onChange={setStatus}
              className="border-gray-300 px-6 py-2 rounded-full cursor-pointer text-center font-semibold"
            >
              <Select.Option value="Chưa đọc">Chưa đọc</Select.Option>
              <Select.Option value="Đang xử lý">Đang xử lý</Select.Option>
              <Select.Option value="Đã xử lý">Đã xử lý</Select.Option>
            </Select>
          </div>

          {/* Nội dung yêu cầu */}
          <div className="border-2 border-gray-300 p-4 rounded-2xl bg-gray-50">
            <p><strong>ID:</strong> {request?.id}</p>
            <p><strong>NGÀY LIÊN HỆ:</strong> {request?.ngayLienHe}</p>
            <p><strong>HỌ TÊN:</strong> {request?.name}</p>
            <p><strong>EMAIL:</strong> {request?.email}</p>
            <p><strong>NỘI DUNG:</strong> {request?.message}</p>
          </div>

          {/* Nút xác nhận và hủy bỏ */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleUpdateStatus}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-800 transition"
            >
              XÁC NHẬN
            </button>
            <button
              onClick={() => navigate("/quan-ly-yeu-cau-lien-he")}
              className="border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-200 transition"
            >
              HỦY BỎ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
