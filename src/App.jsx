import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from './contexts/AuthContext'

// Pages
import Landing from './pages/Landing'
import Chat from './pages/Chat'
import Memory from './pages/Memory'
import Settings from './pages/Settings'
import Auth from './pages/Auth'

// Components
import Navbar from './components/layout/Navbar'
import Background from './components/ui/Background'

function App() {
  const location = useLocation()
  const { user, loading } = useAuth()
  
  useEffect(() => {
    document.title = 'Lyo - Emotional Clarity AI'
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-neon-cyan">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <Background />
      
      {location.pathname !== '/' && location.pathname !== '/auth' && <Navbar />}
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/chat" element={user ? <Chat /> : <Auth />} />
            <Route path="/memory" element={user ? <Memory /> : <Auth />} />
            <Route path="/settings" element={user ? <Settings /> : <Auth />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App