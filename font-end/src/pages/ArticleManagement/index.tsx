import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ArticleModal from './components/ArticleModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Pagination from './components/Pagination';
import DatePicker from './components/DatePicker';

// Định nghĩa kiểu dữ liệu cho bài viết
interface Article {
  id: number;
  title: string;
  category: string;
  publishDate: string;
  publishTime: string;
}

const ArticleManagement = () => {
  // State cho danh sách bài viết
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: 'Trường Đại học Thủy lợi công bố quyết định bổ nhiệm Trưởng khoa Công nghệ thông tin',
      category: 'Tin tức',
      publishDate: '11/8/2024',
      publishTime: '9:47:23 AM',
    },
    {
      id: 2,
      title: 'Thông báo lịch thi cuối kỳ học kỳ 2 năm học 2023-2024',
      category: 'Thông báo',
      publishDate: '10/8/2024',
      publishTime: '2:30:15 PM',
    },
    {
      id: 3,
      title: 'Hội thảo khoa học về Trí tuệ nhân tạo và ứng dụng trong giáo dục',
      category: 'Sự kiện',
      publishDate: '9/8/2024',
      publishTime: '10:15:42 AM',
    },
  ]);

  // State cho modal và UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [searchDate, setSearchDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Danh sách danh mục
  const categories = [
    { value: '', label: 'Tất cả danh mục' },
    { value: 'Tin tức', label: 'Tin tức' },
    { value: 'Thông báo', label: 'Thông báo' },
    { value: 'Sự kiện', label: 'Sự kiện' },
    { value: 'Tuyển sinh', label: 'Tuyển sinh' },
  ];

  // Mô phỏng tải dữ liệu
  const refreshData = () => {
    setIsLoading(true);
    // Mô phỏng API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Reset trang về 1 khi thay đổi bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchDate, selectedCategory]);

  // Xử lý thêm bài viết mới
  const handleAddArticle = () => {
    setCurrentArticle(null);
    setIsModalOpen(true);
  };

  // Xử lý chỉnh sửa bài viết
  const handleEditArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsModalOpen(true);
  };

  // Xử lý xóa bài viết
  const handleDeleteClick = (article: Article) => {
    setCurrentArticle(article);
    setIsDeleteModalOpen(true);
  };

  // Xử lý khi xác nhận xóa bài viết
  const handleConfirmDelete = () => {
    if (currentArticle) {
      setIsLoading(true);
      // Mô phỏng API call
      setTimeout(() => {
        const updatedArticles = articles.filter(article => article.id !== currentArticle.id);
        setArticles(updatedArticles);
        setIsDeleteModalOpen(false);
        setIsLoading(false);
      }, 500);
    }
  };

  // Xử lý khi lưu bài viết (thêm mới hoặc cập nhật)
  const handleSaveArticle = (articleData: Omit<Article, 'id'>) => {
    setIsLoading(true);
    // Mô phỏng API call
    setTimeout(() => {
      if (currentArticle) {
        // Cập nhật bài viết hiện có
        const updatedArticles = articles.map(article => 
          article.id === currentArticle.id 
            ? { ...article, ...articleData } 
            : article
        );
        setArticles(updatedArticles);
      } else {
        // Thêm bài viết mới
        const newArticle = {
          id: articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1,
          ...articleData,
        };
        setArticles([...articles, newArticle]);
      }
      setIsModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  // Xử lý sắp xếp
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Lọc và sắp xếp bài viết
  const filteredAndSortedArticles = articles
    .filter(article => {
      const matchesQuery = article.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = searchDate ? article.publishDate.includes(searchDate) : true;
      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
      return matchesQuery && matchesDate && matchesCategory;
    })
    .sort((a, b) => {
      // Chuyển đổi định dạng ngày DD/MM/YYYY thành Date object để so sánh
      const dateA = a.publishDate.split('/').reverse().join('-') + 'T' + a.publishTime;
      const dateB = b.publishDate.split('/').reverse().join('-') + 'T' + b.publishTime;
      
      if (sortOrder === 'asc') {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      } else {
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }
    });

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = filteredAndSortedArticles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedArticles.length / itemsPerPage);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100 flex items-center">
          <span className="bg-blue-50 text-blue-600 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </span>
          QUẢN LÝ BÀI VIẾT
        </h1>
        
        {/* Thanh công cụ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-7 flex flex-wrap items-center gap-3">
            <button 
              onClick={handleAddArticle}
              className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 shadow-sm"
            >
              <PlusIcon className="w-5 h-5 mr-1" /> Thêm bài viết
            </button>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none text-gray-700"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <div>
              <DatePicker 
                selectedDate={searchDate} 
                onChange={setSearchDate} 
                placeholder="Chọn ngày..."
              />
            </div>
            
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              title="Làm mới dữ liệu"
            >
              <ArrowPathIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <div className="md:col-span-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Thông tin kết quả */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div>
            Hiển thị <span className="font-medium">{currentArticles.length}</span> / 
            <span className="font-medium"> {filteredAndSortedArticles.length}</span> bài viết
          </div>
          <button 
            onClick={toggleSortOrder}
            className="flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span>Sắp xếp theo thời gian</span>
            {sortOrder === 'desc' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Bảng dữ liệu */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                  STT
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-48">
                  THỜI GIAN ĐĂNG
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  TIÊU ĐỀ
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                  DANH MỤC
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                // Hiển thị skeleton loader khi đang tải
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <div className="h-8 bg-gray-200 rounded-full w-8"></div>
                        <div className="h-8 bg-gray-200 rounded-full w-8"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : currentArticles.length > 0 ? (
                currentArticles.map((article, index) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex flex-col">
                        <span>{article.publishDate}</span>
                        <span className="text-xs text-gray-500">{article.publishTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 line-clamp-2">
                      {article.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        article.category === 'Tin tức' 
                          ? 'bg-blue-100 text-blue-800' 
                          : article.category === 'Thông báo' 
                          ? 'bg-green-100 text-green-800'
                          : article.category === 'Sự kiện'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => handleEditArticle(article)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                          title="Chỉnh sửa"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(article)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                          title="Xóa"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-medium">Không tìm thấy bài viết nào</p>
                      <p className="text-sm text-gray-500 mt-1">Thử thay đổi bộ lọc hoặc thêm bài viết mới</p>
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSearchDate('');
                          setSelectedCategory('');
                        }}
                        className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Phân trang */}
        {filteredAndSortedArticles.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Trang <span className="font-medium">{currentPage}</span> / <span className="font-medium">{totalPages}</span>
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
      
      {/* Modal thêm/sửa bài viết */}
      {isModalOpen && (
        <ArticleModal
          article={currentArticle}
          onSave={handleSaveArticle}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoading}
        />
      )}
      
      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          articleTitle={currentArticle?.title || ''}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ArticleManagement;