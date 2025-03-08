import { useState } from "react";
import api from "../services/api";

export default function DanhMucForm({ refreshData }) {
  const [tenDanhMuc, setTenDanhMuc] = useState("");
  const [nhomDanhMuc, setNhomDanhMuc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/danh-muc", { tenDanhMuc, nhomDanhMuc });
      alert("Danh mục được tạo thành công!");
      setTenDanhMuc("");
      setNhomDanhMuc("");
      refreshData(); // Load lại danh sách sau khi thêm
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Tên danh mục"
        value={tenDanhMuc}
        onChange={(e) => setTenDanhMuc(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Nhóm danh mục"
        value={nhomDanhMuc}
        onChange={(e) => setNhomDanhMuc(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Tạo</button>
    </form>
  );
}
