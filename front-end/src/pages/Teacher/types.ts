export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  department: string;
  academicTitle: string;
  researchFields: string[];
  avatar: string;
  showEmail: boolean;
  showPhone: boolean;
}