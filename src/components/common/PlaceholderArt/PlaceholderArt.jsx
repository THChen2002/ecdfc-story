import styles from './PlaceholderArt.module.css'
import logo from '@/assets/logo.png'
import { SITE_CONFIG } from '@/constants/siteConfig'

// 無封面圖時的預覽 — 卡片邊框色的淡色底 + 淡化的網站 logo 置中
export default function PlaceholderArt({ className = '', bg = '#efe6d1' }) {
  return (
    <div className={`${styles.wrap} ${className}`} style={{ background: bg }}>
      <img src={logo} alt="" aria-hidden="true" className={styles.logo} />
      <span className={styles.name}>{SITE_CONFIG.shortName}</span>
    </div>
  )
}
