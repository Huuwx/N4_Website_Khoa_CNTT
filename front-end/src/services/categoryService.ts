import { axiosInstance } from './index';

export interface CategoryGroupResponse {
  id?: number;
  name: string;
}

export interface CategoryResponse {
  id?: number;
  name: string;
  categoryGroups: CategoryGroupResponse[];
}

export interface CategoryGroup {
  id?: number;
  name: string;
}

export interface Category {
  id?: number;
  name: string;
  categoryGroups: CategoryGroup[];
}

export interface CategoryRequest {
  name: string;
  categoryGroupIds: number[];
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

const categoryService = {
  // Category Group APIs
  getAllCategoryGroups: async (): Promise<CategoryGroupResponse[]> => {
    try {
      const response = await axiosInstance.get<ApiResponse<CategoryGroupResponse[]>>('/category-groups');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch category groups:', error);
      throw error;
    }
  },

  getCategoryGroupById: async (id: number): Promise<CategoryGroupResponse> => {
    try {
      const response = await axiosInstance.get<ApiResponse<CategoryGroupResponse>>(`/category-groups/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch category group:', error);
      throw error;
    }
  },

  createCategoryGroup: async (data: CategoryGroup): Promise<CategoryGroupResponse> => {
    try {
      const response = await axiosInstance.post<ApiResponse<CategoryGroupResponse>>('/category-groups', data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create category group:', error);
      throw error;
    }
  },

  updateCategoryGroup: async (id: number, data: CategoryGroup): Promise<CategoryGroupResponse> => {
    try {
      const response = await axiosInstance.put<ApiResponse<CategoryGroupResponse>>(`/category-groups/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to update category group:', error);
      throw error;
    }
  },

  deleteCategoryGroup: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/category-groups/${id}`);
    } catch (error) {
      console.error('Failed to delete category group:', error);
      throw error;
    }
  },

  // Category APIs
  getAllCategories: async (): Promise<CategoryResponse[]> => {
    try {
      const response = await axiosInstance.get<ApiResponse<CategoryResponse[]>>('/categories');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  },

  getCategoryById: async (id: number): Promise<CategoryResponse> => {
    try {
      const response = await axiosInstance.get<ApiResponse<CategoryResponse>>(`/categories/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch category:', error);
      throw error;
    }
  },

  createCategory: async (requestData: CategoryRequest): Promise<CategoryResponse> => {
    try {
      const response = await axiosInstance.post<ApiResponse<CategoryResponse>>('/categories', requestData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create category:', error);
      throw error;
    }
  },

  updateCategory: async (id: number, requestData: CategoryRequest): Promise<CategoryResponse> => {
    try {
      const response = await axiosInstance.put<ApiResponse<CategoryResponse>>(`/categories/${id}`, requestData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to update category:', error);
      throw error;
    }
  },

  deleteCategory: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
    } catch (error) {
      console.error('Failed to delete category:', error);
      throw error;
    }
  },
};

export default categoryService;