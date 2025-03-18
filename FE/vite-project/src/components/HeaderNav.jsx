import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import logo from "../assets/images/logo.jpg";
export default function HeaderNav() {
  return (
    <div className="relative">
      {/* Thanh menu trên */}
      <div className="bg-[#4a6b78] flex items-center justify-between p-3">
        {/* Icon menu */}
        <button className="text-black text-2xl p-2">
          <MenuOutlined />
        </button>

        {/* Các mục điều hướng */}
        <div className="flex space-x-6 text-black font-bold">
          <Button className=" text-white font-bold  " >ADMIN</Button>
          <Button className=" text-white font-bold ">ĐĂNG XUẤT</Button>
          <Button className=" text-white font-bold ">LIÊN HỆ</Button>
        </div>
      </div>

      {/* Thanh menu dưới */}
      <div className="flex items-center justify-between px-6 py-2 border-b-2 border-gray-300">
  {/* Logo và văn bản bên cạnh */}
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

  {/* Menu liên kết */}
  <div className="flex space-x-6 text-black font-bold text-sm">
    <button className="hover:text-red-600 cursor-pointer">TUYỂN SINH</button>
    <button className="hover:text-red-600 cursor-pointer">GIỚI THIỆU</button>
    <button className="hover:text-red-600 cursor-pointer">DOANH NGHIỆP</button>
    <button className="hover:text-red-600 cursor-pointer">ĐÀO TẠO</button>
    <button className="hover:text-red-600 cursor-pointer">KHOA CÔNG NGHỆ</button>
    <button className="hover:text-red-600 cursor-pointer">HỢP TÁC ĐỐI NGOẠI</button>
  </div>
</div>
    </div>
  );
}
