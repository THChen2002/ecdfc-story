import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {!loading && icon && iconPosition === 'left' && (
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      )}
    </button>
  )
}
