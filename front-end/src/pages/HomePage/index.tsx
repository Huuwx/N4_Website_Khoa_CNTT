import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { sliderService, SliderResponse } from "@/services/sliderService";
import articleService, { Article } from "@/services/articleService";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const tabs = [
  {
    id: 1,
    title: "Môi trường giáo dục",
    icon: "🏫",
    content:
      "Hoạt động sinh viên đóng vai trò quan trọng trong việc phát triển và làm giàu cho trải nghiệm học tập của các sinh viên. Các hoạt động này không chỉ giúp các sinh viên rèn luyện kỹ năng cá nhân, mở rộng kiến thức, mà còn tạo ra những cơ hội giao lưu, hợp tác và xây dựng mạng lưới quan hệ trong cộng đồng sinh viên và xã hội. Đối với hoạt động NCKH, sinh viên có thể tham gia vào các dự án nghiên cứu, làm việc cùng với giảng viên và các nhóm nghiên cứu, khám phá và đóng góp vào lĩnh vực chuyên ngành của mình. Bên cạnh đó, các cuộc thi Olympic được tổ chức hàng năm là cơ hội để sinh viên thể hiện khả năng và tài năng của mình trong các lĩnh vực cụ thể. Ngoài ra, Khoa và Nhà trường tạo điều kiện để sinh viên tham gia các hoạt động cộng đồng như tổ chức các chương trình xã hội, tình nguyện, văn hóa và giáo dục cộng đồng, cùng với các hoạt động nhằm xây dựng tinh thần đoàn kết và tạo ra sân chơi vui tươi cho sinh viên. Sinh viên có thể tham gia các câu lạc bộ học tập, văn nghệ, thể thao trường học hoặc tham gia các cuộc thi về CNTT, cuộc thi văn nghệ, các giải thể thao được Khoa và Nhà trường thường xuyên tổ chức.",
  },
  {
    id: 2,
    title: "Chương trình đào tạo",
    icon: "🎓",
    content:
      "Chương trình đào tạo các ngành thuộc nhóm ngành CNTT của khoa có các đặc điểm sau: (1) có một nền tảng kiến thức rộng về các lĩnh vực liên quan đến Công nghệ thông tin, bao gồm các học phần cơ bản như lập trình, cơ sở dữ liệu, mạng máy tính, hệ điều hành, thuật toán, và công nghệ phần mềm; (2) có tính thực tiễn và ứng dụng, đảm bảo sinh viên được tiếp cận với các công nghệ và công cụ thực tế trong lĩnh vực Công nghệ thông tin. Thông qua các dự án thực hành, thực tập, và các hoạt động ngoại khóa, sinh viên có cơ hội áp dụng kiến thức vào thực tế, rèn kỹ năng thực hành và tìm hiểu về các xu hướng mới nhất trong ngành; (3) không chỉ trang bị kiến thức cơ bản và lý thuyết, mà chương trình còn giúp sinh viên có cơ hội áp dụng những kiến thức đó vào các dự án thực tế và bài tập thực hành; và (4) có mối liên kết mạnh mẽ với doanh nghiệp và ngành nghề.",
  },
  {
    id: 3,
    title: "Hoạt động sinh viên",
    icon: "🏢",
    content:
      "Hoạt động sinh viên đóng vai trò quan trọng trong việc phát triển và làm giàu cho trải nghiệm học tập của các sinh viên. Các hoạt động này không chỉ giúp các sinh viên rèn luyện kỹ năng cá nhân, mở rộng kiến thức, mà còn tạo ra những cơ hội giao lưu, hợp tác và xây dựng mạng lưới quan hệ trong cộng đồng sinh viên và xã hội. Đối với hoạt động NCKH, sinh viên có thể tham gia vào các dự án nghiên cứu, làm việc cùng với giảng viên và các nhóm nghiên cứu, khám phá và đóng góp vào lĩnh vực chuyên ngành của mình. Bên cạnh đó, các cuộc thi Olympic được tổ chức hàng năm là cơ hội để sinh viên thể hiện khả năng và tài năng của mình trong các lĩnh vực cụ thể. Ngoài ra, Khoa và Nhà trường tạo điều kiện để sinh viên tham gia các hoạt động cộng đồng như tổ chức các chương trình xã hội, tình nguyện, văn hóa và giáo dục cộng đồng, cùng với các hoạt động nhằm xây dựng tinh thần đoàn kết và tạo ra sân chơi vui tươi cho sinh viên. Sinh viên có thể tham gia các câu lạc bộ học tập, văn nghệ, thể thao trường học hoặc tham gia các cuộc thi về CNTT, cuộc thi văn nghệ, các giải thể thao được Khoa và Nhà trường thường xuyên tổ chức.",
  },
];

