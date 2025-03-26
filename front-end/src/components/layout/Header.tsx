import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/services/authService";
import ViewProfileModal from "@/pages/Profile/components/ViewProfileModal";

interface HeaderProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
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
      {
        name: "MÔ TẢ CHƯƠNG TRÌNH ĐÀO TẠO",
        href: "/mo-ta-chuong-trinh-dao-tao",
      },
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
  { name: "QUẢN LÝ DANH MỤC", href: "/quan-ly-danh-muc" },
  { name: "QUẢN LÝ YÊU CẦU LIÊN HỆ", href: "/quan-ly-yeu-cau-lien-he" },
  { name: "QUẢN LÝ BÀI VIẾT", href: "/quan-ly-bai-viet" },
  { name: "QUẢN LÝ TÀI KHOẢN", href: "/quan-ly-tai-khoan" },
  { name: "QUẢN LÝ ẢNH ĐỘNG", href: "/quan-ly-anh-dong" },
];

const Header: React.FC<HeaderProps> = () => {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const adminMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get authentication state from localStorage
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
  const userRole = localStorage.getItem("role")?.toLowerCase();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine active navigation item based on current path
  const getActiveNavItem = () => {
    const currentPath = location.pathname;
    return navigation.find((item) => 
      currentPath === item.href || 
      item.submenu?.some(sub => currentPath === sub.href)
    );
  };

  const [activeNavItem, setActiveNavItem] = useState(getActiveNavItem() || undefined);

  // Close admin menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setAdminMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMobileNavOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileNavOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileNavOpen]);

  // Update active nav item when location changes
  useEffect(() => {
    setActiveNavItem(getActiveNavItem() || undefined);
  }, [location.pathname]);

  // Handle submenu toggling for mobile
  const toggleSubmenu = (itemName: string) => {
    setExpandedSubmenu(expandedSubmenu === itemName ? null : itemName);
  };

  // Close mobile menu when window resizes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileNavOpen) {
        setIsMobileNavOpen(false);
        setExpandedSubmenu(null);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileNavOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileNavOpen]);

  return (
    <header className="font-sans bg-white shadow-md z-50 sticky top-0">
      {/* Top Bar */}
      <div className="bg-[#1a3365] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Admin Menu Button - Only visible for admins */}
          {isAuthenticated && userRole === "admin" && (
            <div className="relative" ref={adminMenuRef}>
              <button
                className="text-white hover:bg-white/10 p-2 rounded transition-colors flex items-center gap-2"
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                aria-expanded={adminMenuOpen}
                aria-label="Menu quản lý"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="hidden sm:inline">Menu Quản lý</span>
              </button>

              {/* Admin Dropdown Menu */}
              {adminMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white shadow-lg rounded-md overflow-hidden z-50">
                  {adminMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-3 text-[#1a3365] hover:bg-[#1a3365]/10 hover:text-[#1a3365] transition-colors font-medium border-b border-gray-100 last:border-0"
                      onClick={() => setAdminMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Right Section - Authentication */}
          <div className="flex items-center gap-1 ml-auto">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center px-2 sm:px-4 py-2 font-medium hover:bg-white/10 rounded transition-colors"
                  aria-label="View profile"
                >
                  <img
                    src="https://i.pravatar.cc/300"
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full object-cover border border-white"
                  />
                  <span className="hidden sm:inline ml-2">{username}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-2 sm:px-4 py-2 font-medium hover:bg-white/10 rounded transition-colors"
                  aria-label="Logout"
                >
                  <span className="hidden sm:inline">ĐĂNG XUẤT</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-2 sm:px-4 py-2 font-medium hover:bg-white/10 rounded transition-colors"
              >
                ĐĂNG NHẬP
              </Link>
            )}
            <Link
              to="/lienheform"
              className="px-2 sm:px-4 py-2 font-medium bg-[#e53935] hover:bg-[#c22e2a] rounded transition-colors whitespace-nowrap"
            >
              LIÊN HỆ
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Navigation */}
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-3 md:p-5">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="h-10 md:h-16 w-auto" aria-label="Home">
              <img
                src="https://cse.tlu.edu.vn/images/logo.png"
                alt="Logo TLU"
                className="h-full w-auto object-contain"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md bg-[#1a3365] text-white focus:outline-none"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-expanded={isMobileNavOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileNavOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`inline-flex items-center px-2 lg:px-4 py-2 text-sm font-medium hover:text-red-600 ${
                    activeNavItem?.name === item.name
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-700 border-b-2 border-transparent"
                  }`}
                  onMouseEnter={() => setActiveNavItem(item)}
                >
                  {item.name}
                </Link>
                {item.submenu && item.submenu.length > 0 && (
                  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" 
             onClick={() => setIsMobileNavOpen(false)}>
          <div 
            ref={mobileMenuRef}
            className="fixed right-0 top-0 w-4/5 max-w-sm h-full bg-white overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="text-lg font-bold text-[#1a3365]">Menu</div>
              <button 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu Items */}
            <nav className="py-2">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      className={`flex-1 block px-4 py-3 text-sm font-medium ${
                        activeNavItem?.name === item.name ? "text-red-600" : "text-gray-700"
                      }`}
                      onClick={() => {
                        setIsMobileNavOpen(false);
                        setExpandedSubmenu(null);
                      }}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && item.submenu.length > 0 && (
                      <button
                        className="px-4 py-3"
                        onClick={() => toggleSubmenu(item.name)}
                        aria-expanded={expandedSubmenu === item.name}
                        aria-label={`Toggle ${item.name} submenu`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 transition-transform ${
                            expandedSubmenu === item.name ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && expandedSubmenu === item.name && (
                    <div className="bg-gray-50 pl-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 border-l-2 border-gray-200"
                          onClick={() => setIsMobileNavOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isModalOpen && (
        <ViewProfileModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
