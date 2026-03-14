import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'
import AdminLayout from '@/components/layout/AdminLayout/AdminLayout'
import Loading from '@/components/common/Loading/Loading'
import PrivateRoute from './PrivateRoute'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const PortfolioListPage = lazy(() => import('@/pages/PortfolioListPage'))
const PortfolioDetailPage = lazy(() => import('@/pages/PortfolioDetailPage'))
const NewsPage = lazy(() => import('@/pages/NewsPage'))
const AdminLoginPage = lazy(() => import('@/pages/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'))
const AdminPortfolioPage = lazy(() => import('@/pages/AdminPortfolioPage'))
const AdminPortfolioEditPage = lazy(() => import('@/pages/AdminPortfolioEditPage'))
const AdminNewsPage = lazy(() => import('@/pages/AdminNewsPage'))
const AdminNewsEditPage = lazy(() => import('@/pages/AdminNewsEditPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

function AdminRoute({ children }) {
  return (
    <PrivateRoute>
      <AdminLayout>{children}</AdminLayout>
    </PrivateRoute>
  )
}

export default function AppRouter() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading fullPage />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/news" element={<PublicLayout><NewsPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><PortfolioListPage /></PublicLayout>} />
          <Route path="/portfolio/:id" element={<PublicLayout><PortfolioDetailPage /></PublicLayout>} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/portfolio" element={<AdminRoute><AdminPortfolioPage /></AdminRoute>} />
          <Route path="/admin/portfolio/:id" element={<AdminRoute><AdminPortfolioEditPage /></AdminRoute>} />
          <Route path="/admin/news" element={<AdminRoute><AdminNewsPage /></AdminRoute>} />
          <Route path="/admin/news/:id" element={<AdminRoute><AdminNewsEditPage /></AdminRoute>} />

          {/* 404 */}
          <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
