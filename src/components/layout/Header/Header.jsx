import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faHome,
  faInfoCircle,
  faImages,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '@/constants/siteConfig'
import styles from './Header.module.css'

const iconMap = {
  home: faHome,
  'info-circle': faInfoCircle,
  images: faImages,
  newspaper: faNewspaper,
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // 路由變更時自動關閉行動版選單
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <FontAwesomeIcon icon={faHome} />
          </span>
          <div className={styles.logoText}>
            <span className={styles.logoName}>{SITE_CONFIG.shortName}</span>
            <span className={styles.logoSub}>{SITE_CONFIG.organization}</span>
          </div>
        </Link>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '關閉選單' : '開啟選單'}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {SITE_CONFIG.navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              end={link.path === '/'}
            >
              <FontAwesomeIcon
                icon={iconMap[link.icon]}
                className={styles.navIcon}
              />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
