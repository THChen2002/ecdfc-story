import {
  WatercolorSpot,
  GrowingLeaves,
  FruitTomato,
  FruitWatermelon,
  FruitOrange,
  DoodleCloud,
  FlatBird,
} from '@/components/common/Decorations/Decorations'
import styles from './PageHero.module.css'

const FRUIT_MAP = {
  tomato: FruitTomato,
  watermelon: FruitWatermelon,
  orange: FruitOrange,
}

export default function PageHero({
  icon,
  lead,
  title,
  desc,
  fruit = 'tomato',
}) {
  const FruitComponent = FRUIT_MAP[fruit] ?? FruitTomato

  return (
    <section className={styles.hero}>
      {/* 背景水彩暈染 */}
      <WatercolorSpot color="#F2C94C" size={300} className={styles.bgSpot1} />
      <WatercolorSpot color="#E88B8B" size={220} className={styles.bgSpot2} />

      {/* 主視覺 — 一片大葉群從左下延伸 */}
      <GrowingLeaves
        size={340}
        mainColor="#7BC5A0"
        lineColor="#4A8A6A"
        className={styles.bigLeaves}
      />

      {/* 點綴：飄浮雲朵與小鳥 */}
      <DoodleCloud size={200} className={styles.cloud} />
      <FlatBird size={70} className={styles.bird} />

      <div className={styles.content}>
        <div className={styles.seedWrap}>
          <FruitComponent size={110} className={styles.seedCenter} />
        </div>
        {lead && <p className={styles.lead}>{lead}</p>}
        {title && <h1 className={styles.title}>{title}</h1>}
        {desc && <p className={styles.desc}>{desc}</p>}
      </div>

    </section>
  )
}
