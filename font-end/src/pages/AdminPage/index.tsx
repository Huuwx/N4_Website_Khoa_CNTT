import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const tabs = [
  {
    id: 1,
    title: "Môi trường giáo dục",
    content:
      "Trở thành sinh viên của khoa, các bạn có một môi trường giáo dục tốt: Có các phòng học, phòng thí nghiệm, và trang thiết bị tối ưu...",
  },
  {
    id: 2,
    title: "Chương trình đào tạo",
    content:
      "Chương trình đào tạo các ngành thuộc nhóm ngành CNTT của khoa có các đặc điểm sau: (1) có một nền tảng kiến thức rộng...",
  },
  {
    id: 3,
    title: "Hoạt động sinh viên",
    content:
      "Hoạt động sinh viên đóng vai trò quan trọng trong việc phát triển và làm giàu cho trải nghiệm học tập của các sinh viên...",
  },
];

const AdminPage = () => {
  // ✅ Thêm kiểu dữ liệu <number> để tránh lỗi TypeScript
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Nội dung chính */}
      <main className="flex-1 p-6">
        {/* Banner */}
        <div className="relative w-full h-60 bg-gray-300 flex items-center justify-center">
          <h2 className="text-3xl font-bold">Trang Quản Trị Admin</h2>
          <Outlet/>
        </div>

        {/* Tabs */}
        <div className="flex mt-6 space-x-4 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg font-semibold ${
                activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Nội dung hiển thị */}
        <div className="mt-4 p-6 bg-white shadow rounded-lg">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>

        {/* Thông báo */}
        <section className="mt-10">
          <h2 className="text-lg font-bold border-b-2 border-red-500 pb-2">
            THÔNG BÁO
          </h2>
          <div className="h-32 flex items-center justify-center text-gray-500">
            Đang cập nhật...
          </div>
        </section>

        {/* Tin tức & Sự kiện */}
        <section className="mt-10">
          <h2 className="text-lg font-bold border-b-2 border-red-500 pb-2">
            TIN TỨC & SỰ KIỆN
          </h2>
          <div className="h-32 flex items-center justify-center text-gray-500">
            Đang cập nhật...
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
