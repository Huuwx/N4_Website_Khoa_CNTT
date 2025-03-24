import { axiosInstance } from "./index";

export interface Lecturer {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
  academicDegree?: string;
  department?: string;
  position?: string;
  faculty?: string;
  researchFields?: string[];
  status: 'ACTIVE' | 'LOCKED';
  showFullName?: boolean;
  showGender?: boolean;
  showPhoneNumber?: boolean;
  showAddress?: boolean;
  showAvatar?: boolean;
  showAcademicDegree?: boolean;
  showDepartment?: boolean;
  showPosition?: boolean;
  showFaculty?: boolean;
  showResearchFields?: boolean;
}

export interface CreateLecturerRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
}

export interface UpdateLecturerRequest {
  email?: string;
  fullName?: string;
  gender?: string;
  phoneNumber?: string;
  password?: string;
}

export interface LecturerResponse {
  status: string;
  data: Lecturer[];
  timestamp: string;
}

export const getLecturers = async (
  page: number = 0,
  size: number = 10,
  search?: string
): Promise<LecturerResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(search && { search }),
  });

  const response = await axiosInstance.get<LecturerResponse>(`/v1/lecturers?${params}`);
  return response.data;
};

export const createLecturer = async (data: CreateLecturerRequest): Promise<Lecturer> => {
  const response = await axiosInstance.post<{ data: Lecturer }>('/auth/admin/create-lecturer', data);
  return response.data.data;
};

export const updateLecturer = async (id: string, data: UpdateLecturerRequest): Promise<Lecturer> => {
  // Remove undefined fields but keep empty strings for password
  const requestData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => {
      if (key === 'password') return value !== undefined;
      return value !== undefined && value !== '';
    })
  );

  const response = await axiosInstance.put<{ data: Lecturer }>(`/v1/lecturers/profile/${id}`, requestData);
  return response.data.data;
};

export const deleteLecturer = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/lecturers/${id}`);
};

export const toggleLecturerStatus = async (id: string): Promise<Lecturer> => {
  const response = await axiosInstance.patch<{ data: Lecturer }>(`/v1/lecturers/${id}/toggle-status`);
  return response.data.data;
};

export const getLecturerById = async (id: string): Promise<Lecturer> => {
  const response = await axiosInstance.get<{ data: Lecturer }>(`/v1/lecturers/${id}`);
  return response.data.data;
};