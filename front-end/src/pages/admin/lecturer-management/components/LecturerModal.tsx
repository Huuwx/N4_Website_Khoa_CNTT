import React from 'react';
import { CreateLecturerRequest, Lecturer, UpdateLecturerRequest } from '@/services/lecturerAccountService';

interface LecturerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLecturerRequest | UpdateLecturerRequest) => void;
  lecturer?: Lecturer;
  isEdit?: boolean;
}

type CreateFormData = {
  username: string;
  password: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
};

type UpdateFormData = {
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  password: string;
};

const LecturerModal = ({ isOpen, onClose, onSubmit, lecturer, isEdit }: LecturerModalProps) => {
  const [formData, setFormData] = React.useState<CreateFormData | UpdateFormData>(
    isEdit
      ? {
          email: lecturer?.email || '',
          fullName: lecturer?.fullName || '',
          gender: lecturer?.gender || 'MALE',
          phoneNumber: lecturer?.phoneNumber || '',
          password: '',
        }
      : {
          username: '',
          password: '',
          email: '',
          fullName: '',
          gender: 'MALE',
          phoneNumber: '',
        }
  );

  React.useEffect(() => {
    if (lecturer && isEdit) {
      setFormData({
        email: lecturer.email,
        fullName: lecturer.fullName,
        gender: lecturer.gender,
        phoneNumber: lecturer.phoneNumber,
        password: '',
      });
    } else {
      setFormData({
        username: '',
        password: '',
        email: '',
        fullName: '',
        gender: 'MALE',
        phoneNumber: '',
      });
    }
  }, [lecturer, isEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      // For edit mode, send all fields including password
      const updateData: UpdateLecturerRequest = {
        email: formData.email,
        fullName: formData.fullName,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };
      
      onSubmit(updateData);
    } else {
      // For create mode, send all fields as they are required
      onSubmit(formData as CreateLecturerRequest);
    }
  };

  const updateField = (field: keyof (CreateFormData & UpdateFormData), value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? 'Chỉnh sửa giảng viên' : 'Thêm giảng viên mới'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEdit && (
            <div>
              <label className="block mb-1">Tài khoản</label>
              <input
                type="text"
                value={'username' in formData ? formData.username : ''}
                onChange={(e) => updateField('username', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1">
              {isEdit ? 'Đổi mật khẩu (để trống nếu không đổi)' : 'Mật khẩu'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              className="w-full p-2 border rounded"
              required={!isEdit}
              minLength={6}
              placeholder={isEdit ? 'Nhập mật khẩu mới nếu muốn thay đổi' : 'Nhập mật khẩu'}
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Họ tên</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Giới tính</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  checked={formData.gender === 'MALE'}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="mr-2"
                  required
                />
                Nam
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  checked={formData.gender === 'FEMALE'}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="mr-2"
                  required
                />
                Nữ
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1">Số điện thoại</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => updateField('phoneNumber', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEdit ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LecturerModal;