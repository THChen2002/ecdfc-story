import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import Loading from '@/components/common/Loading/Loading'

export default function PrivateRoute({ children }) {
  const { user, role, loading } = useAuthContext()

  if (loading) {
    return <Loading fullPage text="驗證身份中..." />
  }

  if (!user || role !== 'admin') {
    return <Navigate to="/admin" replace />
  }

  return children
}
