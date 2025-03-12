import React, { useState } from "react";

interface EditProfileModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("CỬ VIẾT DŨNG");
  const [gender, setGender] = useState("NAM");
  const [phone, setPhone] = useState("0123456789");
  const [email, setEmail] = useState("abc@e.tlu.edu.vn");
  const [address, setAddress] = useState("");
  const [academicTitle, setAcademicTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [researchField, setResearchField] = useState("");

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
          <label className="block text-gray-700 mb-1">ĐỊA CHỈ</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
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
            value={researchField} 
            onChange={(e) => setResearchField(e.target.value)} 
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Lĩnh vực nghiên cứu"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onSubmit}
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
