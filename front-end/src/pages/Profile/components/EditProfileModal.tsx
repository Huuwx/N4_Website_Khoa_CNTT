import React, { useState, useEffect } from "react";
import { updateProfile, getProfile } from "@/services/authService"; // Điều chỉnh đường dẫn import
import { toast } from "react-toastify";

interface EditProfileModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [academicTitle, setAcademicTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [researchField, setResearchField] = useState("");
  const [subjectField, setSubjecthField] = useState("");

  // Load dữ liệu profile khi modal mở
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const taiKhoan = 'user123';
        console.log(taiKhoan)
        const response = await getProfile(taiKhoan);
        const profileData = response.data;

        // Cập nhật các state với dữ liệu từ API
        setName(profileData.hoTen);
        setGender(profileData.gioiTinh);
        setPhone(profileData.sdt);
        setEmail(profileData.email);
        setAcademicTitle(profileData.hocVi);
        setDepartment(profileData.khoa);
        setSubjecthField(profileData.boMon);
        setResearchField(profileData.linhVucNghienCuu);
      } catch (error) {
        toast.error("Lỗi khi tải thông tin profile");
      }
    };

    fetchProfile();
  }, []);

  // Xử lý format lĩnh vực nghiên cứu
  const formatResearchFields = (input: string): string => {
    // Loại bỏ khoảng trắng thừa và split theo dấu phẩy hoặc xuống dòng
    const fields = input
      .split(/[,\n]/)
      .map(field => field.trim())
      .filter(field => field !== ''); // Loại bỏ các trường rỗng

    // Trả về chuỗi các lĩnh vực được format
    return fields.join(', ');
  };

  // Xử lý submit thông tin
  const handleSubmit = async () => {
    try {
      // Lấy tài khoản từ localStorage
      const taiKhoan = localStorage.getItem('taiKhoan') || 'user123';

      // Format lĩnh vực nghiên cứu
      const formattedResearchField = formatResearchFields(researchField);

      // Gọi API cập nhật profile
      await updateProfile(taiKhoan, {
        linhVucNghienCuu: formattedResearchField,
        hocVi: academicTitle,
        khoa: department,
        boMon: subjectField,
      });

      // Hiển thị thông báo thành công
      toast.success("Cập nhật thông tin thành công");

      // Gọi hàm onSubmit và đóng modal
      onSubmit();
      onClose();
    } catch (error) {
      // Xử lý lỗi
      toast.error("Lỗi khi cập nhật thông tin");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/25">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 max-h-[80%] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">CHỈNH SỬA THÔNG TIN</h2>
          <button onClick={onClose} className="text-blue-600 text-sm">ĐÓNG</button>
        </div>

        {/* Personal Information */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">THÔNG TIN CÁ NHÂN</h3>
          <label className="block text-gray-700 mb-1">HỌ VÀ TÊN</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="block text-gray-700 mb-1">GIỚI TÍNH</label>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <input 
                type="radio" 
                id="gender-male" 
                name="gender" 
                value="NAM" 
                checked={gender === "NAM"} 
                onChange={() => setGender("NAM")} 
                className="mr-2"
              />
              <label htmlFor="gender-male">NAM</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="gender-female" 
                name="gender" 
                value="Nữ" 
                checked={gender === "Nữ"} 
                onChange={() => setGender("Nữ")} 
                className="mr-2"
              />
              <label htmlFor="gender-female">NỮ</label>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">LIÊN HỆ</h3>
          <label className="block text-gray-700 mb-1">SĐT</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="block text-gray-700 mb-1">EMAIL</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
        </div>

        {/* Academic and Research Information */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">HỌC HÀM/HỌC VỊ</h3>
          <input 
            type="text" 
            value={academicTitle} 
            onChange={(e) => setAcademicTitle(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Học hàm/Học vị"
          />
          <h3 className="font-semibold text-gray-800 mb-2">KHOA</h3>
          <input 
            type="text" 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Khoa"
          />
          <h3 className="font-semibold text-gray-800 mb-2">BỘ MÔN</h3>
          <input 
            type="text" 
            value={subjectField} 
            onChange={(e) => setSubjecthField(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Bộ môn"
          />
          
          {/* Lĩnh vực nghiên cứu */}
          <h3 className="font-semibold text-gray-800 mb-2">LĨNH VỰC NGHIÊN CỨU</h3>
          <textarea
            value={researchField}
            onChange={(e) => setResearchField(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Nhập các lĩnh vực nghiên cứu, ngăn cách bằng dấu phẩy hoặc xuống dòng
Ví dụ: 
Trí tuệ nhân tạo, Học máy
Xử lý ngôn ngữ tự nhiên"
            rows={4}
          />
          {/* Preview format */}
          {researchField && (
            <div className="text-sm text-gray-600 mb-2">
              <strong>Định dạng:</strong> {formatResearchFields(researchField)}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button 
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
          >
            XÁC NHẬN
          </button>
          <button 
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded"
          >
            HỦY BỎ
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
