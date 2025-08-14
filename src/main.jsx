import React from 'react' // 👈 This is the missing import
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './contexts/appContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>

)