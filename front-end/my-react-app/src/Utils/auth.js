import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const login = (newToken) => {
    setToken(newToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token') // remove token from local storage
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
// Path: src/Components/Login.js