import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a1f76] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap">
          {/* Column 1 */}
          <div className="w-full md:w-1/4 px-4">
            <div className="mb-4 flex items-center">
              <img
                src="/logo_tlu.png"
                alt="Khoa CNTT Logo"
                className="w-10 h-10"
              />
              <h3 className="ml-3 text-lg" style={{textTransform: 'initial'}}>Khoa Công nghệ thông tin</h3>
            </div>
            <p className="text-sm">
              Nhà C1<br />
              Trường Đại học Thủy lợi<br />
              175 Tây Sơn, Đống Đa, Hà Nội
            </p>
            <p className="mt-4 text-sm">
              (+84)-024 3 5632211<br /><br />
              <a href="mailto:vpkcntt@tlu.edu.vn">vpkcntt@tlu.edu.vn</a>
            </p>
            <div className="border-b border-gray-500 my-4"></div>
          </div>

          {/* Column 2 */}
          <div className="w-full md:w-1/4 px-4">
            <h3 className="text-lg font-semibold mb-4">Môi trường giáo dục</h3>
            <ul className="space-y-2">
              <li><Link to="/dao-tao" className="text-sm">Đào tạo</Link></li>
              <li><Link to="/mo-hinh-dao-tao" className="text-sm">Mô hình đào tạo</Link></li>
              <li><Link to="/dao-tao-dai-hoc" className="text-sm">Đào tạo đại học</Link></li>
              <li><Link to="/dinh-huong-nganh-nghe" className="text-sm">Định hướng ngành nghề</Link></li>
              <li><Link to="/dao-tao-sau-dai-hoc" className="text-sm">Đào tạo sau đại học</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full md:w-1/4 px-4">
            <h3 className="text-lg font-semibold mb-4">Khoa học công nghệ</h3>
            <ul className="space-y-2">
              <li><Link to="/nghien-cuu-khoa-hoc" className="text-sm">Nghiên cứu khoa học</Link></li>
              <li><Link to="/cong-trinh-cong-bo" className="text-sm">Công trình công bố</Link></li>
              <li><Link to="/cac-de-tai-du-an" className="text-sm">Các đề tài dự án</Link></li>
              <li><Link to="/cac-phong-thi-nghiem" className="text-sm">Các phòng thí nghiệm</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="w-full md:w-1/4 px-4">
            <h3 className="text-lg font-semibold mb-4">Cơ cấu tổ chức</h3>
            <ul className="space-y-2">
              <li><Link to="/cong-nghe-phan-mem" className="text-sm">Công nghệ phần mềm</Link></li>
              <li><Link to="/he-thong-thong-tin" className="text-sm">Hệ thống thông tin</Link></li>
              <li><Link to="/mang-va-an-toan-thong-tin" className="text-sm">Mạng và an toàn thông tin</Link></li>
              <li><Link to="/tin-hoc-va-ky-thuat-tinh-toan" className="text-sm">Tin học và kỹ thuật tính toán</Link></li>
              <li><Link to="/tri-tue-nhan-tao" className="text-sm">Trí tuệ nhân tạo</Link></li>
              <li><Link to="/toan-hoc" className="text-sm">Toán học</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;