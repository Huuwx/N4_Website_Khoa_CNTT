import { axiosInstance } from './index';
import { axiosInstanceNoHeader } from "./indexNoHeader";

export interface SliderRequest {
  imageUrl: string;
  displayOrder: number;
  title?: string;
  description?: string;
  active: boolean;
}

export interface SliderResponse {
  id: number;
  imageUrl: string;
  displayOrder: number;
  title?: string;
  description?: string;
  active: boolean;
}

export const sliderService = {
  getAllSliders: async (): Promise<SliderResponse[]> => {
    const response = await axiosInstanceNoHeader.get<SliderResponse[]>(`/sliders`);
    return response.data;
  },

  getActiveSliders: async (): Promise<SliderResponse[]> => {
    const response = await axiosInstanceNoHeader.get<SliderResponse[]>(`/sliders/active`);
    return response.data;
  },

  createSlider: async (slider: SliderRequest): Promise<SliderResponse> => {
    const response = await axiosInstance.post<SliderResponse>(`/sliders`, slider);
    return response.data;
  },

  deleteSlider: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/sliders/${id}`);
  },

  updateSliderOrder: async (id: number, order: number): Promise<SliderResponse> => {
    const response = await axiosInstance.put<SliderResponse>(`/sliders/${id}/order/${order}`);
    return response.data;
  }
};