import { axiosInstance } from "./index";
import { axiosInstanceNoHeader } from "./indexNoHeader";

export interface Article {
  id: number;
  title: string;
  thumbnailUrl: string;
  category: {
    id: number;
    name: string;
  };
  publishDate: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export interface ArticleRequest {
  title: string;
  thumbnailUrl: string;
  categoryId: number;
  publishDate: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface ArticleResponse {
  status: string;
  message: string;
  data: {
    content: Article[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
  timestamp: string;
}

export interface ArticleQueryParams {
  page?: number;
  size?: number;
  categoryId?: number;
  search?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  sort?: string;
}

const articleService = {
  getArticles: async (params: ArticleQueryParams) => {
    const response = await axiosInstanceNoHeader.get<ArticleResponse>('/articles', { params });
    return response.data;
  },

  getArticleById: async (id: number) => {
    const response = await axiosInstanceNoHeader.get<{
      status: string;
      message: string;
      data: Article;
      timestamp: string;
    }>(`/articles/${id}`);
    if (response.data.status === "SUCCESS") {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  },

  createArticle: async (article: ArticleRequest) => {
    const response = await axiosInstance.post<{
      status: string;
      message: string;
      data: Article;
      timestamp: string;
    }>('/articles', article);
    if (response.data.status === "SUCCESS") {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  },

  updateArticle: async (id: number, article: ArticleRequest) => {
    const response = await axiosInstance.put<{
      status: string;
      message: string;
      data: Article;
      timestamp: string;
    }>(`/articles/${id}`, article);
    if (response.data.status === "SUCCESS") {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  },

  deleteArticle: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/articles/${id}`);
  },
};

export default articleService;
