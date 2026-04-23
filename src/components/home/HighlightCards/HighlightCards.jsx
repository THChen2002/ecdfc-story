import { useInView } from '@/hooks/useInView'
import {
  WatercolorSpot,
  GrowingLeaves,
  LeafSprig,
  WaterDrop,
  DoodleCloud,
  FlatRabbit,
  FlatDeer,
  FlatTree,
} from '@/components/common/Decorations/Decorations'
import styles from './HighlightCards.module.css'

const concepts = [
  {
    slug: '設計即思考',
    title: 'DFC 四步驟引導孩子主動解決問題',
    desc: '透過「感受、想像、實踐、分享」的歷程，讓幼兒從生活情境中發現議題、提出方案，培養同理心與行動力。',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    alt: '孩子在探索與創作',
    sprigColor: '#7BC5A0',
    dropColor: '#E88B8B',
  },
  {
    slug: '永續即未來',
    title: 'SDGs 融入幼兒園日常課程',
    desc: '將聯合國永續發展目標化為孩子可以理解的故事，從一棵植物、一場分享開始建立全球公民素養。',
    image: 'https://images.unsplash.com/photo-1597392582469-a697322d5c16?auto=format&fit=crop&w=900&q=80',
    alt: '孩子親近植物與自然',
    sprigColor: '#E8742A',
    dropColor: '#7BC5A0',
  },
  {
    slug: '教育即溫度',
    title: '社會情緒學習陪伴每個孩子成長',
    desc: '重視自我覺察、情緒管理與人際互動，讓孩子在被理解與被支持的環境中，發展健全的人格與自信。',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    alt: '老師陪伴孩子學習',
    sprigColor: '#7BC5A0',
    dropColor: '#F2C94C',
  },
  {
    slug: '故事即實踐',
    title: '用聲影記錄孩子的真實生命經驗',
    desc: '結合多媒體與真實場景，把每一段探索旅程留下來，成為孩子可以回望、家長可以共讀的成長故事。',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
    alt: '孩子閱讀與分享故事',
    sprigColor: '#E8742A',
    dropColor: '#7BC5A0',
  },
]

function ConceptRow({ c, idx }) {
  const reverse = idx % 2 === 1
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <article
      ref={ref}
      className={`${styles.row} ${reverse ? styles.reverse : ''} ${styles.animRow} ${
        reverse ? styles.fromRight : styles.fromLeft
      } ${inView ? styles.inView : ''}`}
    >
      <div className={`${styles.illustration} ${styles.animIllus}`}>
        {/* blob 邊緣長出的嫩枝與水滴 */}
        <LeafSprig size={54} color={c.sprigColor} className={styles.illusSprigTop} />
        <LeafSprig size={42} color={c.sprigColor} className={styles.illusSprigSide} />
        <WaterDrop size={22} color={c.dropColor} className={styles.illusDrop} />

        <img src={c.image} alt={c.alt} className={styles.illusImage} />
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
      {/* 背景水彩暈染 */}
      <WatercolorSpot color="#F2C94C" size={320} className={styles.bgSpot1} />
      <WatercolorSpot color="#7BC5A0" size={280} className={styles.bgSpot2} />

      {/* 主視覺 — 兩組大葉群取代多個散佈小圖 */}
      <GrowingLeaves
        size={360}
        mainColor="#7BC5A0"
        lineColor="#4A8A6A"
        className={styles.bigLeaves1}
      />

      {/* 少量 flat 動物點綴 */}
      <FlatTree size={140} className={styles.scatterTree} />
      <FlatRabbit size={100} className={styles.scatterRabbit} />
      <FlatDeer size={130} className={styles.scatterDeer} />
      <DoodleCloud size={190} className={styles.scatterCloud} />

      <div className={styles.container}>
        <div
          ref={introRef}
          className={`${styles.intro} ${styles.animIntro} ${introIn ? styles.inView : ''}`}
        >
          <p className={styles.introLead}>用初見生命的感動，實踐教育的初心</p>
          <h2 className={styles.sectionTitle}>探索初心</h2>
          <p className={styles.introDesc}>
            以 DFC 設計思考結合 SDGs 永續理念，<br />
            陪伴每個孩子用故事走進真實的世界。
          </p>
        </div>

        {concepts.map((c, idx) => (
          <ConceptRow key={c.slug} c={c} idx={idx} />
        ))}
      </div>
    </section>
  )
}
