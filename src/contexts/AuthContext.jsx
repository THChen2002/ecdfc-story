import { createContext, useContext, useEffect, useReducer } from 'react'
import { onAuthChange, getUserRole } from '@/services/authService'

const AuthContext = createContext(null)

const initialState = {
  user: null,
  role: null,
  loading: true,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload.user, role: action.payload.role, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        const role = await getUserRole(user.uid)
        dispatch({ type: 'SET_USER', payload: { user, role } })
      } else {
        dispatch({ type: 'SET_USER', payload: { user: null, role: null } })
      }
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
