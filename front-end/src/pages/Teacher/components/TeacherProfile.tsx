import { PencilSquareIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

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

interface TeacherProfileProps {
  teacher: Teacher;
  onEdit: () => void;
}

const TeacherProfile = ({ teacher, onEdit }: TeacherProfileProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Thông tin giáo viên</h2>
        <button
          onClick={onEdit}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <PencilSquareIcon className="h-5 w-5 mr-1" />
          Chỉnh sửa
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          {/* Ảnh đại diện và thông tin cơ bản */}
          <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
            <img
              src={teacher.avatar}
              alt={`${teacher.firstName} ${teacher.lastName}`}
              className="h-32 w-32 rounded-full object-cover border-2 border-gray-200 mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900 text-center">{`${teacher.firstName} ${teacher.lastName}`}</h3>
            <p className="text-gray-600 text-center mb-2">{teacher.academicTitle}</p>
            
            {/* Thông tin liên hệ */}
            <div className="mt-4 space-y-2 w-full max-w-xs">
              {teacher.showEmail && (
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm">{teacher.email}</span>
                </div>
              )}
              {teacher.showPhone && (
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm">{teacher.phone}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Thông tin chi tiết */}
          <div className="md:w-2/3 md:pl-8 md:border-l md:border-gray-200">
            <div className="mb-6">
              <h4 className="text-md font-semibold text-gray-800 mb-2">Thông tin cá nhân</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Họ và tên</p>
                  <p className="text-gray-800">{`${teacher.firstName} ${teacher.lastName}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Giới tính</p>
                  <p className="text-gray-800">{teacher.gender}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-md font-semibold text-gray-800 mb-2">Công tác</h4>
              <p className="text-gray-800">{teacher.department}</p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-2">Lĩnh vực nghiên cứu</h4>
              <ul className="list-disc list-inside text-gray-800">
                {teacher.researchFields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;