import React from "react";

const TeacherProfile: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Main content area */}
      <div className="w-full md:w-3/4">
        <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden bg-white">
          {/* Profile header with image and title */}
          <div className="flex flex-col sm:flex-row p-4 border-b border-gray-200">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                <img 
                  src="https://i.pravatar.cc/300" 
                  alt="TS. Cử Viết Dũng" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 text-white text-xs text-center py-1">
                  Tiến sĩ - Quản trị
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-gray-900">TS. CÙ VIẾT DŨNG</h1>
              <h2 className="text-xl font-bold text-gray-700">GIẢNG VIÊN</h2>
            </div>
          </div>
          
          {/* Profile details */}
          <div className="p-6">
            <div className="mb-6 space-y-1">
              <p className="font-bold uppercase">HỌC HÀM: HỌC VỊ TIẾN SĨ</p>
              <p className="font-bold uppercase">KHOA: CÔNG NGHỆ THÔNG TIN</p>
              <p className="font-bold uppercase">BỘ MÔN: CÔNG NGHỆ PHẦN MỀM</p>
              <p className="font-bold uppercase">SĐT: 0987654321</p>
              <p className="font-bold uppercase">EMAIL: vietdung@tlu.edu.vn</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold uppercase text-lg border-b-2 border-gray-300 pb-1 mb-3">LĨNH VỰC NGHIÊN CỨU:</h3>
              <ul className="list-disc pl-8">
                <li className="font-bold mb-2">XỬ LÝ ẢNH</li>
                <li className="font-bold mb-2">TRÍ TUỆ NHÂN TẠO</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-200 rounded-md min-h-[300px]">
        {/* Sidebar content can be added here */}
      </div>
    </div>
  );
};

export default TeacherProfile;
