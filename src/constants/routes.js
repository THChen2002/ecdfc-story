export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PORTFOLIO: '/portfolio',
  PORTFOLIO_DETAIL: '/portfolio/:id',
  NEWS: '/news',
  ADMIN_LOGIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PORTFOLIO: '/admin/portfolio',
  ADMIN_PORTFOLIO_EDIT: '/admin/portfolio/:id',
  ADMIN_NEWS: '/admin/news',
  ADMIN_NEWS_EDIT: '/admin/news/:id',
}

export const getPortfolioDetailPath = (id) => `/portfolio/${id}`
export const getNewsDetailPath = (id) => `/news/${id}`
export const getAdminPortfolioEditPath = (id) => `/admin/portfolio/${id}`
export const getAdminNewsEditPath = (id) => `/admin/news/${id}`
