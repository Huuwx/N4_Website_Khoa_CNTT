import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ViewProfileModal from "@/pages/Profile/components/ViewProfileModal";

interface HeaderProps {
    isLoggedIn: boolean;
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

const adminMenuItems = [
    {
        name: "QUẢN LÝ DANH MỤC",
        href: "/categories",
    },
    {
        name: "QUẢN LÝ YÊU CẦU LIÊN HỆ",
        href: "/quan-ly-yeu-cau-lien-he",
    },
    {
        name: "QUẢN LÝ BÀI VIẾT",
        href: "/articles",
    },
    {
        name: "QUẢN LÝ TÀI KHOẢN",
        href: "/quan-ly-tai-khoan",
    },
    {
        name: "QUẢN LÝ ẢNH ĐỘNG",
        href: "/images",
    },
];

const Header: React.FC<HeaderProps> = ({ isLoggedIn = true }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const getActiveNavItem = () => {
        const currentPath = location.pathname;
        return navigation.find((item) => item.href === currentPath);
    };

    const [activeNavItem, setActiveNavItem] = useState(getActiveNavItem());

    useEffect(() => {
        setActiveNavItem(getActiveNavItem());
    }, [location.pathname]);

    useEffect(() => {
      const navItem = getActiveNavItem();
      setActiveNavItem(navItem || navigation[0]); // Set to "TUYỂN SINH" if no match
  }, [location.pathname]);

  const handleMouseLeave = () => {
      setActiveNavItem(navigation[0]); // Reset to "TUYỂN SINH"
  };

    return (
        <header className="font-sans bg-white shadow-md z-10 sticky top-0">
            <div className="bg-[#1a3365] text-white py-2 px-4 flex justify-between items-center">
                <div className="flex items-center relative" ref={menuRef}>
                    <button
                        className="text-white hover:bg-white/10 p-2 rounded transition-colors"
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        <div className="flex flex-col space-y-1">
                            <div className="w-6 h-0.5 bg-white"></div>
                            <div className="w-6 h-0.5 bg-white"></div>
                            <div className="w-6 h-0.5 bg-white"></div>
                        </div>
                    </button>

                    {menuOpen && isLoggedIn && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg z-50">
                            {adminMenuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-4 py-3 text-[#1a3365] hover:bg-[#1a3365] hover:text-white transition-colors font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Logo in center for mobile, hidden on desktop */}
                <div className="md:hidden">
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-DH-Thuy-Loi.png"
                        alt="Logo TLU"
                        className="h-8"
                    />
                </div>

                {/* Login and Contact buttons on the right */}
                <div className="flex items-center">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center px-4 py-2 font-medium hover:bg-white/10 transition-colors"
                            >
                                <img
                                    src="https://i.pravatar.cc/300"
                                    alt="User Avatar"
                                    className="w-6 h-6 rounded-full mr-2 object-cover border border-white"
                                />
                                CỬ VIẾT DŨNG
                            </button>
                            <Link
                                to="/logout"
                                className="px-4 py-2 font-medium hover:bg-white/10 transition-colors"
                            >
                                ĐĂNG XUẤT
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 font-medium hover:bg-white/10 transition-colors"
                        >
                            ĐĂNG NHẬP
                        </Link>
                    )}
                    <Link
                        to="/contact"
                        className="px-4 py-2 font-medium bg-[#e53935] hover:bg-[#c22e2a] transition-colors"
                    >
                        LIÊN HỆ
                    </Link>
                </div>
            </div>

            <div className="flex justify-between items-center p-5">
                <div className="flex items-center">
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-DH-Thuy-Loi.png"
                        alt="Logo TLU"
                        className="h-16 mr-3"
                    />
                    <div>
                        <h1 className="text-xl font-semibold text-[#1a3365]">
                            KHOA CÔNG NGHỆ THÔNG TIN
                        </h1>
                        <p className="text-xs text-gray-600">
                            Faculty of Computer Science and Engineering - Thuyloi University
                        </p>
                    </div>
                </div>

                {/* Navigation Menu on the right */}
              <nav className="flex items-center space-x-4" onMouseLeave={handleMouseLeave}>
                  {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={`inline-flex items-center px-6 py-3 text-sm font-medium text-gray-500 hover:text-red-600 ${
                    activeNavItem?.name === item.name
                    ? "text-red-600 border-b-2 border-red-600"
                    : "border-b-2 border-transparent"
                    }`}
                    onMouseEnter={() => setActiveNavItem(item)}>
                    {item.name}
                      </Link>
                      {item.submenu && item.submenu.length > 0 && (
                      <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-3 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                      {item.submenu.map((subItem) => (
                      <Link
                  key={subItem.name}
                  to={subItem.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {subItem.name}
                </Link>
                ))}
                </div>
               )}
              </div>
              ))}
              </nav>
            </div>
            {/* Modal for editing profile */}
            {isModalOpen && (
                <ViewProfileModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={() => {
                        /* Handle submit logic here */ setIsModalOpen(false);
                    }}
                />
            )}
        </header>
    );
};

export default Header;