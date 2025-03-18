import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ArticleModal from './components/ArticleModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Pagination from './components/Pagination';
import DatePicker from './components/DatePicker';
import { getArticles, createArticle, updateArticle, deleteArticle, Article, ArticleData } from '@/services/articleService';

const ArticleManagement = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
    const [searchDate, setSearchDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [totalPages, setTotalPages] = useState(0);
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;

    // Danh sách danh mục từ dữ liệu đã insert
    const categories = [
        { value: '1', label: 'Tin tức' },
        { value: '2', label: 'Sự kiện' },
        { value: '3', label: 'Thể thao' },
        { value: '4', label: 'Âm nhạc' },
        { value: '5', label: 'Phim ảnh' },
        { value: '6', label: 'Công nghệ' },
        { value: '7', label: 'Khoa học' },
        { value: '8', label: 'Du lịch' },
        { value: '9', label: 'Ẩm thực' },
        { value: '10', label: 'Thời trang' },
        { value: '11', label: 'Sức khỏe' },
        { value: '12', label: 'Y học' },
        { value: '13', label: 'Giáo dục' },
        { value: '14', label: 'Hướng nghiệp' },
        { value: '15', label: 'Kinh doanh' },
        { value: '16', label: 'Tài chính' },
        { value: '17', label: 'Bất động sản' },
        { value: '18', label: 'Văn học' },
        { value: '19', label: 'Nghệ thuật' },
        { value: '20', label: 'Lịch sử' },
    ];

    const refreshData = async () => {
        setIsLoading(true);
        try {
            const data = await getArticles();
            // Kiểm tra và lấy danh sách bài viết
            setArticles(data?.content ?? []);
            setTotalPages(data?.totalPages ?? 0);
        } catch (error) {
            console.error("Lỗi khi tải bài viết:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, [currentPage, searchQuery, searchDate, selectedCategory, sortOrder]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, searchDate, selectedCategory]);

    const handleAddArticle = () => {
        setCurrentArticle(null);
        setIsModalOpen(true);
    };

    const handleEditArticle = (article: Article) => {
        setCurrentArticle(article);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (article: Article) => {
        setCurrentArticle(article);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (currentArticle) {
            setIsLoading(true);
            try {
                await deleteArticle(currentArticle.id);
                setIsDeleteModalOpen(false);
                refreshData();
            } catch (error) {
                console.error("Lỗi khi xóa bài viết:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSaveArticle = async (articleData: ArticleData) => {
        setIsLoading(true);
        try {
            if (currentArticle) {
                await updateArticle(currentArticle.id, articleData);
            } else {
                await createArticle(articleData);
            }
            setIsModalOpen(false);
            refreshData();
        } catch (error) {
            console.error("Lỗi khi lưu bài viết:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Hàm định dạng màu cho từng danh mục
    const getCategoryColorClass = (category: string) => {
        const categoryGroups: Record<string, string> = {
            'Tin tức': 'bg-blue-100 text-blue-800',
            'Sự kiện': 'bg-indigo-100 text-indigo-800',
            'Thể thao': 'bg-green-100 text-green-800',
            'Âm nhạc': 'bg-purple-100 text-purple-800',
            'Phim ảnh': 'bg-pink-100 text-pink-800',
            'Công nghệ': 'bg-cyan-100 text-cyan-800',
            'Khoa học': 'bg-teal-100 text-teal-800',
            'Du lịch': 'bg-amber-100 text-amber-800',
            'Ẩm thực': 'bg-orange-100 text-orange-800',
            'Thời trang': 'bg-rose-100 text-rose-800',
            'Sức khỏe': 'bg-emerald-100 text-emerald-800',
            'Y học': 'bg-lime-100 text-lime-800',
            'Giáo dục': 'bg-sky-100 text-sky-800',
            'Hướng nghiệp': 'bg-violet-100 text-violet-800',
            'Kinh doanh': 'bg-yellow-100 text-yellow-800',
            'Tài chính': 'bg-amber-100 text-amber-800',
            'Bất động sản': 'bg-orange-100 text-orange-800',
            'Văn học': 'bg-blue-100 text-blue-800',
            'Nghệ thuật': 'bg-fuchsia-100 text-fuchsia-800',
            'Lịch sử': 'bg-gray-100 text-gray-800'
        };
        
        return categoryGroups[category] || 'bg-gray-100 text-gray-800';
    };

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
                        Hiển thị <span className="font-medium">{articles.length || 0}</span> /
                        <span className="font-medium"> {totalPages * itemsPerPage}</span> bài viết
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                                    ẢNH BÀI VIẾT
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
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="h-16 bg-gray-200 rounded w-24"></div>
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
                            ) : articles.length > 0 ? (
                                articles.map((article, index) => (
                                    <tr key={article.idbv} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex flex-col">
                                                <span>{article.publishDate}</span>
                                                {/* <span className="text-xs text-gray-500">{article.publishDate}</span> */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {article.images && article.images.length > 0 ? (
                                                <img 
                                                    src={article.images[0]} 
                                                    alt={article.title}
                                                    className="h-16 w-24 object-cover rounded-md"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = 'https://placehold.co/300x200?text=No+Image';
                                                    }}
                                                />
                                            ) : (
                                                <img 
                                                    src="https://placehold.co/300x200?text=No+Image"
                                                    alt="No Image"
                                                    className="h-16 w-24 object-cover rounded-md"
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 line-clamp">
                                            {article.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColorClass(article.category)}`}>
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
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 bg-gray-50">
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
                {totalPages > 0 && (
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
                    categories={categories.filter(cat => cat.value !== '')}
                />
            )}

            {/* Modal xác nhận xóa */}
            {isDeleteModalOpen && (
                <DeleteConfirmModal
                    articleTitle={currentArticle?.tenBaiViet || ''}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default ArticleManagement;
