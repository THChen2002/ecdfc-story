import styles from './Tag.module.css'

export default function Tag({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) {
  return (
    <span
      className={`${styles.tag} ${styles[variant]} ${styles[size]} ${className}`}
    >
      {children}
    </span>
  )
}
