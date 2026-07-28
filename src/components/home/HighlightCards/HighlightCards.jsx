import { useInView } from '@/hooks/useInView'
import styles from './HighlightCards.module.css'
import illust1 from '@/assets/illust-1.png'
import illust2 from '@/assets/illust-2.png'
import illust3 from '@/assets/illust-3.png'
import illust4 from '@/assets/illust-4.png'
import dotsBlue from '@/assets/dots-blue.png'
import dotsOrange from '@/assets/dots-orange.png'
import dotsYellow from '@/assets/dots-yellow.png'
import footprints from '@/assets/deco-footprints.png'
import sparkle from '@/assets/deco-sparkle.png'
import exploreBubble from '@/assets/title-explore-bubble.png'

const concepts = [
  {
    slug: '設計即思考',
    title: 'DFC 四步驟引導孩子主動解決問題',
    desc: '透過「感受、想像、實踐、分享」的歷程，讓幼兒從生活情境中發現議題、提出方案，培養同理心與行動力。',
    illust: illust1,
    tint: '#f0e0c2',
    dots: dotsBlue,
    accent: footprints,
    alt: '孩子在探索與創作',
  },
  {
    slug: '永續即未來',
    title: 'SDGs 融入幼兒園日常課程',
    desc: '將聯合國永續發展目標化為孩子可以理解的故事，從一棵植物、一場分享開始建立全球公民素養。',
    illust: illust2,
    tint: '#e5ecd2',
    dots: dotsOrange,
    accent: sparkle,
    alt: '孩子親近植物與自然',
  },
  {
    slug: '教育即溫度',
    title: '社會情緒學習陪伴每個孩子成長',
    desc: '重視自我覺察、情緒管理與人際互動，讓孩子在被理解與被支持的環境中，發展健全的人格與自信。',
    illust: illust3,
    tint: '#f6e2d2',
    dots: dotsYellow,
    accent: footprints,
    alt: '老師陪伴孩子學習',
  },
  {
    slug: '故事即實踐',
    title: '用聲影記錄孩子的真實生命經驗',
    desc: '結合多媒體與真實場景，把每一段探索旅程留下來，成為孩子可以回望、家長可以共讀的成長故事。',
    illust: illust4,
    tint: '#f2e7cb',
    dots: dotsBlue,
    accent: sparkle,
    alt: '孩子閱讀與分享故事',
  },
]

function ConceptRow({ c, idx }) {
  const reverse = idx % 2 === 1
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <article
      ref={ref}
      className={`${styles.row} ${reverse ? styles.reverse : ''} ${styles.animRow} ${
        inView ? styles.inView : ''
      }`}
    >
      <img src={c.dots} alt="" aria-hidden="true" className={styles.decoDots} />
      <img src={c.accent} alt="" aria-hidden="true" className={styles.decoAccent} />
      <div className={`${styles.illusWrap} ${styles.animIllus}`}>
        <span
          className={styles.blob}
          style={{ background: c.tint }}
          aria-hidden="true"
        />
        <img src={c.illust} alt={c.alt} className={styles.illusImage} />
      </div>
      <div className={`${styles.text} ${styles.animText}`}>
        <span className={styles.slug}>{c.slug}</span>
        <h3 className={styles.title}>{c.title}</h3>
        <p className={styles.desc}>{c.desc}</p>
      </div>
    </article>
  )
}

export default function HighlightCards() {
  const [introRef, introIn] = useInView({ threshold: 0.3 })

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          ref={introRef}
          className={`${styles.intro} ${introIn ? styles.introIn : ''}`}
        >
          <div className={styles.titleBubble}>
            <img
              src={exploreBubble}
              alt=""
              aria-hidden="true"
              className={styles.titleBubbleImg}
            />
            <h2 className={styles.sectionTitle}>探索DFC</h2>
          </div>
        </div>

        {concepts.map((c, idx) => (
          <ConceptRow key={c.slug} c={c} idx={idx} />
        ))}
      </div>
    </section>
  )
}
