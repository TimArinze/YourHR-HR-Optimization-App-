import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'

export const RequiredAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.token) {
    return <Navigate to='/login' />
  }

  return children
}