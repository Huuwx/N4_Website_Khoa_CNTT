import { ApiResponse } from "../types/common";
import { LecturerProfileResponse, UpdateLecturerProfileRequest } from "../types/lecturer";
import { axiosInstance } from "./index";

export const lecturerProfileService = {
  getAllLecturers: async (): Promise<LecturerProfileResponse[]> => {
    const response = await axiosInstance.get<ApiResponse<LecturerProfileResponse[]>>('/v1/lecturers');
    return response.data.data;
  },

  getLecturerProfile: async (): Promise<LecturerProfileResponse> => {
    const response = await axiosInstance.get<ApiResponse<LecturerProfileResponse>>('/v1/lecturers/profile');
    return response.data.data;
  },

  getLecturerById: async (id: string): Promise<LecturerProfileResponse> => {
    const response = await axiosInstance.get<ApiResponse<LecturerProfileResponse>>(`/v1/lecturers/${id}`);
    return response.data.data;
  },

  updateProfile: async (request: UpdateLecturerProfileRequest): Promise<LecturerProfileResponse> => {
    const response = await axiosInstance.put<ApiResponse<LecturerProfileResponse>>(
      '/v1/lecturers/profile',
      request
    );
    return response.data.data;
  },

  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post<ApiResponse<{ url: string }>>(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.data.url;
  }
};