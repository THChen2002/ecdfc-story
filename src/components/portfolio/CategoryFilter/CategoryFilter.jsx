import styles from './CategoryFilter.module.css'

export default function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}) {
  return (
    <div className={styles.filter}>
      {categories.map((cat) => (
        <button
          key={cat.value}
          className={`${styles.btn} ${
            activeCategory === cat.value ? styles.active : ''
          }`}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