// Dữ liệu đối tác
const partners = [
  {
    id: 1,
    name: "SIS",
    logo: "https://cse.tlu.edu.vn/Uploads/Images/1628607253161-Thi%E1%BA%BFt%20k%E1%BA%BF%20kh%C3%B4ng%20t%C3%AAn%20-%202021-08-10T215407_611.png",
  },
  {
    id: 2,
    name: "FPT",
    logo: "https://cse.tlu.edu.vn/Uploads/Images/1628607253161-Thi%E1%BA%BFt%20k%E1%BA%BF%20kh%C3%B4ng%20t%C3%AAn%20-%202021-08-10T215407_611.png",
  },
  {
    id: 3,
    name: "GEM",
    logo: "https://cse.tlu.edu.vn/Uploads/Images/z5200601187011_648f3482b9d5b311801eacad988dfee6.jpg",
  },
  {
    id: 4,
    name: "Alibaba Cloud",
    logo: "https://cse.tlu.edu.vn/Uploads/Images/DoanhNghiep/samsung-electronics-vietnam-logo.png",
  },
  {
    id: 5,
    name: "VNCERT/CC",
    logo: "https://cse.tlu.edu.vn/Uploads/Images/1628607253161-Thi%E1%BA%BFt%20k%E1%BA%BF%20kh%C3%B4ng%20t%C3%AAn%20-%202021-08-10T215407_611.png",
  },
  {
    id: 6,
    name: "VNCERT/CC",
    logo: "https://cse.tlu.edu.vn/Uploads/Images/lgo%20l%E1%BA%A1c%20h%E1%BB%93ng.png",
  },
];

interface SliderProps {
  sliders: SliderResponse[];
}

const Slider: React.FC<SliderProps> = ({ sliders }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliders.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [sliders.length]);

  return (
    <div className="w-full relative">
      {sliders.length > 0 ? (
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden relative">
          {sliders.map((slider, index) => (
            <img
              key={slider.id}
              src={slider.imageUrl}
              alt={slider.title || "Slider"}
              className="w-full h-full object-cover absolute transition-opacity duration-500"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                objectPosition: "center center", // This helps center the image
              }}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-100">
          No sliders available
        </div>
      )}
    </div>
  );
};
// Format date function for display
const formatDateNoti = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return {
      day: format(date, "dd", { locale: vi }),
      month: format(date, "M/yyyy", { locale: vi }),
    };
  } catch (error) {
    console.error("Error formatting date:", error);
    return { day: "", month: "" };
  }
};

const NotificationSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getArticles({
          page: 0,
          size: 10,
          categoryGroupId: 6, // sửa id trong db
          status: "PUBLISHED",
        });
        setArticles(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-32 flex items-center justify-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-gray-500">
        Không có thông báo nào.
      </div>
    );
  }

  // Chia các bài viết thành 2 cột
  const leftColumn = articles.slice(0, Math.ceil(articles.length / 2));
  const rightColumn = articles.slice(Math.ceil(articles.length / 2));

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column */}
        <div className="w-full md:w-1/2">
          {leftColumn.map((article) => {
            const { day, month } = formatDateNoti(article.publishDate);
            return (
              <div key={article.id} className="flex mb-4 group">
                <div className="flex-shrink-0 w-14 text-center mr-4">
                  <div className="text-red-600 font-bold text-2xl">{day}</div>
                  <div className="text-gray-600 text-xs">{month}</div>
                </div>
                <Link
                  to={`/thong-bao/${article.id}`}
                  className="text-blue-900 hover:text-red-600 transition-colors duration-200 group-hover:text-red-600"
                >
                  {article.title}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Right column */}
        <div className="w-full md:w-1/2">
          {rightColumn.map((article) => {
            const { day, month } = formatDateNoti(article.publishDate);
            return (
              <div key={article.id} className="flex mb-4 group">
                <div className="flex-shrink-0 w-14 text-center mr-4">
                  <div className="text-red-600 font-bold text-2xl">{day}</div>
                  <div className="text-gray-600 text-xs">{month}</div>
                </div>
                <Link
                  to={`/thong-bao/${article.id}`}
                  className="text-blue-900 hover:text-red-600 transition-colors duration-200 group-hover:text-red-600"
                >
                  {article.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Component cho slider đối tác
const PartnerSlider = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sliderRef.current) {
        const itemWidth = sliderRef.current.scrollWidth / partners.length;
        const maxPosition =
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

        // Nếu đã đến cuối, quay lại đầu
        if (currentPosition >= maxPosition) {
          setCurrentPosition(0);
        } else {
          // Di chuyển đến vị trí tiếp theo
          setCurrentPosition((prev) => Math.min(prev + itemWidth, maxPosition));
        }
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentPosition]);

  return (
    <div className="overflow-hidden relative w-full">
      <div
        ref={sliderRef}
        className="flex items-center transition-transform duration-1000 ease-in-out w-full"
        style={{ transform: `translateX(-${currentPosition}px)` }}
      >
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex-shrink-0 px-6 py-4 w-1/5 min-w-[200px]"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-auto object-contain"
              style={{ maxHeight: "120px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Format date function
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy h:mm a", { locale: vi });
  } catch (error: unknown) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

// News component
const NewsSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await articleService.getArticles({
          page: 0,
          size: 3,
          categoryGroupId: 5, // sửa id trong db
          status: "PUBLISHED",
        });
        setArticles(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-32 flex items-center justify-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-gray-500">
        Không có tin tức nào.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col">
            <Link
              to={`/tin-tuc/${article.id}`}
              className="block overflow-hidden h-44 mb-2"
            >
              <img
                src={article.thumbnailUrl}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="text-gray-500 text-xs mb-1">
              {formatDate(article.publishDate)}
            </div>
            <Link
              to={`/tin-tuc/${article.id}`}
              className="font-medium text-blue-900 hover:text-red-600 transition-colors duration-200"
            >
              {article.title}
            </Link>
          </div>
        ))}
      </div>
      {/* <div className="mt-3 text-right">
        <Link to="/tin-tuc" className="text-blue-600 hover:text-red-600 text-sm">
          Xem tất cả →
        </Link>
      </div> */}
    </div>
  );
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [sliders, setSliders] = useState<SliderResponse[]>([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const activeSliders = await sliderService.getActiveSliders();
        setSliders(activeSliders);
      } catch (error) {
        console.error("Failed to fetch sliders:", error);
      }
    };

    fetchSliders();
  }, []);

  return (
    <div className="w-full">
      {/* Slider with Tab Navigation overlay */}
      <div className="relative">
        {/* Slider with responsive height */}
        <Slider sliders={sliders} />

        {/* Tab Navigation - Positioned to overlap with slider */}
        <div className="absolute bottom-[-50px] left-0 right-0">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-center items-stretch">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-row sm:flex-col items-center justify-center py-3 sm:py-5 px-4 sm:px-6 cursor-pointer transition-all flex-1 ${
                    activeTab === tab.id
                      ? "text-blue-600 bg-white border-b-2 sm:border-b-0 sm:border-t-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-xl sm:text-3xl mr-2 sm:mr-0 sm:mb-2">
                    {tab.icon}
                  </div>
                  <div className="font-medium text-sm sm:text-base text-center">
                    {tab.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính - Added margin to account for tab overlap */}
      {/* Nội dung chính */}
      <div className="max-w-6xl mx-auto px-4 pt-16 sm:pt-20">
        {/* Hiển thị nội dung theo tab */}
        <div className="p-4 sm:p-6 text-gray-600 rounded-lg">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>

        {/* Thông báo */}
        <section className="mt-8 sm:mt-10">
          <div className="flex justify-between items-center border-b-2 border-red-500 pb-2">
            <h2 className="text-lg font-bold">THÔNG BÁO</h2>
            <Link
              to="/thong-bao"
              className="text-blue-600 hover:text-red-600 text-sm hidden md:block"
            >
              Xem tất cả
            </Link>
          </div>
          <NotificationSection />
        </section>

        {/* Tin tức & Sự kiện */}
        <section className="mt-8 sm:mt-10">
          <div className="flex justify-between items-center border-b-2 border-red-500 pb-2">
            <h2 className="text-lg font-bold">TIN TỨC & SỰ KIỆN</h2>
            <Link
              to="/tin-tuc"
              className="text-blue-600 hover:text-red-600 text-sm hidden md:block"
            >
              Xem tất cả
            </Link>
          </div>
          <NewsSection />
        </section>
      </div>

      {/* Sinh viên tiêu biểu - Full width section */}
      <section className="w-full mt-8 sm:mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-bold border-b-2 border-red-500 pb-2">
            SINH VIÊN TIÊU BIỂU
          </h2>
        </div>

        <div className="w-full mt-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 h-auto">
              <img
                src="https://cse.tlu.edu.vn/v1/upload/about-bg-1.jpg"
                alt="Dương Văn Phụng"
                className="w-full h-full object-cover"
                style={{ height: "100%" }}
              />
            </div>
            <div className="w-full md:w-2/3 bg-blue-900 text-white p-6 md:p-8">
              <h3 className="text-xl text-center md:text-4xl font-bold mb-3">
                Dương Văn Phụng
              </h3>
              <p className="text-sm md:text-base mb-4">
                Dương Văn Phụng là cựu sinh viên 58PM, Khoa Công nghệ Thông tin,
                Trường Đại học Thủy lợi. Sau hơn 2 năm ra trường và đi làm cho
                các doanh nghiệp, Phụng đã đạt được những thành công bước đầu
                đáng nể Một vài thành tích có thể kể đến như:
              </p>
              <ul className="text-sm md:text-base space-y-2">
                <li>
                  - Điểm trung bình tích lũy toàn khóa: 3.55/4 (thang điểm 4);
                </li>
                <li>
                  - Liên tục đạt học bổng khuyến khích học tập qua các kỳ học;
                </li>
                <li>
                  - Đạt giải Nhất Nghiên cứu khoa học cấp trường lần thứ 32 năm
                  2019 và giải Ba Nghiên cứu khoa học cấp Bộ, giải VIFOTEC năm
                  2019 với đề tài: "Nghiên cứu trợ lý ảo tiếng Việt trên điện
                  thoại Android";
                </li>
                <li>
                  - Đạt giải Nhất Nghiên cứu khoa học cấp trường lần thứ 33 năm
                  2020 với đề tài: "Nghiên cứu giải pháp công nghệ tự động nhận
                  diện tình huống nguy hiểm tích hợp trên các thiết bị thông
                  minh";
                </li>
                <li>
                  - Đạt Học bổng của Hội Khuyến học thành phố Hà Nội năm 2020;
                </li>
                <li>- Đạt Học bổng "Lê Văn Kiểm và gia đình" năm 2019;</li>
                <li>
                  - Có 01 bài báo khoa học được đăng trong "Tuyển tập Hội nghị
                  khoa học thường niên năm 2019" trường Đại học Thủy lợi;
                </li>
                <li>
                  - Đạt nhiều giấy khen, bằng khen tham gia tích cực vào công
                  tác thông tin, tuyên truyền của trường các năm 2017, 2018,
                  2019, 2020
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Đối tác - Full width section */}
      <section className="w-full mt-8 sm:mt-10 mb-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-bold border-b-2 border-red-500 pb-2 mb-6">
            ĐỐI TÁC
          </h2>

          {/* Partner Slider */}
          <PartnerSlider />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
