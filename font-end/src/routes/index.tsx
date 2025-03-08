import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Layouts
import MainLayout from '@/components/layout/MainLayout';

// Lazy loaded pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const ArticleManagement = lazy(() => import('@/pages/ArticleManagement'));
const TeacherPage = lazy(() => import('@/pages/Teacher'));

// const AboutPage = lazy(() => import('@/pages/AboutPage'));
// const AcademicsPage = lazy(() => import('@/pages/AcademicsPage'));
// const AdmissionsPage = lazy(() => import('@/pages/AdmissionsPage'));
// const ContactPage = lazy(() => import('@/pages/ContactPage'));
// const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="about" element={<AboutPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} /> */}
          <Route path="articles" element={<ArticleManagement />} />
          <Route path="teachers" element={<TeacherPage />} />

           {/* Ví dụ sau có Admin routes */}
          {/* <Route path="/admin" element={<AdminLayout />}>
            <Route path="articles" element={<ArticleManagement />} />
             thêm các route khác ở đây
          </Route> */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
