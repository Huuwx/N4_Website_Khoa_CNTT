import { useState, FormEvent, ChangeEvent } from "react";
import yeuCauLienHeService from "@/services/yeucaulienheService";



interface ContactFormProps {
  refreshData: () => void;
}

interface FormDataType {
  name: string;
  soDienThoai: string;
  email: string;
  tieuDe: string;
  message: string;
}

interface MessageType {
  type: 'success' | 'error';
  text: string;
}

export default function ContactForm({ refreshData }: ContactFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    soDienThoai: "",
    email: "",
    tieuDe: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
  
    const ngayLienHe = new Date().toLocaleDateString("vi-VN");  
    const formDataWithDate = { 
      ...formData, 
      ngayLienHe, 
      status: "Chưa đọc" as "Chưa đọc" | "Đang xử lý" | "Đã xử lý",
      data: {}
    };
    
    
    
  
    try {
      const response = await yeuCauLienHeService.createYeuCauLienHe(formDataWithDate);
      
      // Kiểm tra phản hồi từ API
      if (response && response.message === "Created successfully") {
        setMessage({
          type: 'success',
          text: 'Gửi yêu cầu liên hệ thành công!'
        });
      } else {
        throw new Error(response?.message || "Lỗi không xác định");
      }
    
      setFormData({ name: "", soDienThoai: "", email: "", tieuDe: "", message: "" });
      refreshData();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Có lỗi xảy ra khi gửi liên hệ. Vui lòng thử lại.'
      });
      console.error("Lỗi khi gửi liên hệ:", error);
    } finally {
      setLoading(false);
    }
    
  };
  
  return (
    <div className="container">
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="bg-[#5B7C84] p-8 rounded-lg flex w-full max-w-4xl shadow-lg">
          
          {/* Form bên trái */}
          <div className="w-2/3 pr-6">
            <h2 className="text-3xl font-bold text-white mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h2>

            {/* Hiển thị thông báo phản hồi */}
            {message && (
              <div className={`p-2 mb-3 rounded text-center font-semibold ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ Tên"
                value={formData.name}
                onChange={handleChange}
                className="bg-white w-full border p-2 rounded mb-3"
                required
              />
              <input
                type="tel"
                name="soDienThoai"
                placeholder="SĐT"
                value={formData.soDienThoai}
                onChange={handleChange}
                className="bg-white w-full border p-2 rounded mb-3"
                pattern="[0-9]*"
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
                name="message"
                placeholder="Nội dung"
                value={formData.message}
                onChange={handleChange}
                className="bg-white w-full border p-2 rounded mb-3 h-24"
                required
              />

              <button 
                type="submit" 
                className={`bg-red-600 text-white px-6 py-2 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800'}`}
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Gửi"}
              </button>
            </form>
          </div>

          {/* Ảnh bên phải */}
          <div className="w-1/3 flex justify-center items-center">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <img src="/src/assets/images/Avatars - Default with Backdrop.png" alt="Avatar" className="w-40 h-40 rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
