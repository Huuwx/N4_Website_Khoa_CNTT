import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Switch } from "antd";
import { LecturerProfileResponse, UpdateLecturerProfileRequest } from "@/types/lecturer";
import { lecturerProfileService } from "@/services/lecturerProfileService";
import EditProfileModal from "./EditProfileModal";

interface ViewProfileModalProps {
  onClose: () => void;
}

const ViewProfileModal: React.FC<ViewProfileModalProps> = ({ onClose }) => {
  const [profileData, setProfileData] = useState<LecturerProfileResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Tải dữ liệu hồ sơ khi component được khởi tạo
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await lecturerProfileService.getLecturerProfile();
        setProfileData(response);
        setIsLoading(false);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Lỗi khi tải hồ sơ";
        toast.error(errorMessage);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleVisibilityChange = async (field: string, checked: boolean) => {
    if (!profileData) return;

    try {
      const updatedData: UpdateLecturerProfileRequest = {
        ...profileData,
        [`show${field}`]: checked,
      };
      await lecturerProfileService.updateProfile(updatedData);
      const response = await lecturerProfileService.getLecturerProfile();
      setProfileData(response);
      toast.success("Cập nhật trạng thái hiển thị thành công");
    } catch {
      toast.error("Không thể cập nhật trạng thái hiển thị");
    }
  };

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!profileData) {
    return <div>Không có thông tin hồ sơ</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 max-h-[80%] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            XEM HỒ SƠ
          </h2>
          <button
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
            onClick={() => setIsModalOpen(true)}
          >
            CHỈNH SỬA
          </button>
        </div>

        <div className="space-y-6">
          {/* Ảnh đại diện */}
          <div className="flex items-center justify-center mb-6">
            {profileData.avatarUrl && (
              <img
                src={profileData.avatarUrl}
                alt="Ảnh đại diện"
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
          </div>

          {/* Thông tin cá nhân */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-800 mb-4">THÔNG TIN CÁ NHÂN</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Họ và tên: {profileData.fullName}</p>
                <Switch
                  checked={profileData.showFullName}
                  onChange={(checked) => handleVisibilityChange("FullName", checked)}
                  size="small"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Giới tính: {profileData.gender}</p>
                <Switch
                  checked={profileData.showGender}
                  onChange={(checked) => handleVisibilityChange("Gender", checked)}
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-800 mb-4">THÔNG TIN LIÊN HỆ</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Số điện thoại: {profileData.phoneNumber}</p>
                <Switch
                  checked={profileData.showPhoneNumber}
                  onChange={(checked) => handleVisibilityChange("PhoneNumber", checked)}
                  size="small"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Email: {profileData.email}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Địa chỉ: {profileData.address}</p>
                <Switch
                  checked={profileData.showAddress}
                  onChange={(checked) => handleVisibilityChange("Address", checked)}
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* Thông tin học thuật */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-800 mb-4">THÔNG TIN HỌC THUẬT</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Học vị: {profileData.academicDegree}</p>
                <Switch
                  checked={profileData.showAcademicDegree}
                  onChange={(checked) => handleVisibilityChange("AcademicDegree", checked)}
                  size="small"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Khoa: {profileData.faculty}</p>
                <Switch
                  checked={profileData.showFaculty}
                  onChange={(checked) => handleVisibilityChange("Faculty", checked)}
                  size="small"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Bộ môn: {profileData.department}</p>
                <Switch
                  checked={profileData.showDepartment}
                  onChange={(checked) => handleVisibilityChange("Department", checked)}
                  size="small"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Chức vụ: {profileData.position}</p>
                <Switch
                  checked={profileData.showPosition}
                  onChange={(checked) => handleVisibilityChange("Position", checked)}
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* Lĩnh vực nghiên cứu */}
          <div className="pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Lĩnh vực nghiên cứu</h3>
              <Switch
                checked={profileData.showResearchFields}
                onChange={(checked) => handleVisibilityChange("ResearchFields", checked)}
                size="small"
              />
            </div>
            <div className="space-y-2">
              {profileData.researchFields?.map((field, index) => (
                <p key={index} className="text-gray-700">{field}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Nút thao tác */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal
          onClose={() => {
            setIsModalOpen(false);
            // Làm mới dữ liệu hồ sơ sau khi chỉnh sửa
            const fetchProfile = async () => {
              try {
                const response = await lecturerProfileService.getLecturerProfile();
                setProfileData(response);
              } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : "Lỗi khi tải hồ sơ";
                toast.error(errorMessage);
              }
            };
            fetchProfile();
          }}
          profile={profileData}
        />
      )}
    </div>
  );
};

export default ViewProfileModal;
