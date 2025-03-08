import { useState, useEffect } from 'react';
import TeacherProfile from './components/TeacherProfile';
import TeacherDetailsEdit from './components/TeacherDetailsEdit';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Toast from '@/components/Toast';

// Định nghĩa kiểu dữ liệu cho giáo viên
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

const TeacherPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Giả lập dữ liệu giáo viên
  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API ở đây
    setTimeout(() => {
      setTeachers([
        {
          id: 1,
          firstName: 'Cù',
          lastName: 'Viết Dũng',
          gender: 'Nam',
          email: 'dungcv@tlu.edu.vn',
          phone: '0123456789',
          department: 'Bộ môn Công nghệ phần mềm',
          academicTitle: 'Tiến sĩ',
          researchFields: ['Xử lý ảnh', 'Trí tuệ nhân tạo'],
          avatar: 'https://via.placeholder.com/150',
          showEmail: true,
          showPhone: true
        },
        {
          id: 2,
          firstName: 'Nguyễn',
          lastName: 'Thị Hương',
          gender: 'Nữ',
          email: 'huongnt@tlu.edu.vn',
          phone: '0987654321',
          department: 'Bộ môn Khoa học máy tính',
          academicTitle: 'Phó Giáo sư',
          researchFields: ['Học máy', 'Khai phá dữ liệu'],
          avatar: 'https://via.placeholder.com/150',
          showEmail: true,
          showPhone: false
        },
        {
          id: 3,
          firstName: 'Trần',
          lastName: 'Văn Minh',
          gender: 'Nam',
          email: 'minhtv@tlu.edu.vn',
          phone: '0369852147',
          department: 'Bộ môn Hệ thống thông tin',
          academicTitle: 'Thạc sĩ',
          researchFields: ['Cơ sở dữ liệu', 'Phân tích hệ thống'],
          avatar: 'https://via.placeholder.com/150',
          showEmail: false,
          showPhone: true
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  // Hàm hiển thị toast
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  // Hàm đóng toast
  const closeToast = () => {
    setToast(null);
  };
  // Lọc giáo viên dựa trên từ khóa tìm kiếm
  const filteredTeachers = teachers.filter(teacher => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const academicTitle = teacher.academicTitle.toLowerCase();
    const department = teacher.department.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    
    return fullName.includes(searchLower) || 
           academicTitle.includes(searchLower) || 
           department.includes(searchLower);
  });

  // Xử lý khi chọn giáo viên để xem chi tiết
  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsEditing(false);
  };

  // Xử lý khi cập nhật thông tin giáo viên
  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    setTeachers(teachers.map(t => 
      t.id === updatedTeacher.id ? updatedTeacher : t
    ));
    setSelectedTeacher(updatedTeacher);
    setIsEditing(false);
    showToast('Cập nhật thông tin giáo viên thành công!', 'success');
  };

  // Xử lý khi thêm giáo viên mới
  const handleAddTeacher = () => {
    const newTeacher: Teacher = {
      id: Math.max(...teachers.map(t => t.id), 0) + 1,
      firstName: '',
      lastName: '',
      gender: 'Nam',
      email: '',
      phone: '',
      department: '',
      academicTitle: '',
      researchFields: [],
      avatar: 'https://via.placeholder.com/150',
      showEmail: true,
      showPhone: true
    };
    
    setSelectedTeacher(newTeacher);
    setIsEditing(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Danh sách giáo viên</h1>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm giáo viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              onClick={handleAddTeacher}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Thêm giáo viên
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Danh sách giáo viên */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Danh sách giáo viên</h2>
            </div>
            
            {isLoading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredTeachers.length > 0 ? (
              <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredTeachers.map(teacher => (
                  <li 
                    key={teacher.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedTeacher?.id === teacher.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleSelectTeacher(teacher)}
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={teacher.avatar} 
                        alt={`${teacher.firstName} ${teacher.lastName}`}
                        className="h-12 w-12 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{`${teacher.academicTitle}. ${teacher.firstName} ${teacher.lastName}`}</h3>
                        <p className="text-xs text-gray-500">{teacher.department}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">Không tìm thấy giáo viên nào phù hợp với từ khóa tìm kiếm.</p>
              </div>
            )}
          </div>

          {/* Chi tiết giáo viên */}
          <div className="md:col-span-2">
            {selectedTeacher ? (
              isEditing ? (
                <TeacherDetailsEdit 
                  teacher={selectedTeacher}
                  onSave={handleUpdateTeacher}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <TeacherProfile 
                  teacher={selectedTeacher} 
                  onEdit={() => setIsEditing(true)}
                />
              )
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn giáo viên để xem chi tiết</h3>
                <p className="text-gray-500">Chọn một giáo viên từ danh sách hoặc thêm giáo viên mới.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    )}
    </div>
  );
};

export default TeacherPage;