// services/articleService.ts
import axios from 'axios';

// Base URL của API
const API_BASE_URL = 'http://localhost:8080/api';

// Interface cho dữ liệu bài viết
export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  image: string;
  images?: string[];
  publishDate: string;
  publishTime: string;
  createdAt: string;
  updatedAt: string;
  author?: string;
}

// Interface cho dữ liệu tạo/cập nhật bài viết
export interface ArticleData {
  tenBaiViet: string;
  noiDung: string;
  idDanhMuc: number;
  idTaiKhoan: string;
  danhSachAnh: string[];
}

// Interface cho phản hồi phân trang
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
* Lấy danh sách bài viết
*/
export const getArticles = async (): Promise<PageResponse<Article>> => {
  try {
      const response = await axios.get(`${API_BASE_URL}/bai-viet`);
      
      // Chuyển đổi dữ liệu từ API sang định dạng frontend
      const articles: Article[] = response.data.map((item: any) => transformArticleFromApi(item));
      
      return {
          content: articles,
          totalPages: 1, // Nếu không có phân trang, mặc định là 1
          totalElements: articles.length,
          size: articles.length,
          number: 0,
          first: true,
          last: true,
          empty: articles.length === 0
      };
  } catch (error) {
      console.error('Lỗi khi lấy danh sách bài viết:', error);
      throw error;
  }
};

/**
* Chuyển đổi dữ liệu bài viết từ API sang định dạng frontend
*/
const transformArticleFromApi = (apiArticle: any): Article => {
  // Xử lý ngày tháng
  const publishDate = new Date(apiArticle.ngayDang);
  const formattedDate = publishDate.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
  });
  
  const formattedTime = publishDate.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
  });

  // Lấy danh sách ảnh
  const images = apiArticle.danhSachAnh || [];
  const mainImage = images.length > 0 ? images[0] : '';

  return {
      id: apiArticle.idbv,
      title: apiArticle.tenBaiViet,
      content: apiArticle.noiDung,
      category: apiArticle.danhMuc?.tenDanhMuc || '',
      image: mainImage,
      images: images,
      publishDate: formattedDate,
      publishTime: formattedTime,
      createdAt: apiArticle.ngayDang,
      updatedAt: apiArticle.ngayChinhSua,
      author: apiArticle.hoTenTaiKhoan || ''
  };
};

/**
 * Lấy thông tin chi tiết của một bài viết
 */
export const getArticleById = async (id: number): Promise<Article> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bai-viet/${id}`);
    return transformArticleFromApi(response.data);
  } catch (error) {
    console.error(`Lỗi khi lấy bài viết với ID ${id}:`, error);
    throw error;
  }
};

/**
 * Tạo bài viết mới
 */
export const createArticle = async (articleData: ArticleData): Promise<Article> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bai-viet`, transformArticleToApi(articleData));
    return transformArticleFromApi(response.data);
  } catch (error) {
    console.error('Lỗi khi tạo bài viết:', error);
    throw error;
  }
};

/**
 * Cập nhật bài viết
 */
export const updateArticle = async (id: number, articleData: ArticleData): Promise<Article> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/bai-viet/${id}`, transformArticleToApi(articleData));
    return transformArticleFromApi(response.data);
  } catch (error) {
    console.error(`Lỗi khi cập nhật bài viết với ID ${id}:`, error);
    throw error;
  }
};

/**
 * Xóa bài viết
 */
export const deleteArticle = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/bai-viet/${id}`);
  } catch (error) {
    console.error(`Lỗi khi xóa bài viết với ID ${id}:`, error);
    throw error;
  }
};


/**
 * Chuyển đổi dữ liệu bài viết từ frontend sang định dạng API
 */
const transformArticleToApi = (articleData: ArticleData): any => {
  return {
    tenBaiViet: articleData.tenBaiViet,
    noiDung: articleData.noiDung,
    idDanhMuc: articleData.idDanhMuc,
    idTaiKhoan: articleData.idTaiKhoan,
    danhSachAnh: articleData.danhSachAnh
  };
};

/**
 * Tìm kiếm bài viết theo tiêu đề
 */
export const searchArticlesByTitle = async (title: string): Promise<Article[]> => {
  try {
    const response = await getArticles(0, 20, title);
    return response.content;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm bài viết:', error);
    throw error;
  }
};

/**
 * Lấy danh sách bài viết theo danh mục
 */
export const getArticlesByCategory = async (categoryId: number): Promise<Article[]> => {
  try {
    const params = new URLSearchParams();
    params.append('idDanhMuc', categoryId.toString());
    
    const response = await axios.get(`${API_BASE_URL}/bai-viet/search`, { params });
    return response.data.map((item: any) => transformArticleFromApi(item));
  } catch (error) {
    console.error(`Lỗi khi lấy bài viết theo danh mục ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Lấy danh sách các danh mục
 */
export const getCategories = async (): Promise<{ id: number, name: string, group: string }[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/danh-muc`);
    return response.data.map((item: any) => ({
      id: item.idDanhMuc,
      name: item.tenDanhMuc,
      group: item.nhomDanhMuc
    }));
  } catch (error) {
    console.error('Lỗi khi lấy danh sách danh mục:', error);
    throw error;
  }
};

/**
 * Tải lên ảnh bài viết
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.url;
  } catch (error) {
    console.error('Lỗi khi tải ảnh lên:', error);
    throw error;
  }
};

export default {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticlesByTitle,
  getArticlesByCategory,
  getCategories,
  uploadImage
};
