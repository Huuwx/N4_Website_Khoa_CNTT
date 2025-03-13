import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import logo from "../assets/images/logo.jpg";

export default function HeaderNav() {
  const [active, setActive] = useState(null);

  const menuItems = [
    { label: "Tuyển sinh", submenu: ["Thông báo", "Hướng dẫn", "Lịch tuyển sinh"] },
    { label: "Giới thiệu", submenu: ["Về chúng tôi", "Lịch sử phát triển", "Sứ mệnh & Tầm nhìn"] },
    { label: "Doanh nghiệp", submenu: ["Hợp tác đào tạo", "Việc làm", "Thực tập"] },
    { label: "Đào tạo", submenu: ["Ngành học", "Chương trình đào tạo", "Lịch học"] },
    { label: "Khoa Công Nghệ", submenu: ["Giảng viên", "Nghiên cứu khoa học", "Dự án"] },
    { label: "Hợp Tác", submenu: ["Đối tác quốc tế", "Chương trình trao đổi", "Học bổng"] },
  ];

  return (
    <div className="relative w-full">
      {/* Thanh menu trên */}
      <div className="bg-[#4a6b78] flex items-center justify-between px-6 py-3">
        <button className="text-white text-2xl">
          <MenuOutlined />
        </button>

        <div className="flex space-x-4">
          <Button className="border border-black text-black font-bold bg-white">ADMIN</Button>
          <Button className="border border-black text-black font-bold bg-white">ĐĂNG XUẤT</Button>
          <Button className="border border-black text-black font-bold bg-white">LIÊN HỆ</Button>
        </div>
      </div>

      {/* Thanh menu dưới */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Logo và tiêu đề */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-20 h-20 mr-4" />
          <div>
            <span className="text-lg font-bold text-[#4a6b78] uppercase block">
              KHOA CÔNG NGHỆ THÔNG TIN
            </span>
            <span className="text-base font-bold text-[#4a6b78]">
              FACULTY OF COMPUTER SCIENCE AND ENGINEERING THUYLOI UNIVERSITY
            </span>
          </div>
        </div>

        {/* Menu chính */}
        <div className="flex space-x-6 text-blue-900 font-bold text-base">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
            >
              <button className="px-3 py-2 hover:text-red-600">
                {item.label}
              </button>

              {/* Gạch đỏ dưới khi hover */}
              <div className={`h-1 bg-red-600 w-full absolute bottom-0 left-0 transition-transform duration-200 ${active === item.label ? "scale-x-100" : "scale-x-0"}`}></div>

              {/* Dropdown submenu */}
              {active === item.label && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md w-56 z-50">
                  {item.submenu.map((sub, i) => (
                    <div key={i} className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
