export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface LecturerProfileResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  gender: Gender;
  phoneNumber: string;
  address: string;
  avatarUrl: string;
  academicDegree: string;
  department: string;
  position: string;
  faculty: string;
  researchFields: string[];
  status: string;
  
  // Visibility flags
  showFullName: boolean;
  showGender: boolean;
  showPhoneNumber: boolean;
  showAddress: boolean;
  showAvatar: boolean;
  showAcademicDegree: boolean;
  showDepartment: boolean;
  showPosition: boolean;
  showFaculty: boolean;
  showResearchFields: boolean;
}

export interface UpdateLecturerProfileRequest {
  email?: string;
  fullName?: string;
  gender?: Gender;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
  academicDegree?: string;
  department?: string;
  position?: string;
  faculty?: string;
  researchFields?: string[];
  password?: string;

  // Visibility toggles
  showFullName: boolean;
  showGender: boolean;
  showPhoneNumber: boolean;
  showAddress: boolean;
  showAvatar: boolean;
  showAcademicDegree: boolean;
  showDepartment: boolean;
  showPosition: boolean;
  showFaculty: boolean;
  showResearchFields: boolean;
}