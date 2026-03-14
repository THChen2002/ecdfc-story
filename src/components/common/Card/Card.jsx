import styles from './Card.module.css'

export default function Card({
  children,
  hover = true,
  padding = true,
  className = '',
  onClick,
  ...props
}) {
  const classNames = [
    styles.card,
    hover ? styles.hover : '',
    padding ? styles.padded : '',
    onClick ? styles.clickable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames} onClick={onClick} {...props}>
      {children}
    </div>
  )
}

export function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`${styles.imageWrapper} ${className}`}>
      <img src={src} alt={alt} loading="lazy" className={styles.image} />
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`${styles.body} ${className}`}>
      {children}
    </div>
  )
}
