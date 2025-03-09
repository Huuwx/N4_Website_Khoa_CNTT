import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  isAdmin: boolean; // Nhận prop từ MainLayout
}

const navigation = [
  {
    name: "TUYỂN SINH",
    href: "/tuyen-sinh",
    color: "text-red-600",
    submenu: [
      { name: "CHẤT LƯỢNG CAO", href: "/chat-luong-cao" },
      { name: "ĐẠI HỌC", href: "/dai-hoc" },
      { name: "THẠC SĨ", href: "/thac-si" },
      { name: "TIẾN SĨ", href: "/tien-si" },
    ],
  },
  {
    name: "GIỚI THIỆU",
    href: "/gioi-thieu",
    submenu: [
      { name: "TỔNG QUAN VỀ KHOA", href: "/tong-quan-ve-khoa" },
      { name: "CƠ CẤU TỔ CHỨC", href: "/co-cau-to-chuc" },
      { name: "ĐỘI NGŨ GIẢNG VIÊN", href: "/doi-ngu-giang-vien" },
    ],
  },
  {
    name: "DOANH NGHIỆP",
    href: "/doanh-nghiep",
    submenu: [
      { name: "CÁC ĐỐI TÁC", href: "/doi-tac" },
      { name: "THỰC TẬP DOANH NGHIỆP", href: "/thuc-tap-doanh-nghiep" },
      { name: "VIỆC LÀM", href: "/viec-lam" },
      { name: "HỌC BỔNG", href: "/hoc-bong" },
    ],
  },
  {
    name: "ĐÀO TẠO",
    href: "/dao-tao",
    submenu: [
      { name: "QUY CHẾ ĐÀO TẠO", href: "/quy-che-dao-tao" },
      { name: "MÔ TẢ CHƯƠNG TRÌNH ĐÀO TẠO", href: "/mo-ta-chuong-trinh-dao-tao" },
    ],
  },
  {
    name: "KHOA HỌC CÔNG NGHỆ",
    href: "/khoa-hoc-cong-nghe",
    submenu: [
      { name: "CÔNG BỐ KHOA HỌC", href: "/cong-bo-khoa-hoc" },
      { name: "ĐỀ TÀI NGHIÊN CỨU KHOA HỌC", href: "/de-tai-nghien-cuu" },
      { name: "TRIỂN KHAI ỨNG DỤNG", href: "/trien-khai-ung-dung" },
      { name: "CÁC NHÓM NGHIÊN CỨU", href: "/cac-nhom-nghien-cuu" },
      { name: "NCKH SINH VIÊN", href: "/nckh-sinh-vien" },
    ],
  },
  {
    name: "HỢP TÁC ĐỐI NGOẠI",
    href: "/hop-tac-doi-ngoai",
    submenu: [
      { name: "CHƯƠNG TRÌNH HỢP TÁC", href: "/chuong-trinh-hop-tac" },
      { name: "ĐỐI TÁC QUỐC TẾ", href: "/doi-tac-quoc-te" },
    ],
  },
];

const adminNavigation = [
  {
    name: "QUẢN LÝ NGƯỜI DÙNG",
    href: "/admin/users",
  },
  {
    name: "QUẢN LÝ BÀI VIẾT",
    href: "/admin/articles",
  },
  {
    name: "CÀI ĐẶT HỆ THỐNG",
    href: "/admin/settings",
  },
];

const Header: React.FC<HeaderProps> = ({ isAdmin }) => {
  const [activeItem, setActiveItem] = useState("TUYỂN SINH");
  const [hoveredItem, setHoveredItem] = useState("");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = navigation.findIndex((item) => item.name === (hoveredItem || activeItem));
    if (navRefs.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = navRefs.current[activeIndex]!;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [hoveredItem, activeItem]);

  return (
    <header className="font-sans bg-white shadow-md relative z-10 sticky top-0">
      {/* Thanh trên cùng */}
      <div className="bg-[#1a3365] text-white text-sm py-2 px-4 flex justify-end items-center">
        <Link to="/login" className="ml-5 px-4 py-2 rounded hover:bg-white/10 transition-colors">
          ĐĂNG NHẬP
        </Link>
        <Link to="/contact" className="ml-5 px-4 py-2 rounded bg-[#e53935] hover:bg-[#c22e2a] transition-colors">
          LIÊN HỆ
        </Link>
      </div>

      {/* Thanh điều hướng chính */}
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center">
          <img src="/logo_tlu.png" alt="Logo TLU" className="h-16 mr-3" />
          <div>
            <h1 className="text-xl font-semibold text-[#1a3365]">KHOA CÔNG NGHỆ THÔNG TIN</h1>
            <p className="text-xs text-gray-600">Faculty of Computer Science and Engineering - Thuyloi University</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center relative">
          {navigation.map((item, index) => (
            <div
              className="relative group"
              key={item.name}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem("")}
              ref={(el) => (navRefs.current[index] = el)}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `mx-6 font-medium hover:text-red-600 transition-colors ${item.color || "text-[#1a3365]"} ${
                    isActive ? "border-b-2 border-[#1a3365]" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
              {item.submenu.length > 0 && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.name}
                      to={subitem.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                    >
                      {subitem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Hiển thị menu admin nếu là admin */}
          {isAdmin &&
            adminNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="mx-6 font-medium text-red-600 hover:text-red-800 transition-colors"
              >
                {item.name}
              </NavLink>
            ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
