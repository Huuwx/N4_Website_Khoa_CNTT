import { axiosInstance } from "./index";

// Interface cho request update giảng viên
interface UpdateGiangVienRequest {
  anh?: string;
  linhVucNghienCuu?: string;
  hocVi?: string;
  khoa?: string;
  boMon?: string;
  chucVu?: string;
}

// Interface cho request update visibility
interface UpdateVisibilityRequest {
  hienAnh: boolean;
  hienLinhVucNghienCuu: boolean;
  hienHocVi: boolean;
  hienKhoa: boolean;
  hienBoMon: boolean;
  hienChucVu: boolean;
}

// Interface cho response profile
interface ProfileResponse {
  status: string;
  message: string;
  data: {
    taiKhoan: string;
    hoTen: string;
    email: string;
    anh?: string;
    linhVucNghienCuu?: string;
    hocVi?: string;
    khoa?: string;
    boMon?: string;
    chucVu?: string;
    hienAnh: boolean;
    hienLinhVucNghienCuu: boolean;
    hienHocVi: boolean;
    hienKhoa: boolean;
    hienBoMon: boolean;
    hienChucVu: boolean;
  };
}

/**
 * Cập nhật thông tin giảng viên
 * @param taiKhoan Tài khoản giảng viên
 * @param data Dữ liệu cập nhật
 * @returns Thông tin giảng viên sau khi cập nhật
 */
export const updateGiangVien = async (taiKhoan: string, data: UpdateGiangVienRequest) => {
  try {
    const response = await axiosInstance.put(`/auth/update-profile/${taiKhoan}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin giảng viên:", error);
    throw error;
  }
};

/**
 * Cập nhật trạng thái hiển thị
 * @param taiKhoan Tài khoản giảng viên
 * @param data Cài đặt hiển thị
 * @returns Thông tin giảng viên sau khi cập nhật
 */
export const updateVisibility = async (taiKhoan: string, data: UpdateVisibilityRequest) => {
  try {
    const response = await axiosInstance.put(`/auth/update-visibility/${taiKhoan}`, data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật hiển thị:", error);
    throw error;
  }
};

/**
 * Lấy thông tin profile giảng viên
 * @param taiKhoan Tài khoản giảng viên
 * @returns Thông tin profile
 */
export const getProfile = async (taiKhoan: string): Promise<ProfileResponse> => {
  try {
    const response = await axiosInstance.get(`/auth/profile/${taiKhoan}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin profile:", error);
    throw error;
  }
};

// Gộp update profile vào updateGiangVien
export const updateProfile = updateGiangVien;
