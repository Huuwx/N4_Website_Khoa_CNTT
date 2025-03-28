import { axiosInstance } from "./index";
import { axiosInstanceNoHeader } from "./indexNoHeader";

export interface YeuCauLienHe {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  message: string;
  status: "Chưa đọc" | "Đang xử lý" | "Đã xử lý";
}

export interface YeuCauLienHeResponse {
  status: string;
  message: string;
  data: YeuCauLienHe[];
  timestamp: string;
}

export interface YeuCauLienHeQueryParams {
  page?: number;
  size?: number;
  search?: string;
  status?: "Chưa đọc" | "Đang xử lý" | "Đã xử lý";
}

const yeuCauLienHeService = {
  getAllYeuCauLienHe: async (params?: YeuCauLienHeQueryParams) => {
    const response = await axiosInstanceNoHeader.get<YeuCauLienHeResponse>(
      "/yeu-cau-lien-he",
      { params }
    );
    return response.data.data;
  },

  getYeuCauLienHeById: async (id: number) => {
    const response = await axiosInstanceNoHeader.get<{
      status: string;
      name: string;
      message: string;
      data: YeuCauLienHe;
      timestamp: string;
    }>(`/yeu-cau-lien-he/${id}`);
    if (response.data.status === "SUCCESS") {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  },

  createYeuCauLienHe: async (data: Omit<YeuCauLienHe, "id">) => {
    const response = await axiosInstanceNoHeader.post<{
      success: boolean;
      status: string;
      name: string;
      message: string;
      data: YeuCauLienHe;
      timestamp: string;
    }>("/yeu-cau-lien-he", data);

    if (response.status === 200 && response.data.success) {
        return response.data.data;
      } else if (response.data.message) {
        throw new Error(response.data.message);
      } else {
        throw new Error("Có lỗi xảy ra khi cập nhật trạng thái.");
      }
  },

  updateTrangThaiYeuCau: async (id: number, status: string) => {
    const response = await axiosInstance.put<{
      success: boolean;
      status?: string;
      message?: string;
      data?: YeuCauLienHe;
      timestamp?: string;
    }>(`/yeu-cau-lien-he/${id}`, { status });
  
    console.log("Phản hồi từ API cập nhật trạng thái:", response.data); // Debug
  
    // Nếu API trả về status SUCCESS hoặc không có lỗi
    if (response.status === 200 && response.data.success) {
      return response.data.data;
    } else if (response.data.message) {
      throw new Error(response.data.message);
    } else {
      throw new Error("Có lỗi xảy ra khi cập nhật trạng thái.");
    }
  },  

  deleteYeuCauLienHe: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/yeu-cau-lien-he/${id}`);
  },
};

export default yeuCauLienHeService;
