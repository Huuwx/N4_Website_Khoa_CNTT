import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PrivateRoute from '@/components/common/PrivateRoute';

// Layouts
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';

// Lazy loaded pages
const ArticleManagement = lazy(() => import('@/pages/ArticleManagement'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const LecturerList = lazy(() => import('@/pages/LecturerList'));
const LecturerDetail = lazy(() => import('@/pages/LecturerList/LecturerDetail'));
const TeacherPage = lazy(() => import('@/pages/Teacher'));
const LecturerManagement = lazy(() => import('@/pages/admin/lecturer-management'));
const CategoryManagement = lazy(() => import('@/pages/admin/category-management'));
const SliderManagement = lazy(() => import('@/pages/admin/slider-management'));
const TeacherProfile = lazy(() => import('@/pages/Profile'));
const DanhMucPage = lazy(() => import("@/pages/DanhMucPage"));
const QuanLyAnhPage = lazy(() => import("@/pages/Home"));
const ConfigQLAnh = lazy(() => import("@/pages/Config"));
const LienHeForm = lazy(() => import("@/components/LienHeForm"));
const LienHeTable = lazy(() => import("@/components/LienHeTable"));
const LienHeDetail = lazy(() => import("@/components/LienHeDetail"));

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/lienheform" element={<LienHeForm refreshData={() => {}} />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Public Article Routes */}
          <Route path="thong-bao/:id" element={<ArticleDetail />} />
          <Route path="tin-tuc/:id" element={<ArticleDetail />} />
          
          {/* Lecturer Routes */}
          <Route path="doi-ngu-giang-vien" element={<LecturerList />} />
          <Route path="doi-ngu-giang-vien/:id" element={<LecturerDetail />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="teachers" element={<TeacherPage />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="danhmuc" element={<DanhMucPage />} />
            <Route path="images" element={<QuanLyAnhPage />} />
            <Route path="config" element={<ConfigQLAnh />} />
            
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
            <Route path="admin" element={<LecturerManagement />}>
              {/* <Route path="quan-ly-bai-viet" element={<ArticleManagement />} /> */}
            </Route>
            <Route path="/quan-ly-tai-khoan" element={<LecturerManagement />} />
            <Route path="/quan-ly-danh-muc" element={<CategoryManagement />} />
            <Route path="/quan-ly-bai-viet" element={<ArticleManagement />} />
            <Route path="/quan-ly-anh-dong" element={<SliderManagement />} />
            <Route path="/quan-ly-yeu-cau-lien-he" element={<LienHeTable />} />
            <Route path="/quan-ly-yeu-cau-lien-he/:id" element={<LienHeDetail />} />
          </Route>
        </Route>

      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
