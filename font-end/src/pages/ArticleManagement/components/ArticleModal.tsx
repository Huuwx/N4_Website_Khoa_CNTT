import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Article {
  id: number;
  title: string;
  category: string;
  publishDate: string;
  publishTime: string;
}

interface ArticleModalProps {
  article: Article | null;
  onSave: (articleData: Omit<Article, "id">) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const ArticleModal = ({
  article,
  onSave,
  onClose,
  isLoading = false,
}: ArticleModalProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Nếu là chỉnh sửa, điền dữ liệu vào form
  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setCategory(article.category);
      setPublishDate(article.publishDate);
      setPublishTime(article.publishTime);
      setContent(""); // Giả sử có nội dung chi tiết
    } else {
      // Nếu là thêm mới, set giá trị mặc định
      const now = new Date();
      const formattedDate = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()}`;
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setTitle("");
      setCategory("Tin tức"); // Mặc định
      setPublishDate(formattedDate);
      setPublishTime(formattedTime);
      setContent("");
    }
  }, [article]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề bài viết";
    }

    if (!category) {
      newErrors.category = "Vui lòng chọn danh mục";
    }

    if (!publishDate) {
      newErrors.publishDate = "Vui lòng nhập ngày đăng";
    }

    if (!content.trim()) {
      newErrors.content = "Vui lòng nhập nội dung bài viết";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({
      title,
      category,
      publishDate,
      publishTime,
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
            disabled={isLoading}
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
              disabled={isLoading}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-colors ${
                  errors.category
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                disabled={isLoading}
              >
                <option value="">Chọn danh mục</option>
                <option value="Tin tức">Tin tức</option>
                <option value="Thông báo">Thông báo</option>
                <option value="Sự kiện">Sự kiện</option>
                <option value="Tuyển sinh">Tuyển sinh</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="publishDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ngày đăng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="publishDate"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none transition-colors ${
                  errors.publishDate
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="DD/MM/YYYY"
                disabled={isLoading}
              />
              {errors.publishDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.publishDate}
                </p>
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
              disabled={isLoading}
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
              disabled={isLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
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
