import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        style={{
          fontSize: '4rem',
          color: 'var(--color-secondary)',
          marginBottom: '1.5rem',
        }}
      />
      <h1 style={{
        fontSize: 'var(--font-size-4xl)',
        fontWeight: 900,
        color: 'var(--color-text)',
        marginBottom: '0.5rem',
      }}>
        404
      </h1>
      <p style={{
        fontSize: 'var(--font-size-lg)',
        color: 'var(--color-text-light)',
        marginBottom: '2rem',
      }}>
        找不到您要的頁面
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: 'var(--color-primary)',
          color: 'white',
          borderRadius: 'var(--radius-xl)',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'var(--transition-normal)',
        }}
      >
        <FontAwesomeIcon icon={faHome} />
        回到首頁
      </Link>
    </div>
  )
}
