import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthWrapper from './components/AuthWrapper'
import Sidebar from './components/Sidebar'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import DonateModal from './components/DonateModal'
import { useAppContext } from './contexts/AppContext'


const App = () => {
  const { displayDonateModal} = useAppContext()


  return (
      <div>
      
        



    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/messages" element={
          
          <AuthWrapper>
            <Messages/>
          </AuthWrapper>
          } />
        <Route path="/settings" element={
          
          <AuthWrapper>
            <Settings/>
          </AuthWrapper>
          } />

      </Routes>
    </Router>
    </div>
  )
}

export default App
