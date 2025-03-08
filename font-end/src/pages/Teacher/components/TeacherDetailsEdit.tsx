import { useState } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  department: string;
  academicTitle: string;
  researchFields: string[];
  avatar: string;
  showEmail: boolean;
  showPhone: boolean;
}

interface TeacherDetailsEditProps {
  teacher: Teacher;
  onSave: (updatedTeacher: Teacher) => void;
  onCancel: () => void;
}

const TeacherDetailsEdit = ({
  teacher,
  onSave,
  onCancel,
}: TeacherDetailsEditProps) => {
  const [firstName, setFirstName] = useState(teacher.firstName);
  const [lastName, setLastName] = useState(teacher.lastName);
  const [gender, setGender] = useState(teacher.gender);
  const [email, setEmail] = useState(teacher.email);
  const [phone, setPhone] = useState(teacher.phone);
  const [department, setDepartment] = useState(teacher.department);
  const [academicTitle, setAcademicTitle] = useState(teacher.academicTitle);
  const [researchFieldsText, setResearchFieldsText] = useState(
    teacher.researchFields.join(", ")
  );
  const [showEmail, setShowEmail] = useState(teacher.showEmail);
  const [showPhone, setShowPhone] = useState(teacher.showPhone);
  const [avatar, setAvatar] = useState(teacher.avatar);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra và xác thực dữ liệu
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Vui lòng nhập họ";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Vui lòng nhập tên";
    }

    if (showEmail && !email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    }

    if (showPhone && !phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Chuẩn bị dữ liệu và gọi hàm onSave
    const updatedTeacher: Teacher = {
      ...teacher,
      firstName,
      lastName,
      gender,
      email,
      phone,
      department,
      academicTitle,
      researchFields: researchFieldsText
        .split(",")
        .map((field) => field.trim())
        .filter((field) => field !== ""),
      avatar,
      showEmail,
      showPhone,
    };

    onSave(updatedTeacher);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {teacher.id ? "Chỉnh sửa thông tin giáo viên" : "Thêm giáo viên mới"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ảnh đại diện */}
          <div className="md:col-span-2 flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={avatar}
                alt="Ảnh đại diện"
                className="h-32 w-32 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full"
                onClick={() => {
                  // Xử lý tải ảnh lên
                  // Trong thực tế, bạn sẽ mở một modal hoặc trình duyệt tệp ở đây
                  const newAvatar = prompt("Nhập URL ảnh mới:");
                  if (newAvatar) setAvatar(newAvatar);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Nhấp vào biểu tượng để thay đổi ảnh đại diện
            </p>
          </div>

          {/* Thông tin cá nhân */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-4">
              Thông tin cá nhân
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full p-2 border rounded-md ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full p-2 border rounded-md ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới tính
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>

          {/* Thông tin liên hệ và công tác */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-4">
              Liên hệ
            </h3>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <span>Email</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showEmail}
                    onChange={() => setShowEmail(!showEmail)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700">
                    Hiển thị
                  </span>
                </label>
              </div>
              {showEmail && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Email"
                />
              )}
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <span>Số điện thoại</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPhone}
                    onChange={() => setShowPhone(!showPhone)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700">
                    Hiển thị
                  </span>
                </label>
              </div>
              {showPhone && (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-2 border rounded-md ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Số điện thoại"
                />
              )}
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh hiệu học thuật
              </label>
              <input
                type="text"
                value={academicTitle}
                onChange={(e) => setAcademicTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ví dụ: Tiến sĩ, Phó Giáo sư, Giáo sư"
              />
            </div>
          </div>

          {/* Công tác và lĩnh vực nghiên cứu */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Công tác
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ví dụ: Bộ môn Công nghệ phần mềm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lĩnh vực nghiên cứu
              </label>
              <textarea
                value={researchFieldsText}
                onChange={(e) => setResearchFieldsText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nhập các lĩnh vực nghiên cứu, phân cách bằng dấu phẩy"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Nhập các lĩnh vực nghiên cứu, phân cách bằng dấu phẩy. Ví dụ: Xử
                lý ảnh, Trí tuệ nhân tạo, Học máy
              </p>
            </div>
          </div>
        </div>

        {/* Các nút hành động */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <CheckIcon className="h-5 w-5 mr-1" />
            {teacher.id ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherDetailsEdit;
