import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Input, Radio, Select, Upload, Button, message } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { Gender, LecturerProfileResponse, UpdateLecturerProfileRequest } from "@/types/lecturer";
import { lecturerProfileService } from "@/services/lecturerProfileService";

interface EditProfileModalProps {
  onClose: () => void;
  profile: LecturerProfileResponse;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose, profile }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ có thể tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Kích thước ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleAvatarChange = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploadingAvatar(true);
      return;
    }

    if (info.file.originFileObj) {
      try {
        const url = await lecturerProfileService.uploadAvatar(info.file.originFileObj);
        setAvatarUrl(url);
        form.setFieldValue('avatarUrl', url);
        message.success('Tải lên ảnh đại diện thành công!');
      } catch {
        message.error('Tải lên ảnh đại diện thất bại.');
      } finally {
        setUploadingAvatar(false);
      }
    }
  };

  const handleSubmit = async (values: UpdateLecturerProfileRequest) => {
    try {
      setIsSubmitting(true);
      // Loại bỏ các trường trống và giữ nguyên cài đặt hiển thị
      const request: UpdateLecturerProfileRequest = {
        ...Object.fromEntries(
          Object.entries(values).filter(([key, value]) => 
            value !== "" && value !== undefined && !key.startsWith("show")
          )
        ),
        avatarUrl: avatarUrl,
        showFullName: values.showFullName ?? profile.showFullName,
        showGender: values.showGender ?? profile.showGender,
        showPhoneNumber: values.showPhoneNumber ?? profile.showPhoneNumber,
        showAddress: values.showAddress ?? profile.showAddress,
        showAvatar: values.showAvatar ?? profile.showAvatar,
        showAcademicDegree: values.showAcademicDegree ?? profile.showAcademicDegree,
        showDepartment: values.showDepartment ?? profile.showDepartment,
        showPosition: values.showPosition ?? profile.showPosition,
        showFaculty: values.showFaculty ?? profile.showFaculty,
        showResearchFields: values.showResearchFields ?? profile.showResearchFields,
      } as UpdateLecturerProfileRequest;

      await lecturerProfileService.updateProfile(request);
      toast.success("Cập nhật hồ sơ thành công");
      onClose();
    } catch {
      toast.error("Lỗi khi cập nhật hồ sơ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadButton = (
    <div>
      {uploadingAvatar ? <LoadingOutlined /> : <UploadOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/25">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 max-h-[80%] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">CHỈNH SỬA HỒ SƠ</h2>
          <button onClick={onClose} className="text-blue-600 text-sm">ĐÓNG</button>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            ...profile,
            researchFields: profile.researchFields || [],
          }}
        >
          {/* Ảnh đại diện */}
          <div className="mb-6 text-center">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleAvatarChange}
              customRequest={({ onSuccess }) => {
                onSuccess?.("ok");
              }}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Ảnh đại diện" style={{ width: '100%', borderRadius: '50%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>

          {/* Thông tin cá nhân */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">THÔNG TIN CÁ NHÂN</h3>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
            >
              <Radio.Group>
                <Radio value={Gender.MALE}>Nam</Radio>
                <Radio value={Gender.FEMALE}>Nữ</Radio>
                <Radio value={Gender.OTHER}>Khác</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Thông tin liên hệ */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">THÔNG TIN LIÊN HỆ</h3>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Vui lòng nhập email hợp lệ!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
            >
              <Input.TextArea />
            </Form.Item>
          </div>

          {/* Thông tin học thuật */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">THÔNG TIN HỌC THUẬT</h3>
            <Form.Item
              label="Học vị"
              name="academicDegree"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Khoa"
              name="faculty"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Bộ môn"
              name="department"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Chức vụ"
              name="position"
            >
              <Input />
            </Form.Item>
          </div>

          {/* Lĩnh vực nghiên cứu */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">LĨNH VỰC NGHIÊN CỨU</h3>
            <Form.Item
              name="researchFields"
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Nhập lĩnh vực nghiên cứu"
                tokenSeparators={[',']}
              />
            </Form.Item>
          </div>

          {/* Đổi mật khẩu */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">ĐỔI MẬT KHẨU</h3>
            <Form.Item
              name="password"
              rules={[
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password placeholder="Để trống nếu muốn giữ mật khẩu hiện tại" />
            </Form.Item>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-end space-x-3">
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="bg-blue-600"
            >
              Lưu thay đổi
            </Button>
            <Button onClick={onClose}>
              Hủy
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileModal;
