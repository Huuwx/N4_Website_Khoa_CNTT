import React, { useState } from "react";
import ReactDOM from "react-dom";

interface AddCategoryFormProps {
  onSubmit: (category: { name: string; groups: string[] }) => void;
  onCancel: () => void;
  initialData?: { name: string; groups: string[] }; // Optional for editing
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [groups, setGroups] = useState<string[]>(initialData?.groups || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
    onSubmit({ name, groups });
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">THÊM DANH MỤC</h2> {/* Center title */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">TÊN DANH MỤC</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">NHÓM DANH MỤC</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={groups[0] || ""} // Use single select
              onChange={(e) => setGroups([e.target.value])} // Single select update
            >
              <option value="">Chọn nhóm danh mục</option>
              <option value="Tuyển sinh">TUYỂN SINH</option>
              <option value="Giới thiệu">GIỚI THIỆU</option>
              <option value="Doanh nghiệp">DOANH NGHIỆP</option>
              <option value="Đào tạo">ĐÀO TẠO</option>
              <option value="Khoa công nghệ">KHOA CÔNG NGHỆ</option>
              <option value="Hợp tác đối ngoại">HỢP TÁC ĐỐI NGOẠI</option>
            </select>
          </div>
          <div className="flex justify-around gap-2"> {/* Evenly spaced buttons */}
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
              XÁC NHẬN
            </button>
            <button type="button" className="bg-gray-400 px-4 py-2 rounded" onClick={onCancel}>
              HỦY BỎ
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddCategoryForm;