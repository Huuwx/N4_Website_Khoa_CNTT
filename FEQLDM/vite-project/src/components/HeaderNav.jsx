import { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import api from "../services/api"; // Import API service
import logo from "../assets/images/logo.jpg";

export default function HeaderNav({ danhMucs }) {
  const [active, setActive] = useState(null);
  const [menuItems, setMenuItems] = useState([]); // Dữ liệu menu từ API

  // Danh sách nhóm danh mục cố định
  const fixedGroups = [
    "Tuyển sinh",
    "Giới thiệu",
    "Doanh nghiệp",
    "Đào tạo",
    "Khoa Công Nghệ",
    "Hợp Tác",
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get("/danh-muc");
        const rawData = response.data.data;

        // Khởi tạo danh sách nhóm danh mục với danh mục con rỗng
        const groupedData = fixedGroups.map((group) => ({
          label: group,
          submenu: [],
        }));

        // Nhóm danh mục con vào nhóm tương ứng
        rawData.forEach((item) => {
          const groupIndex = groupedData.findIndex(
            (g) => g.label === item.nhomDanhMuc
          );
          if (groupIndex !== -1) {
            groupedData[groupIndex].submenu.push(item.tenDanhMuc);
          }
        });

        setMenuItems(groupedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu menu:", error);
      }
    };

    fetchMenuItems();
  }, [danhMucs]);

  return (
    <div className="relative">
      {/* Thanh menu trên */}
      <div className="bg-[#4a6b78] flex items-center justify-between p-3">
        <button className="text-black text-2xl p-2">
          <MenuOutlined />
        </button>

        <div className="flex space-x-6 font-bold">
          <Button className="text-white font-bold ">ADMIN</Button>
          <Button className="text-white font-bold ">ĐĂNG XUẤT</Button>
          <Button className="text-white font-bold  !bg-red-500">LIÊN HỆ</Button>
        </div>
      </div>

      {/* Thanh menu dưới */}
      <div className="flex items-center justify-between px-6 py-2 border-b-2 border-gray-300">
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
        <div className="flex space-x-6 text-black font-bold text-sm">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
            >
              <button
                className={`px-3 py-2 transition ${
                  active === item.label ? "text-red-600" : "text-blue-900"
                }`}
              >
                {item.label}
              </button>

              {/* Gạch đỏ dưới chữ khi hover */}
              {active === item.label && (
                <div className="h-1 bg-red-600 w-full absolute bottom-0 left-0"></div>
              )}

              {/* Hiển thị submenu */}
              {active === item.label && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md w-56">
                  {item.submenu.length > 0 ? (
                    item.submenu.map((sub, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {sub}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-400 italic">
                      (Chưa có danh mục con)
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
