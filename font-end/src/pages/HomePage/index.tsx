import { Link } from 'react-router-dom';
// import HeroSection from './components/HeroSection';
// import NewsSection from './components/NewsSection';
// import EventsSection from './components/EventsSection';

const HomePage = () => {
  return (
    <div>
      {/* <HeroSection /> */}
      
      {/* Intro section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Chào mừng đến với CSE University</h2>
            <p className="max-w-3xl mx-auto text-gray-600">
              Chúng tôi cung cấp môi trường học tập xuất sắc với các chương trình đào tạo chất lượng cao, 
              đội ngũ giảng viên giàu kinh nghiệm và cơ sở vật chất hiện đại.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">Đào tạo chất lượng</h3>
              <p className="text-gray-600 mb-4">Các chương trình đào tạo được thiết kế phù hợp với nhu cầu của xã hội và doanh nghiệp.</p>
              <Link to="/academics" className="text-primary hover:underline font-medium">
                Tìm hiểu thêm →
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">Nghiên cứu khoa học</h3>
              <p className="text-gray-600 mb-4">Thúc đẩy nghiên cứu và đổi mới sáng tạo trong nhiều lĩnh vực khoa học công nghệ.</p>
              <Link to="/research" className="text-primary hover:underline font-medium">
                Tìm hiểu thêm →
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">Hợp tác quốc tế</h3>
              <p className="text-gray-600 mb-4">Phát triển mạng lưới hợp tác với các trường đại học và tổ chức quốc tế.</p>
              <Link to="/international" className="text-primary hover:underline font-medium">
                Tìm hiểu thêm →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest news and events */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* <NewsSection />
            <EventsSection /> */}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Bắt đầu hành trình học tập của bạn</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Đăng ký ngay hôm nay để trở thành một phần của cộng đồng CSE University 
            và khám phá cơ hội học tập, nghiên cứu và phát triển bản thân.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/admissions" className="btn bg-white text-primary hover:bg-gray-100">
              Tuyển sinh
            </Link>
            <Link to="/contact" className="btn border border-white hover:bg-primary-dark">
              Liên hệ với chúng tôi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
