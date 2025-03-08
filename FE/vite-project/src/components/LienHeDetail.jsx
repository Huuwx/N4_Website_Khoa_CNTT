import { useState } from "react";
import api from "../services/api";
import HeaderNav from "./HeaderNav";

export default function RequestDetail({ request, refreshData }) {
  const [status, setStatus] = useState(request.trangThai || "ĐANG XỬ LÝ");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleConfirm = async () => {
    try {
      await api.put(`/lien-he/${request.id}`, { trangThai: "ĐÃ XỬ LÝ" });
      alert("Yêu cầu đã được xác nhận!");
      refreshData();
    } catch (error) {
      console.error("Lỗi khi xác nhận:", error);
    }
  };

  const handleCancel = async () => {
    try {
      await api.put(`/lien-he/${request.id}`, { trangThai: "HỦY BỎ" });
      alert("Yêu cầu đã bị hủy!");
      refreshData();
    } catch (error) {
      console.error("Lỗi khi hủy bỏ:", error);
    }
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
            cclassName="border-2 border-gray-300 px-4 py-2 rounded-full cursor-pointer text-center font-semibold"
          >
            <option value="ĐANG XỬ LÝ">ĐANG XỬ LÝ</option>
            <option value="ĐÃ XỬ LÝ">ĐÃ XỬ LÝ</option>
          </select>
        </div>

        {/* Nội dung yêu cầu */}
        <div className="border-2 border-gray-300 p-4 rounded-2xl bg-gray-50">
          <p><strong>STT:</strong> {request.stt} <span className="ml-4"><strong>ID:</strong> {request.id}</span></p>
          <p><strong>NGÀY LIÊN HỆ:</strong> {request.ngayLienHe}</p>
          <p><strong>HỌ TÊN:</strong> {request.hoTen}</p>
          <p><strong>EMAIL:</strong> {request.email}</p>
          <p><strong>NỘI DUNG:</strong> {request.noiDung}</p>
        </div>

        {/* Nút xác nhận và hủy bỏ */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-800 transition"
          >
            XÁC NHẬN
          </button>
          <button
            onClick={handleCancel}
            className="border-2 border-gray-300 px-6 py-2 rounded-full hover:bg-gray-200 transitio"
          >
            HỦY BỎ
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
