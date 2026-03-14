import { useState } from 'react'
import { loginWithGoogle, logout } from '@/services/authService'
import { useAuthContext } from '@/contexts/AuthContext'

export const useAuth = () => {
  const { user, role, loading } = useAuthContext()
  const [error, setError] = useState(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async () => {
    setError(null)
    setIsLoggingIn(true)
    try {
      await loginWithGoogle()
    } catch (err) {
      setError('登入失敗，請重試')
      throw err
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return {
    user,
    role,
    isAdmin: role === 'admin',
    loading,
    error,
    isLoggingIn,
    login: handleLogin,
    logout: handleLogout,
  }
}
