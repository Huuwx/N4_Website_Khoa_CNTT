import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LecturerProfileResponse } from '@/types/lecturer';
import { lecturerProfileService } from '@/services/lecturerProfileService';

const LecturerList = () => {
  const [lecturers, setLecturers] = useState<LecturerProfileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await lecturerProfileService.getAllLecturers();
        setLecturers(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
        setError('Failed to fetch lecturers');
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-[#1a3365] mb-8">
        ĐỘI NGŨ GIẢNG VIÊN
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lecturers.map((lecturer) => (
          <Link
            key={lecturer.id}
            to={`/doi-ngu-giang-vien/${lecturer.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img
                src={lecturer.avatarUrl || 'https://i.pravatar.cc/300'}
                alt={lecturer.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-600 mb-1">
                {lecturer.position}
              </div>
              <h2 className="text-xl font-semibold text-[#1a3365] mb-2">
                {`${lecturer.academicDegree} ${lecturer.fullName}`}
              </h2>
              <div className="text-gray-600 mb-1">
                {lecturer.faculty}
              </div>
              {lecturer.showPhoneNumber && (
                <div className="text-gray-600 mb-1">
                  {lecturer.phoneNumber}
                </div>
              )}
              <div className="text-gray-600">
                {lecturer.email}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LecturerList;