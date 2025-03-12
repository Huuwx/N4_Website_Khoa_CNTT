import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/articles';

// Lấy danh sách bài viết
export const getArticles = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bài viết:', error);
        throw error;
    }
};

// Lấy bài viết theo ID
export const getArticleById = async (id: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy bài viết với ID ${id}:`, error);
        throw error;
    }
};

// Tạo bài viết mới
export const createArticle = async (articleData: any) => {
    try {
        const response = await axios.post(API_BASE_URL, articleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo bài viết:', error);
        throw error;
    }
};

// Cập nhật bài viết
export const updateArticle = async (id: number, articleData: Omit<Article, 'id'>) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, articleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật bài viết với ID ${id}:`, error);
        throw error;
    }
};

// Xóa bài viết
export const deleteArticle = async (id: number) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(`Lỗi khi xóa bài viết với ID ${id}:`, error);
        throw error;
    }
};

// Định nghĩa kiểu dữ liệu cho bài viết
interface Article {
    id: number;
    title: string;
    category: string;
    publishDate: string;
    publishTime: string;
}