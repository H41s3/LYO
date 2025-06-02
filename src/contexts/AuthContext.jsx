import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const signIn = async ({ email, password }) => {
    // For demo purposes, simulate authentication
    setUser({ email })
    return true
  }

  const signUp = async ({ email, password }) => {
    // For demo purposes, simulate registration
    setUser({ email })
    return true
  }

  const signOut = () => {
    setUser(null)
  }

  const value = {
    signUp,
    signIn,
    signOut,
    user,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}