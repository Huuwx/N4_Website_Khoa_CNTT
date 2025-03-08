import { useState } from "react";
import api from "../services/api";
import HeaderNav from "./HeaderNav";

export default function ContactForm({ refreshData }) {
  const [formData, setFormData] = useState({
    hoTen: "",
    soDienThoai: "",
    email: "",
    tieuDe: "",
    noiDung: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/lien-he", formData);
      alert("Gửi yêu cầu liên hệ thành công!");
      setFormData({ hoTen: "", soDienThoai: "", email: "", tieuDe: "", noiDung: "" });
      refreshData();
    } catch (error) {
      console.error("Lỗi khi gửi liên hệ:", error);
    }
  };

  return (
    <div className="container">
        <HeaderNav />
        <div className="flex justify-center items-center min-h-screen p-6">
        <div className="bg-[#5B7C84] p-8 rounded-lg flex w-full max-w-4xl shadow-lg">
            {/* Form bên trái */}
            <div className="w-2/3 pr-6">
            <h2 className="text-3xl font-bold text-white mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h2>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="hoTen"
                placeholder="Họ Tên"
                value={formData.hoTen}
                onChange={handleChange}
                className="bg-white w-full border p-2 rounded mb-3"
                required
                />
                <input
                type="text"
                name="soDienThoai"
                placeholder="SĐT"
                value={formData.soDienThoai}
                onChange={handleChange}
                className="bg-white w-full border p-2 rounded mb-3"
                required
                />
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white w-full border p-2 rounded mb-3"
                required
                />
                <input
                type="text"
                name="tieuDe"
                placeholder="Tiêu đề"
                value={formData.tieuDe}
                onChange={handleChange}
                className="bg-white w-full border p-2 rounded mb-3"
                />
                <textarea
                name="noiDung"
                placeholder="Nội dung"
                value={formData.noiDung}
                onChange={handleChange}
                className="bg-white w-full border p-2 rounded mb-3 h-24"
                required
                />

                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-800">
                Gửi
                </button>
            </form>
            </div>

            {/* Ảnh bên phải */}
            <div className="w-1/3 flex justify-center items-center">
            <div className="bg-white rounded-full p-4 shadow-lg">
                <img src=".\src\assets\images\Avatars - Default with Backdrop.png" alt="Avatar" className="w-40 h-40 rounded-full" />
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
