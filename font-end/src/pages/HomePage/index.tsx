import React, { useState } from "react";

const tabs = [
  {
    id: 1,
    title: "Môi trường giáo dục",
    icon: "",
    content:
      "Trở thành sinh viên của khoa, các bạn có một môi trường giáo dục tốt: Có các phòng học, phòng thí nghiệm, và trang thiết bị tối ưu để hỗ trợ việc giảng dạy và nghiên cứu trong lĩnh vực Công nghệ thông tin; Có các giảng viên giàu kinh nghiệm, có trình độ chuyên môn cao và đam mê trong lĩnh vực Công nghệ thông tin. Các giảng viên cung cấp kiến thức mới nhất, hướng dẫn và hỗ trợ sinh viên trong quá trình học tập; Có chương trình học phong phú và đa dạng, bao gồm cả các môn học lý thuyết và thực hành. Chương trình đáp ứng nhu cầu của ngành Công nghệ thông tin và cập nhật với các xu hướng công nghệ mới; Tạo cơ hội cho sinh viên thực hành và thực tập trong các doanh nghiệp, tổ chức hoặc dự án thực tế; Khuyến khích sự sáng tạo và tư duy độc lập của sinh viên. Cung cấp các hoạt động ngoại khóa, dự án nghiên cứu, và sự hỗ trợ từ cộng đồng sinh viên và giảng viên để thúc đẩy sự phát triển cá nhân và tạo ra những ý tưởng mới; Có mối quan hệ chặt chẽ với các doanh nghiệp trong ngành Công nghệ thông tin, tạo cơ hội cho sinh viên tiếp cận với thực tế công việc, nhận được thông tin về xu hướng công nghệ.",
  },
  {
    id: 2,
    title: "Chương trình đào tạo",
    icon: "",
    content:
      "Chương trình đào tạo các ngành thuộc nhóm ngành CNTT của khoa có các đặc điểm sau: (1) có một nền tảng kiến thức rộng về các lĩnh vực liên quan đến Công nghệ thông tin, bao gồm các học phần cơ bản như lập trình, cơ sở dữ liệu, mạng máy tính, hệ điều hành, thuật toán, và công nghệ phần mềm; (2) có tính thực tiễn và ứng dụng, đảm bảo sinh viên được tiếp cận với các công nghệ và công cụ thực tế trong lĩnh vực Công nghệ thông tin. Thông qua các dự án thực hành, thực tập, và các hoạt động ngoại khóa, sinh viên có cơ hội áp dụng kiến thức vào thực tế, rèn kỹ năng thực hành và tìm hiểu về các xu hướng mới nhất trong ngành; (3) không chỉ trang bị kiến thức cơ bản và lý thuyết, mà chương trình còn giúp sinh viên có cơ hội áp dụng những kiến thức đó vào các dự án thực tế và bài tập thực hành; và (4) có mối liên kết mạnh mẽ với doanh nghiệp và ngành nghề.",
  },
  {
    id: 3,
    title: "Hoạt động sinh viên",
    icon: "️",
    content:
      "Hoạt động sinh viên đóng vai trò quan trọng trong việc phát triển và làm giàu cho trải nghiệm học tập của các sinh viên. Các hoạt động này không chỉ giúp các sinh viên rèn luyện kỹ năng cá nhân, mở rộng kiến thức, mà còn tạo ra những cơ hội giao lưu, hợp tác và xây dựng mạng lưới quan hệ trong cộng đồng sinh viên và xã hội. Đối với hoạt động NCKH, sinh viên có thể tham gia vào các dự án nghiên cứu, làm việc cùng với giảng viên và các nhóm nghiên cứu, khám phá và đóng góp vào lĩnh vực chuyên ngành của mình. Bên cạnh đó, các cuộc thi Olympic được tổ chức hàng năm là cơ hội để sinh viên thể hiện khả năng và tài năng của mình trong các lĩnh vực cụ thể. Ngoài ra, Khoa và Nhà trường tạo điều kiện để sinh viên tham gia các hoạt động cộng đồng như tổ chức các chương trình xã hội, tình nguyện, văn hóa và giáo dục cộng đồng, cùng với các hoạt động nhằm xây dựng tinh thần đoàn kết và tạo ra sân chơi vui tươi cho sinh viên. Sinh viên có thể tham gia các câu lạc bộ học tập, văn nghệ, thể thao trường học hoặc tham gia các cuộc thi về CNTT, cuộc thi văn nghệ, các giải thể thao được Khoa và Nhà trường thường xuyên tổ chức.",
  },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative w-full">
        <img
          src="/banner.jpg"
          alt="Banner"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-white py-3 shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`mx-6 px-4 py-2 font-semibold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              <span className="text-2xl">{tab.icon}</span> {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Hiển thị nội dung theo tab */}
        <div className="p-6 text-gray-500 rounded-lg shadow-md">
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

       {/* Sinh viên tiêu biểu */}
        <section className="mt-10">
          <h2 className="text-lg font-bold border-b-2 border-red-500 pb-2">
            SINH VIÊN TIÊU BIỂU
          </h2>
          <div className="flex mt-2">
          <div className="w-1/4 bg-gray-300 h-12"></div>
          <div className="w-3/4 bg-teal-600 h-12"></div>
          </div>
        </section>

        {/* Đối tác */}
        <section className="mt-10">
          <h2 className="text-lg font-bold border-b-2 border-red-500 pb-2">
            ĐỐI TÁC
          </h2>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-300 h-12"></div>
            <div className="bg-red-600 h-12"></div>
            <div className="bg-blue-500 h-12"></div>
            <div className="bg-teal-600 h-12"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;