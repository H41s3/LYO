import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const MoodSelector = ({ onChange, initialValue = 50 }) => {
  const [value, setValue] = useState(initialValue)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef(null)
  
  const handleDragStart = () => {
    setIsDragging(true)
  }
  
  const handleDragEnd = () => {
    setIsDragging(false)
  }
  
  const handleDrag = (e) => {
    if (!isDragging || !sliderRef.current) return
    
    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX || (e.touches ? e.touches[0].clientX : 0)
    const relativeX = x - rect.left
    const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100))
    
    setValue(Math.round(percentage))
    onChange(Math.round(percentage))
  }
  
  useEffect(() => {
    const handleMouseMove = (e) => handleDrag(e)
    const handleTouchMove = (e) => handleDrag(e)
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchend', handleDragEnd)
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchend', handleDragEnd)
    }
  }, [isDragging])
  
  // Calculate the mood based on the slider value
  const getMoodText = (value) => {
    if (value < 25) return "Feeling low"
    if (value < 50) return "A bit down"
    if (value < 75) return "Doing okay"
    return "Feeling energetic"
  }
  
  // Calculate the color based on the slider value
  const getMoodColor = (value) => {
    if (value < 25) return "from-error-dark to-error-light"
    if (value < 50) return "from-warning-dark to-warning-light"
    if (value < 75) return "from-neon-blue to-neon-cyan" 
    return "from-success-dark to-success-light"
  }
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-gray-400">
        <span>Low energy</span>
        <span>High energy</span>
      </div>
      
      <div 
        ref={sliderRef}
        className="relative h-2 bg-gray-700 rounded-lg cursor-pointer"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <motion.div
          className={`absolute h-full left-0 rounded-l-lg bg-gradient-to-r ${getMoodColor(value)}`}
          style={{ width: `${value}%` }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.2 }}
        />
        
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 -ml-3"
          style={{ left: `${value}%` }}
          animate={{ left: `${value}%` }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className={`w-6 h-6 rounded-full bg-white shadow-lg cursor-grab ${
              isDragging ? 'cursor-grabbing scale-110' : ''
            } transition-transform duration-200`}
          />
        </motion.div>
      </div>
      
      <div className="text-center mt-3">
        <motion.span 
          className="text-white font-medium"
          key={getMoodText(value)}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getMoodText(value)}
        </motion.span>
      </div>
    </div>
  )
}

export default MoodSelector