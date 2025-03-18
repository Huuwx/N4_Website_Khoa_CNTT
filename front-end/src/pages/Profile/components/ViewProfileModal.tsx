import React, { useState, useEffect } from "react";
import { getProfile, updateVisibility } from "@/services/authService"; // Điều chỉnh đường dẫn import
import EditProfileModal from "./EditProfileModal";
import { toast } from "react-toastify"; // Nếu sử dụng toast

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

const ViewProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
  onSubmit,
}) => {
  // State cho thông tin profile
  const [profileData, setProfileData] = useState<any>(null);

  // State cho trạng thái hiển thị
  const [visibilitySettings, setVisibilitySettings] = useState({
    hienSdt: true,
    hienEmail: true,
    hienLinhVucNghienCuu: true,
    hienHocVi: true,
    hienKhoa: true,
    hienBoMon: true,
    hienChucVu: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data khi component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Lấy tài khoản từ localStorage hoặc context
        const taiKhoan = localStorage.getItem("taiKhoan") || "user123";

        const response = await getProfile(taiKhoan);

        // Cập nhật dữ liệu profile
        setProfileData(response.data);

        // Cập nhật trạng thái hiển thị
        setVisibilitySettings({
          hienSdt: true, // Mặc định luôn hiển thị
          hienEmail: true, // Mặc định luôn hiển thị
          hienLinhVucNghienCuu: response.data.hienLinhVucNghienCuu,
          hienHocVi: response.data.hienHocVi,
          hienKhoa: response.data.hienKhoa,
          hienBoMon: response.data.hienBoMon,
          hienChucVu: response.data.hienChucVu,
        });

        setIsLoading(false);
      } catch (error) {
        toast.error("Lỗi khi tải thông tin profile");
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Toggle switch component
  const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    enabled,
    onChange,
    label,
    value,
  }) => (
    <div className="flex items-center justify-between my-3">
      <div className="flex">
        <span className="text-gray-700 mr-2">{label}</span>
        {value && (
          <span className={`text-gray-700 ${!enabled ? "text-gray-400" : ""}`}>
            {value}
          </span>
        )}
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
            ${enabled ? "bg-blue-600" : "bg-gray-300"}
          `}
        />
        <span
          className={`
            absolute left-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
            ${enabled ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );

  // Xử lý cập nhật trạng thái hiển thị
  const handleUpdateVisibility = async () => {
    try {
      const taiKhoan = localStorage.getItem("taiKhoan") || "user123";

      // Gọi API cập nhật
      await updateVisibility(taiKhoan, {
        hienAnh: true, // Mặc định
        hienLinhVucNghienCuu: visibilitySettings.hienLinhVucNghienCuu,
        hienHocVi: visibilitySettings.hienHocVi,
        hienKhoa: visibilitySettings.hienKhoa,
        hienBoMon: visibilitySettings.hienBoMon,
        hienChucVu: visibilitySettings.hienChucVu,
      });

      toast.success("Cập nhật trạng thái hiển thị thành công");
      onClose(); // Đóng modal
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái hiển thị");
    }
  };

  // Render loading
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  // Render khi không có dữ liệu
  if (!profileData) {
    return <div>Không có thông tin profile</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 max-h-[80%] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            CHỈNH SỬA CHI TIẾT
          </h2>
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
              src={profileData.anh || "https://i.pravatar.cc/300"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            THÔNG TIN CÁ NHÂN
          </h3>
          <p className="text-gray-700">HỌ VÀ TÊN: {profileData.hoTen}</p>
          <p className="text-gray-700">GIỚI TÍNH: {profileData.gioiTinh}</p>
        </div>
        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">LIÊN HỆ</h3>
          <ToggleSwitch
            enabled={visibilitySettings.hienSdt}
            onChange={() => {}} // Không cho phép thay đổi SĐT và Email
            label="SĐT"
            value={profileData.sdt}
          />
          <ToggleSwitch
            enabled={visibilitySettings.hienEmail}
            onChange={() => {}} // Không cho phép thay đổi SĐT và Email
            label="EMAIL"
            value={profileData.email}
          />
        </div>
        {/* Research Areas */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            LĨNH VỰC NGHIÊN CỨU
          </h3>
          <div className="flex items-center justify-between my-3">
            <span className="text-gray-700">Tất cả lĩnh vực</span>
            <button
              onClick={() =>
                setVisibilitySettings((prev) => ({
                  ...prev,
                  hienLinhVucNghienCuu: !prev.hienLinhVucNghienCuu,
                }))
              }
              className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none
        ${
          visibilitySettings.hienLinhVucNghienCuu
            ? "bg-blue-600"
            : "bg-gray-300"
        }
      `}
            >
              <span
                className={`
          absolute inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
          ${
            visibilitySettings.hienLinhVucNghienCuu
              ? "translate-x-6"
              : "translate-x-1"
          }
        `}
              />
            </button>
          </div>
        </div>
        {/* Academic Title */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            DANH HIỆU HỌC THUẬT
          </h3>
          <ToggleSwitch
            enabled={visibilitySettings.hienHocVi}
            onChange={() =>
              setVisibilitySettings((prev) => ({
                ...prev,
                hienHocVi: !prev.hienHocVi,
              }))
            }
            label="Học hàm/Học vị"
            value={profileData.hocVi}
          />
          <ToggleSwitch
            enabled={visibilitySettings.hienKhoa}
            onChange={() =>
              setVisibilitySettings((prev) => ({
                ...prev,
                hienKhoa: !prev.hienKhoa,
              }))
            }
            label="Khoa"
            value={profileData.khoa}
          />
          <ToggleSwitch
            enabled={visibilitySettings.hienBoMon}
            onChange={() =>
              setVisibilitySettings((prev) => ({
                ...prev,
                hienBoMon: !prev.hienBoMon,
              }))
            }
            label="Bộ môn"
            value={profileData.boMon}
          />
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleUpdateVisibility}
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
            // Xử lý logic submit
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ViewProfileModal;
