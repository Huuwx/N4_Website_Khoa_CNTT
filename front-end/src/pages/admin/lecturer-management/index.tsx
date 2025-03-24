import React, { useState, useEffect } from 'react';
import {
  Lecturer,
  getLecturers,
  createLecturer,
  updateLecturer,
  deleteLecturer,
  toggleLecturerStatus,
  CreateLecturerRequest,
  UpdateLecturerRequest,
} from '@/services/lecturerAccountService';
import LecturerModal from './components/LecturerModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const AdminPage = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | undefined>();
  const [isEdit, setIsEdit] = useState(false);

  const pageSize = 10;

  const fetchLecturers = async () => {
    setIsLoading(true);
    try {
      const response = await getLecturers(currentPage, pageSize);
      if (response.status === "SUCCESS" && Array.isArray(response.data)) {
        const data = response.data;
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          const filtered = data.filter(lecturer => 
            lecturer.username.toLowerCase().includes(searchLower) ||
            (lecturer.email?.toLowerCase().includes(searchLower) ?? false) ||
            (lecturer.fullName?.toLowerCase().includes(searchLower) ?? false) ||
            (lecturer.phoneNumber?.includes(searchTerm) ?? false)
          );
          setLecturers(filtered);
          setTotalElements(filtered.length);
        } else {
          setLecturers(data);
          setTotalElements(data.length);
        }
      } else {
        setLecturers([]);
        setTotalElements(0);
      }
    } catch (error) {
      console.error('Error fetching lecturers:', error);
      setLecturers([]);
      setTotalElements(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
    fetchLecturers();
  }, [searchTerm]);

  const handleOpenModal = (lecturer?: Lecturer) => {
    setSelectedLecturer(lecturer);
    setIsEdit(!!lecturer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLecturer(undefined);
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: CreateLecturerRequest | UpdateLecturerRequest) => {
    try {
      if (isEdit && selectedLecturer) {
        await updateLecturer(selectedLecturer.id, data as UpdateLecturerRequest);
      } else {
        await createLecturer(data as CreateLecturerRequest);
      }
      handleCloseModal();
      fetchLecturers();
    } catch (error) {
      console.error('Error saving lecturer:', error);
    }
  };

  const handleDelete = async (taiKhoan: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giảng viên này?')) {
      try {
        await deleteLecturer(taiKhoan);
        fetchLecturers();
      } catch (error) {
        console.error('Error deleting lecturer:', error);
      }
    }
  };

  const handleToggleStatus = async (taiKhoan: string) => {
    try {
      await toggleLecturerStatus(taiKhoan);
      fetchLecturers();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const totalPages = Math.ceil(totalElements / pageSize);

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">Quản lý tài khoản giảng viên</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Tìm kiếm theo tài khoản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded"
            />
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Thêm giảng viên
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tài khoản
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SĐT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : lecturers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                lecturers.map((lecturer) => (
                  <tr key={lecturer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{lecturer.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lecturer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lecturer.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{lecturer.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          lecturer.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {lecturer.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleOpenModal(lecturer)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(lecturer.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => handleToggleStatus(lecturer.id)}
                        className={`${
                          lecturer.status === 'ACTIVE'
                            ? 'text-red-600 hover:text-red-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {lecturer.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md disabled:opacity-50"
            >
              Trước
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md disabled:opacity-50"
            >
              Sau
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">{currentPage * pageSize + 1}</span> đến{' '}
                <span className="font-medium">
                  {Math.min((currentPage + 1) * pageSize, totalElements)}
                </span>{' '}
                trong <span className="font-medium">{totalElements}</span> kết quả
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <LecturerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        lecturer={selectedLecturer}
        isEdit={isEdit}
      />
    </div>
  );
};

export default AdminPage;
