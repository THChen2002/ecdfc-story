import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '@/constants/siteConfig'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.about}>
            <h3 className={styles.title}>{SITE_CONFIG.shortName}</h3>
            <p className={styles.desc}>{SITE_CONFIG.fullTitle}</p>
            <p className={styles.org}>{SITE_CONFIG.organization}</p>
          </div>
          <div className={styles.links}>
            <h4 className={styles.subtitle}>快速連結</h4>
            <ul className={styles.linkList}>
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.link}>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={styles.linkIcon}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.contact}>
            <h4 className={styles.subtitle}>聯絡資訊</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className={styles.contactIcon}
                />
                <span>{SITE_CONFIG.footer.address}</span>
              </div>
              <div className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faPhone}
                  className={styles.contactIcon}
                />
                <span>{SITE_CONFIG.footer.phone}</span>
              </div>
              <div className={styles.contactItem}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.contactIcon}
                />
                <span>{SITE_CONFIG.footer.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.container}>
          <p className={styles.copyright}>{SITE_CONFIG.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
