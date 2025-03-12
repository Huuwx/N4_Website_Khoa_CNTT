import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";

interface EditProfileModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
  value?: string;
}

const ViewProfileModal: React.FC<EditProfileModalProps> = ({ onClose, onSubmit }) => {
  const [phoneEnabled, setPhoneEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [imageProcessingEnabled, setImageProcessingEnabled] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [phdEnabled, setPhdEnabled] = useState(true);
  const [itDeptEnabled, setItDeptEnabled] = useState(true);
  const [softwareEngEnabled, setSoftwareEngEnabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label, value }) => (
    <div className="flex items-center justify-between my-3">
      <div className="flex">
        <span className="text-gray-700 mr-2">{label}</span>
        {value && <span className={`text-gray-700 ${!enabled ? "text-gray-400" : ""}`}>{value}</span>}
      </div>
      <button 
        onClick={onChange}
        className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none"
        aria-pressed={enabled}
        aria-label={`Toggle ${label} visibility`}
      >
        <span 
          className={`
            absolute w-full h-full rounded-full transition-colors duration-200 ease-in-out
            ${enabled ? 'bg-blue-600' : 'bg-gray-300'}
          `}
        />
        <span 
          className={`
            absolute left-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 max-h-[80%] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">CHỈNH SỬA CHI TIẾT</h2>
          <button 
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
            onClick={() => setIsModalOpen(true)} 
          >
            CHỈNH SỬA
          </button>
        </div>

        {/* Profile Picture Section */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src="https://i.pravatar.cc/300"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">THÔNG TIN CÁ NHÂN</h3>
          <p className="text-gray-700">HỌ VÀ TÊN: CỬ VIẾT DŨNG</p>
          <p className="text-gray-700">GIỚI TÍNH: NAM</p>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">LIÊN HỆ</h3>
          <ToggleSwitch 
            enabled={phoneEnabled} 
            onChange={() => setPhoneEnabled(!phoneEnabled)} 
            label="SĐT" 
            value="0123456789" 
          />
          <ToggleSwitch 
            enabled={emailEnabled} 
            onChange={() => setEmailEnabled(!emailEnabled)} 
            label="EMAIL" 
            value="abc@e.tlu.edu.vn" 
          />
        </div>

        {/* Research Areas */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">LĨNH VỰC NGHIÊN CỨU</h3>
          <ToggleSwitch 
            enabled={imageProcessingEnabled} 
            onChange={() => setImageProcessingEnabled(!imageProcessingEnabled)} 
            label="Xử lý ảnh" 
          />
          <ToggleSwitch 
            enabled={aiEnabled} 
            onChange={() => setAiEnabled(!aiEnabled)} 
            label="Trí tuệ nhân tạo" 
          />
        </div>

        {/* Academic Title */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">DANH HIỆU HỌC THUẬT</h3>
          <ToggleSwitch 
            enabled={phdEnabled} 
            onChange={() => setPhdEnabled(!phdEnabled)} 
            label="Học hàm/Học vị Tiến sĩ" 
          />
        </div>

        {/* Work Department */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">CÔNG TÁC</h3>
          <ToggleSwitch 
            enabled={itDeptEnabled} 
            onChange={() => setItDeptEnabled(!itDeptEnabled)} 
            label="Công nghệ thông tin" 
          />
          <ToggleSwitch 
            enabled={softwareEngEnabled} 
            onChange={() => setSoftwareEngEnabled(!softwareEngEnabled)} 
            label="Bộ môn Công nghệ phần mềm" 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium transition-colors"
          >
            XÁC NHẬN
          </button>
          <button 
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded font-medium transition-colors"
          >
            HỦY BỎ
          </button>
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={() => { 
            // Handle submit logic here 
            setIsModalOpen(false); 
          }} 
        />
      )}
    </div>

  );
};

export default ViewProfileModal;
