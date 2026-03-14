import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* 裝飾：雲朵、星星 */}
      <div className={styles.bgDecor}>
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
        <div className={`${styles.cloud} ${styles.cloud3}`} />
        <div className={`${styles.star} ${styles.star1}`} />
        <div className={`${styles.star} ${styles.star2}`} />
        <div className={`${styles.star} ${styles.star3}`} />
        <div className={`${styles.star} ${styles.star4}`} />
      </div>

      <div className={styles.content}>
        <p className={styles.badge}>Design for Change</p>
        <h1 className={styles.title}>
          DFC × SDGs
          <br />
          <span className={styles.highlight}>幼教聲影故事</span>
        </h1>
        <p className={styles.subtitle}>
          精進師資素質與特色發展計畫
        </p>
        <p className={styles.desc}>
          當日常教學牽起永續的想像，
          我們用一個個溫柔卻有力的故事，
          讓孩子學會關心、行動與影響世界！
        </p>

        {/* DFC 四步驟 */}
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepIcon} style={{ background: '#f4a4a4' }}>
              <i className="fas fa-heart" />
            </span>
            <span className={styles.stepLabel}>感受</span>
            <span className={styles.stepEn}>FEEL</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon} style={{ background: '#f2c94c' }}>
              <i className="fas fa-lightbulb" />
            </span>
            <span className={styles.stepLabel}>想像</span>
            <span className={styles.stepEn}>IMAGINE</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon} style={{ background: '#6bc5a0' }}>
              <i className="fas fa-pencil-alt" />
            </span>
            <span className={styles.stepLabel}>實踐</span>
            <span className={styles.stepEn}>DO</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon} style={{ background: '#f2994a' }}>
              <i className="fas fa-share-alt" />
            </span>
            <span className={styles.stepLabel}>分享</span>
            <span className={styles.stepEn}>SHARE</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/portfolio" className={styles.btnPrimary}>
            <FontAwesomeIcon icon={faBookOpen} />
            <span>瀏覽成果</span>
          </Link>
          <Link to="/about" className={styles.btnOutline}>
            <span>了解更多</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </section>
  )
}
