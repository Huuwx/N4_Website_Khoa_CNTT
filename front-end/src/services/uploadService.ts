import { axiosInstance } from './index';

interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}

const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default uploadFile;