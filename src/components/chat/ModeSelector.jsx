import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const modes = [
  { 
    id: 'normal', 
    label: 'Normal Talk', 
    color: 'bg-neon-blue', 
    description: 'Balanced & thoughtful conversation',
    behavior: 'I respond in a balanced way, offering thoughtful insights while keeping the conversation natural and engaging.'
  },
  { 
    id: 'real', 
    label: 'Real Talk', 
    color: 'bg-neon-pink', 
    description: 'Direct & challenging',
    behavior: 'I\'m more direct and willing to challenge your thoughts, while still being supportive and constructive.'
  },
  { 
    id: 'chill', 
    label: 'Chill Talk', 
    color: 'bg-neon-cyan', 
    description: 'Gentle & supportive',
    behavior: 'I keep things relaxed and supportive, focusing on validation and emotional comfort.'
  },
  { 
    id: 'lowbatt', 
    label: 'Low-Batt', 
    color: 'bg-gray-500', 
    description: 'Minimal & comforting',
    behavior: 'I provide brief, comforting responses without asking questions or diving deep.'
  },
]

const ModeSelector = ({ currentMode = 'normal', onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentModeData = modes.find(mode => mode.id === currentMode) || modes[0]
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mode-button bg-glass-light text-white flex items-center gap-2"
      >
        <span className={`w-2 h-2 rounded-full ${currentModeData.color}`}></span>
        {currentModeData.label}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close dropdown when clicking outside */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-midnight border border-glass-light overflow-hidden z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  className={`w-full text-left p-3 flex flex-col gap-1 ${
                    currentMode === mode.id 
                      ? 'bg-glass-medium' 
                      : 'hover:bg-glass-light'
                  }`}
                  onClick={() => {
                    onChange(mode.id)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${mode.color}`}></span>
                    <span className="text-white font-medium">{mode.label}</span>
                  </div>
                  <p className="text-xs text-gray-400 pl-4">{mode.description}</p>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ModeSelector