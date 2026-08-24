import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 路徑改變時捲回頁面頂端（SPA 切換路由不會自動重置捲動位置）
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
