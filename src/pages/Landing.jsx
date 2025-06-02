import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LyoAvatar from '../components/avatar/LyoAvatar'
import MoodSelector from '../components/ui/MoodSelector'
import { useMood } from '../contexts/MoodContext'
import QuoteDisplay from '../components/ui/QuoteDisplay'

const Landing = () => {
  const navigate = useNavigate()
  const { mood, setMood } = useMood()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleStartChat = () => {
    setIsLoading(true)
    // Simulating loading for avatar preparation
    setTimeout(() => {
      navigate('/chat')
    }, 1000)
  }
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col justify-center items-center px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl md:text-6xl font-display text-white mb-2 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Meet <span className="glow-text">LYO</span>
      </motion.h1>
      
      <motion.p 
        className="text-gray-300 text-center max-w-xl mb-12"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Your emotionally intelligent AI companion for clarity and reflection
      </motion.p>
      
      <div className="w-full max-w-6xl flex flex-col items-center">
        <motion.div 
          className="relative h-64 md:h-96 w-full max-w-md flex justify-center items-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-neon-cyan/20 filter blur-xl animate-pulse"></div>
            <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-neon-pink/10 filter blur-xl animate-pulse"></div>
          </div>
          <LyoAvatar mood={mood} />
        </motion.div>
        
        <motion.div 
          className="glass-panel p-6 rounded-2xl w-full max-w-lg mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-lg text-white mb-4 text-center font-display">How are you feeling today?</h2>
          <MoodSelector onChange={setMood} initialValue={mood} />
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12 w-full max-w-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button 
            onClick={handleStartChat}
            disabled={isLoading}
            className={`neon-button-cyan flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="mr-2">
                <svg className="animate-spin h-5 w-5 text-neon-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : null}
            Start talking to Lyo
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-full max-w-lg"
        >
          <QuoteDisplay />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Landing