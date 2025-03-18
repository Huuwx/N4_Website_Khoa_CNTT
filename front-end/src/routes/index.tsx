import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Layouts
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';

// Lazy loaded pages
// const HomePage = lazy(() => import('@/pages/HomePage'));
const ArticleManagement = lazy(() => import('@/pages/ArticleManagement'));
const TeacherPage = lazy(() => import('@/pages/Teacher'));
const ImageManagement = lazy(() => import('@/pages/ImageManagement'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const CategoryManagement = lazy(() => import('@/pages/CategoryManagement'));
const TeacherProfile = lazy(() => import('@/pages/Profile'));

// const AboutPage = lazy(() => import('@/pages/AboutPage'));
// const AcademicsPage = lazy(() => import('@/pages/AcademicsPage'));
// const AdmissionsPage = lazy(() => import('@/pages/AdmissionsPage'));
// const ContactPage = lazy(() => import('@/pages/ContactPage'));
// const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={< HomePage/>} />
          {/* <Route path="about" element={<AboutPage />} />
            <Route path="academics" element={<AcademicsPage />} />
            <Route path="admissions" element={<AdmissionsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} /> */}
          <Route path="articles" element={<ArticleManagement />} />
          <Route path="teachers" element={<TeacherPage />} />
          <Route path="profile" element={<TeacherProfile />} />
          {/* Ví dụ sau có Admin routes */}
          <Route path="admin" element={<AdminPage />}>
              <Route path="articles" element={<ArticleManagement />} />
              <Route path='categories' element={<CategoryManagement/>} />
            </Route>
        </Route>
        <Route path='images' element={<ImageManagement/>} />

      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
