import { useState, useEffect } from "react";
import { XMarkIcon, PlusIcon, TrashIcon, PhotoIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Article, ArticleData, uploadImage } from "@/services/articleService";

interface ArticleModalProps {
    article: Article | null;
    onSave: (articleData: ArticleData) => void;
    onClose: () => void;
    isLoading?: boolean;
    categories?: Array<{ value: string; label: string }>;
}

const ArticleModal = ({
    article,
    onSave,
    onClose,
    isLoading = false,
    categories = [],
}: ArticleModalProps) => {
    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [content, setContent] = useState("");
    const [imageLinks, setImageLinks] = useState<string[]>([]);
    const [newImageLink, setNewImageLink] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Danh sách danh mục từ dữ liệu đã insert
    const predefinedCategories = [
        { id: 1, name: 'Tin tức', group: 'Thông tin' },
        { id: 2, name: 'Sự kiện', group: 'Thông tin' },
        { id: 3, name: 'Thể thao', group: 'Giải trí' },
        { id: 4, name: 'Âm nhạc', group: 'Giải trí' },
        { id: 5, name: 'Phim ảnh', group: 'Giải trí' },
        { id: 6, name: 'Công nghệ', group: 'Khoa học' },
        { id: 7, name: 'Khoa học', group: 'Khoa học' },
        { id: 8, name: 'Du lịch', group: 'Đời sống' },
        { id: 9, name: 'Ẩm thực', group: 'Đời sống' },
        { id: 10, name: 'Thời trang', group: 'Đời sống' },
        { id: 11, name: 'Sức khỏe', group: 'Y tế' },
        { id: 12, name: 'Y học', group: 'Y tế' },
        { id: 13, name: 'Giáo dục', group: 'Học tập' },
        { id: 14, name: 'Hướng nghiệp', group: 'Học tập' },
        { id: 15, name: 'Kinh doanh', group: 'Kinh tế' },
        { id: 16, name: 'Tài chính', group: 'Kinh tế' },
        { id: 17, name: 'Bất động sản', group: 'Kinh tế' },
        { id: 18, name: 'Văn học', group: 'Văn hóa' },
        { id: 19, name: 'Nghệ thuật', group: 'Văn hóa' },
        { id: 20, name: 'Lịch sử', group: 'Văn hóa' }
    ];

    // Nhóm danh mục để hiển thị trong dropdown
    const categoryGroups = [
        { group: 'Thông tin', items: predefinedCategories.filter(c => c.group === 'Thông tin') },
        { group: 'Giải trí', items: predefinedCategories.filter(c => c.group === 'Giải trí') },
        { group: 'Khoa học', items: predefinedCategories.filter(c => c.group === 'Khoa học') },
        { group: 'Đời sống', items: predefinedCategories.filter(c => c.group === 'Đời sống') },
        { group: 'Y tế', items: predefinedCategories.filter(c => c.group === 'Y tế') },
        { group: 'Học tập', items: predefinedCategories.filter(c => c.group === 'Học tập') },
        { group: 'Kinh tế', items: predefinedCategories.filter(c => c.group === 'Kinh tế') },
        { group: 'Văn hóa', items: predefinedCategories.filter(c => c.group === 'Văn hóa') }
    ];

    // Cập nhật form khi có dữ liệu từ bài viết cần chỉnh sửa
    useEffect(() => {
        if (article) {
            setTitle(article.title);
            
            // Tìm ID danh mục từ tên danh mục
            const categoryObject = predefinedCategories.find(cat => cat.name === article.category);
            if (categoryObject) {
                setCategoryId(categoryObject.id);
            } else {
                setCategoryId(1); // Mặc định là Tin tức
            }
            
            setContent(article.content);
            setImageLinks(article.images || []);
        } else {
            setTitle("");
            setCategoryId(1); // Mặc định là Tin tức
            setContent("");
            setImageLinks([]);
        }
    }, [article]);

    // Xử lý khi chọn file ảnh
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Kiểm tra loại file
        if (!file.type.startsWith('image/')) {
            setErrors({ ...errors, imageFile: "Vui lòng chọn file ảnh hợp lệ" });
            return;
        }

        // Kiểm tra kích thước file (giới hạn 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrors({ ...errors, imageFile: "Kích thước ảnh không được vượt quá 5MB" });
            return;
        }

        setImageFile(file);
        setErrors({ ...errors, imageFile: "" });

        // Tạo URL preview cho ảnh
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // Xử lý tải ảnh lên server
    const handleUploadImage = async () => {
        if (!imageFile) return;

        setIsUploading(true);
        try {
            // Giả lập việc tải ảnh lên server
            // Trong thực tế, bạn sẽ gọi API uploadImage ở đây
            await new Promise(resolve => setTimeout(resolve, 1500)); // Giả lập delay
            
            // Giả lập URL ảnh được trả về từ server
            const imageUrl = URL.createObjectURL(imageFile);
            setImageLinks([...imageLinks, imageUrl]);
            setImageFile(null);
            setImagePreview(null);
            
            // Reset input file
            const fileInput = document.getElementById('image-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            
        } catch (error) {
            console.error("Lỗi khi tải ảnh lên:", error);
            setErrors({ ...errors, imageUpload: "Không thể tải ảnh lên. Vui lòng thử lại sau." });
        } finally {
            setIsUploading(false);
        }
    };

    // Thêm link ảnh vào danh sách
    const handleAddImageLink = () => {
        if (!newImageLink.trim()) {
            setErrors({ ...errors, imageLink: "Vui lòng nhập link ảnh" });
            return;
        }

        // Kiểm tra định dạng URL
        try {
            new URL(newImageLink);
        } catch (e) {
            setErrors({ ...errors, imageLink: "Link ảnh không hợp lệ" });
            return;
        }

        setImageLinks([...imageLinks, newImageLink]);
        setNewImageLink("");
        setErrors({ ...errors, imageLink: "" });
    };

    // Xóa link ảnh khỏi danh sách
    const handleRemoveImage = (index: number) => {
        const newImageLinks = [...imageLinks];
        newImageLinks.splice(index, 1);
        setImageLinks(newImageLinks);
    };

    // Kiểm tra form trước khi submit
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!title.trim()) {
            newErrors.title = "Vui lòng nhập tiêu đề bài viết";
        }

        if (!categoryId) {
            newErrors.category = "Vui lòng chọn danh mục";
        }

        if (!content.trim()) {
            newErrors.content = "Vui lòng nhập nội dung bài viết";
        }

        if (imageLinks.length === 0) {
            newErrors.images = "Vui lòng thêm ít nhất một ảnh cho bài viết";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Xử lý submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        // Lấy ID tài khoản từ localStorage hoặc context auth
        // Giả định ID tài khoản là "admin"
        const idTaiKhoan = "user123";
        
        onSave({
            tenBaiViet: title,
            noiDung: content,
            idDanhMuc: categoryId || 1,
            idTaiKhoan: idTaiKhoan,
            danhSachAnh: imageLinks,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <span
                            className={`mr-3 p-2 rounded-lg ${
                                article
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-green-50 text-green-600"
                            }`}
                        >
                            {article ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            )}
                        </span>
                        {article ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                        disabled={isLoading || isUploading}
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-5">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Tiêu đề <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-colors ${
                                errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                            placeholder="Nhập tiêu đề bài viết"
                            disabled={isLoading || isUploading}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Danh mục <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="category"
                            value={categoryId || ''}
                            onChange={(e) => setCategoryId(Number(e.target.value))}
                            className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-colors ${
                                errors.category
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300"
                            }`}
                            disabled={isLoading || isUploading}
                        >
                            <option value="">Chọn danh mục</option>
                            {categoryGroups.map((group) => (
                                <optgroup key={group.group} label={group.group}>
                                    {group.items.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                        )}
                    </div>

                    {/* Phần thêm ảnh */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ảnh bài viết <span className="text-red-500">*</span>
                        </label>
                        
                        {/* Hiển thị danh sách ảnh đã thêm */}
                        {imageLinks.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                                {imageLinks.map((link, index) => (
                                    <div key={index} className="relative group">
                                        <img 
                                            src={link} 
                                            alt={`Ảnh ${index + 1}`} 
                                            className="w-full h-32 object-cover rounded-lg border border-gray-300"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://placehold.co/300x200?text=Lỗi+ảnh';
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Xóa ảnh"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                        {index === 0 && (
                                            <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                                Ảnh chính
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {errors.images && (
                            <p className="mt-1 text-sm text-red-600 mb-2">{errors.images}</p>
                        )}

                        {/* Form thêm link ảnh */}
                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                value={newImageLink}
                                onChange={(e) => setNewImageLink(e.target.value)}
                                placeholder="Nhập link ảnh"
                                className={`flex-grow p-2.5 border rounded-l-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-colors ${
                                    errors.imageLink ? "border-red-300 bg-red-50" : "border-gray-300"
                                }`}
                                disabled={isLoading || isUploading}
                            />
                            <button
                                type="button"
                                onClick={handleAddImageLink}
                                className="bg-blue-600 text-white p-2.5 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
                                disabled={isLoading || isUploading}
                            >
                                <PlusIcon className="w-5 h-5 mr-1" /> Thêm
                            </button>
                        </div>
                        {errors.imageLink && (
                            <p className="mt-1 text-sm text-red-600 mb-2">{errors.imageLink}</p>
                        )}

                        {/* Hoặc tải ảnh lên */}
                        <div className="mt-4">
                            <div className="text-sm font-medium text-gray-700 mb-2">Hoặc tải ảnh từ máy tính</div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-grow">
                                    <label 
                                        htmlFor="image-upload" 
                                        className="flex justify-center items-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                                    >
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="h-40 object-contain"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Kéo thả ảnh vào đây hoặc click để chọn
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    PNG, JPG, GIF tối đa 5MB
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={isLoading || isUploading}
                                    />
                                    {errors.imageFile && (
                                        <p className="mt-1 text-sm text-red-600">{errors.imageFile}</p>
                                    )}
                                </div>
                                
                                {imageFile && (
                                    <button
                                        type="button"
                                        onClick={handleUploadImage}
                                        className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center mt-4 ${
                                            isUploading ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                        disabled={isUploading || isLoading}
                                    >
                                        {isUploading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Đang tải...
                                            </>
                                        ) : (
                                            <>
                                                <ArrowUpTrayIcon className="w-5 h-5 mr-1" /> Tải lên
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                            {errors.imageUpload && (
                                <p className="mt-1 text-sm text-red-600">{errors.imageUpload}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nội dung <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-colors ${
                                errors.content ? "border-red-300 bg-red-50" : "border-gray-300"
                            } h-40`}
                            placeholder="Nhập nội dung bài viết"
                            disabled={isLoading || isUploading}
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all duration-200"
                            disabled={isLoading || isUploading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 ${
                                (isLoading || isUploading) ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isLoading || isUploading}
                        >
                            {isLoading ? "Đang lưu..." : article ? "Cập nhật" : "Thêm mới"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArticleModal;
