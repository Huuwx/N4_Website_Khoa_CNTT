import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLecturerById } from '@/services/lecturerAccountService';
import { Lecturer } from '@/services/lecturerAccountService';

const LecturerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLecturerDetail = async () => {
      try {
        if (!id) return;
        const data = await getLecturerById(id);
        setLecturer(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lecturer details:', error);
        setError('Failed to fetch lecturer details');
        setLoading(false);
      }
    };

    fetchLecturerDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !lecturer) {
    return (
      <div className="text-center text-red-600 py-8">
        {error || 'Lecturer not found'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/doi-ngu-giang-vien"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Quay lại danh sách
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            {lecturer.showAvatar && (
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                <img
                  src={lecturer.avatarUrl || 'https://i.pravatar.cc/300'}
                  alt={lecturer.fullName || 'Giảng viên'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {lecturer.showFullName && (
              <h1 className="text-2xl font-bold text-center text-[#1a3365] mb-2">
                {`${lecturer.showAcademicDegree && lecturer.academicDegree ? lecturer.academicDegree + ' ' : ''}${lecturer.fullName}`}
              </h1>
            )}
            {lecturer.showPosition && (
              <p className="text-lg text-gray-600 text-center mb-4">{lecturer.position}</p>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lecturer.showDepartment && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Bộ môn</h3>
                  <p className="text-gray-600">{lecturer.department}</p>
                </div>
              )}

              {lecturer.showFaculty && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Khoa</h3>
                  <p className="text-gray-600">{lecturer.faculty}</p>
                </div>
              )}

              {lecturer.email && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Email</h3>
                  <p className="text-gray-600">{lecturer.email}</p>
                </div>
              )}

              {lecturer.showPhoneNumber && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Số điện thoại</h3>
                  <p className="text-gray-600">{lecturer.phoneNumber}</p>
                </div>
              )}

              {lecturer.showAddress && (
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Địa chỉ</h3>
                  <p className="text-gray-600">{lecturer.address}</p>
                </div>
              )}

              {lecturer.showResearchFields && lecturer.researchFields && lecturer.researchFields.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Lĩnh vực nghiên cứu</h3>
                  <div className="flex flex-wrap gap-2">
                    {lecturer.researchFields?.map((field, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDetail;
