import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSettings } from '../../contexts/SettingsContext'

const Background = () => {
  const canvasRef = useRef(null)
  const { settings } = useSettings()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    const particlesArray = []
    const numberOfParticles = 100
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = settings.darkMode ? 
          (Math.random() > 0.5 ? '#00e5ff' : '#4361ee') :
          (Math.random() > 0.5 ? '#818cf8' : '#6366f1')
        this.opacity = Math.random() * 0.3 + 0.1
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }
      
      draw() {
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      
      ctx.globalAlpha = 0.03
      ctx.strokeStyle = settings.darkMode ? '#4361ee' : '#818cf8'
      ctx.lineWidth = 0.5
      
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }
      
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    init()
    animate()
    
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [settings.darkMode])

  return (
    <motion.div 
      className={`fixed inset-0 -z-10 ${
        settings.darkMode 
          ? 'bg-gradient-to-b from-space to-midnight' 
          : 'bg-gradient-to-b from-indigo-50/50 to-white'
      } overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-70"
      />
    </motion.div>
  )
}

export default Background