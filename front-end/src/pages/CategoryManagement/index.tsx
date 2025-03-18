import React, { useState, useEffect } from "react";
import AddCategoryForm from "./components/AddCategoryForm";
import EditCategoryForm from "./components/EditCategoryForm";
import ConfirmModal from "./components/DeleteConfirmModal";
import Pagination from "./components/Pagination";

interface Category {
  id: string;
  name: string;
  groups: string[];
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const sampleCategories: Category[] = [
      { id: "CSELCC", name: "CHẤT LƯỢNG CAO", groups: ["Tuyển Sinh", "Doanh Nghiệp"] },
      { id: "CSELC", name: "Tuyển Sinh 2025", groups: ["Tuyển Sinh"] },
      { id: "GTTT", name: "Giới Thiệu Trường", groups: ["Học thuật"] },
      { id: "HTQT", name: "Hợp Tác Quốc Tế", groups: ["Doanh nghiệp"] },
    ];
    setCategories(sampleCategories);
  }, []);

  const handleAdd = (category: { name: string; groups: string[] }) => {
    setCategories([...categories, { id: Date.now().toString(), ...category }]);
    setShowAddModal(false);
  };

  const handleEdit = (category: { id: string; name: string; groups: string[] }) => {
    setCategories(categories.map((c) => (c.id === category.id ? { ...c, ...category } : c)));
    setEditingCategory(null);
  };

  const handleDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((c) => c.id !== categoryToDelete));
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">QUẢN LÝ DANH MỤC</h1>      
      <div className="mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition-colors font-medium"
        >
          THÊM
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                TÊN DANH MỤC
              </th>
              <th scope="col" className="px-6 py-3">
                NHÓM DANH MỤC
              </th>
              <th scope="col" className="px-6 py-3">
                HÀNH ĐỘNG
              </th>
            </tr>
          </thead>
          <tbody>
            {categories
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((category, index) => (
                <tr key={category.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {category.id}
                  </td>
                  <td className="px-6 py-4">
                    {category.name}
                  </td>
                  <td className="px-6 py-4">
                    {category.groups.join(", ")}
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="font-medium text-blue-600 hover:underline"
                      title="Chỉnh sửa"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        setCategoryToDelete(category.id);
                        setShowDeleteModal(true);
                      }}
                      className="font-medium text-red-600 hover:underline"
                      title="Xóa"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {categories.length === 0 && (
        <div className="text-center text-gray-500 mt-4 p-4 bg-gray-50 rounded-lg shadow">
          <p>Chưa có danh mục nào.</p>
        </div>
      )}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalItems={categories.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {showAddModal && <AddCategoryForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} />}
      {editingCategory && (
        <EditCategoryForm
          initialData={editingCategory}
          onSubmit={handleEdit}
          onCancel={() => setEditingCategory(null)}
        />
      )}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa danh mục này?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default CategoryManagement;