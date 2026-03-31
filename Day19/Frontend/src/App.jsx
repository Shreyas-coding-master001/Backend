import React from 'react'
import AppRouter from './AppRoutes.jsx';
import { AuthProvider } from './features/auth/auth.context.jsx';
import "./style.scss";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
