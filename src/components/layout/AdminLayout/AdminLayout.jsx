import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faImages,
  faNewspaper,
  faUsers,
  faSignOutAlt,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '@/constants/siteConfig'
import { useAuth } from '@/hooks/useAuth'
import styles from './AdminLayout.module.css'

const iconMap = {
  'chart-line': faChartLine,
  images: faImages,
  newspaper: faNewspaper,
  users: faUsers,
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin')
  }

  return (
    <div className={styles.layout}>
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>管理後台</span>
          <button
            className={styles.closeSidebar}
            onClick={() => setSidebarOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <nav className={styles.sidebarNav}>
          {SITE_CONFIG.adminNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${styles.sidebarLink} ${isActive ? styles.sidebarActive : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon
                icon={iconMap[link.icon]}
                className={styles.sidebarIcon}
              />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className={styles.sidebarIcon}
          />
          <span>登出</span>
        </button>
      </aside>
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <span className={styles.topTitle}>
            {SITE_CONFIG.shortName} 管理後台
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  )
}
