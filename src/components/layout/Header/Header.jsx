import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faXmark,
  faHome,
  faInfoCircle,
  faImages,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '@/constants/siteConfig'
import logo from '@/assets/logo.png'
import styles from './Header.module.css'

const iconMap = {
  home: faHome,
  'info-circle': faInfoCircle,
  images: faImages,
  newspaper: faNewspaper,
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt={SITE_CONFIG.shortName} className={styles.logoImg} />
          <div className={styles.logoText}>
            <span className={styles.logoName}>{SITE_CONFIG.shortName}</span>
            <span className={styles.logoSub}>{SITE_CONFIG.tagline}</span>
          </div>
        </Link>

        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '關閉選單' : '開啟選單'}
          aria-expanded={menuOpen}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className={styles.menuIcon} />
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
              onClick={() => setMenuOpen(false)}
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
