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
      { id: "1", name: "Tuyển Sinh 2025", groups: ["Tuyển sinh"] },
      { id: "2", name: "Giới Thiệu Trường", groups: ["Học thuật"] },
      { id: "3", name: "Hợp Tác Quốc Tế", groups: ["Doanh nghiệp"] },
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">QUẢN LÝ DANH MỤC</h1>
      <button onClick={() => setShowAddModal(true)} className="bg-green-500 text-white px-4 py-2 mb-4">
        THÊM
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-center">STT</th>
            <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-center">TÊN DANH MỤC</th>
            <th className="border border-gray-300 px-4 py-2 text-center">NHÓM DANH MỤC</th>
            <th className="border border-gray-300 px-4 py-2 text-center">HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((category, index) => (
            <tr key={category.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{category.id}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{category.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{category.groups.join(", ")}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button onClick={() => setEditingCategory(category)} className="text-blue-500 mr-2">
                  ✏️
                </button>
                <button
                  onClick={() => {
                    setCategoryToDelete(category.id);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-500"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalItems={categories.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

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