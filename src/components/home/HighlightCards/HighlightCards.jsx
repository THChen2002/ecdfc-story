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
    slug: '解鎖 DFC 思考',
    title: '陪伴孩子改變行動的四個步驟',
    desc: 'DFC（Design For Change）是一套引導孩子透過「感受、想像、實踐、分享」四個步驟，主動發現身邊的問題，並發展行動力。',
    illust: illust1,
    tint: '#f0e0c2',
    stroke: '#d8b98c',
    dots: dotsBlue,
    accent: footprints,
    alt: '孩子在探索與創作',
  },
  {
    slug: '結合 SEL ✕ SDGs',
    title: 'SEL ✕ SDGs 融入幼兒園生活日常',
    desc: '引導師生從情緒同理與自我覺察出發，對接真實世界的永續議題，兼具心靈韌性與全球視野。',
    illust: illust2,
    tint: '#e5ecd2',
    stroke: '#b8cf90',
    dots: dotsOrange,
    accent: sparkle,
    alt: '孩子親近植物與自然',
  },
  {
    slug: '實習實踐',
    title: '走入真實教學現場',
    desc: '透過實習將 DFC 精神融入幼兒園的課程設計、例行活動，陪伴孩子一起展開行動。',
    illust: illust3,
    tint: '#f6e2d2',
    stroke: '#e3b79b',
    dots: dotsYellow,
    accent: footprints,
    alt: '老師陪伴孩子學習',
  },
  {
    slug: '聲影留存',
    title: '紀錄真實生命經驗',
    desc: '在實踐過程中，運用照片、影片，捕捉並珍藏孩子們在行動中的歷程。',
    illust: illust4,
    tint: '#f2e7cb',
    stroke: '#d9c48f',
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
      <div className={`${styles.illusWrap} ${styles.animIllus}`}>
        <span
          className={styles.blob}
          style={{ borderColor: c.stroke }}
          aria-hidden="true"
        />
        <img src={c.illust} alt={c.alt} className={styles.illusImage} />
        {/* 腳印／閃光貼在圓圈外側，不遮住圓內插圖 */}
        <img src={c.accent} alt="" aria-hidden="true" className={styles.decoAccent} />
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
          <p className={styles.introLead}>
            當日常教學牽起永續想像，串聯著社會情緒的學習
            <br />
            我們用一個個溫柔卻有力的故事，讓孩子學會關心、行動與影響世界
          </p>
        </div>

        {concepts.map((c, idx) => (
          <ConceptRow key={c.slug} c={c} idx={idx} />
        ))}
      </div>
    </section>
  )
}
