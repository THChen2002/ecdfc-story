import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLoginPage() {
  const { user, isAdmin, login, logout, error, isLoggingIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard')
    }
  }, [user, isAdmin, navigate])

  const handleGoogleLogin = async () => {
    try {
      await login()
    } catch {
      // error handled in useAuth
    }
  }

  const handleLogoutAndRetry = async () => {
    await logout()
  }

  // 已登入但非 admin
  const isUnauthorized = user && !isAdmin

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #F09450 0%, #FFF3E6 100%)',
      padding: '1.5rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'white',
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        boxShadow: '0 8px 32px rgba(91, 184, 212, 0.2)',
        textAlign: 'center',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: isUnauthorized ? '#fef2f2' : '#FFF5ED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <FontAwesomeIcon icon={faLock} style={{
            fontSize: '1.75rem',
            color: isUnauthorized ? '#dc2626' : '#E8742A',
          }} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#2d3436' }}>
          管理後台
        </h1>
        <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '2rem' }}>
          ECDFC-Story 計畫管理系統
        </p>

        {error && (
          <div style={{
            padding: '0.75rem',
            background: '#fef2f2',
            color: '#dc2626',
            borderRadius: '12px',
            fontSize: '0.875rem',
            marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {isUnauthorized ? (
          <div>
            <div style={{
              padding: '1rem',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: '12px',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
            }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                {user.email}
              </p>
              <p>此帳號沒有管理員權限，請聯繫系統管理員。</p>
            </div>
            <button
              onClick={handleLogoutAndRetry}
              style={{
                width: '100%',
                padding: '0.875rem 1.5rem',
                background: '#f5f5f5',
                color: '#555',
                border: 'none',
                borderRadius: '9999px',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              切換帳號
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1.5rem',
              background: 'white',
              color: '#2d3436',
              border: '2px solid #e0e0e0',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoggingIn ? 'not-allowed' : 'pointer',
              transition: '0.2s ease',
              fontFamily: 'inherit',
              opacity: isLoggingIn ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoggingIn) {
                e.currentTarget.style.borderColor = '#E8742A'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(91,184,212,0.2)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e0e0e0'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            {isLoggingIn ? '登入中...' : '使用 Google 帳號登入'}
          </button>
        )}
      </div>
    </div>
  )
}
