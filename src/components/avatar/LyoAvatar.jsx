import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useSettings } from '../../contexts/SettingsContext'

const LyoAvatar = ({ mood = 50 }) => {
  const containerRef = useRef()
  const rendererRef = useRef()
  const sceneRef = useRef()
  const cameraRef = useRef()
  const avatarRef = useRef()
  const { settings } = useSettings()
  
  // Calculate color based on mood
  const getMoodColor = () => {
    if (mood < 25) return 0xff4444 // Red for sad
    if (mood < 50) return 0xf59e0b // Orange for somewhat down
    if (mood < 75) return 0x00e5ff // Cyan for neutral/okay
    return 0x10b981 // Green for energetic
  }
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Initialize Three.js scene
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    
    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 10, 5)
    scene.add(directionalLight)
    
    // Create avatar based on style
    const createAvatar = () => {
      // Remove existing avatar if any
      if (avatarRef.current) {
        scene.remove(avatarRef.current)
      }
      
      const avatarGroup = new THREE.Group()
      
      if (settings.avatarStyle === 'holographic') {
        // Wireframe sphere (head)
        const headGeometry = new THREE.SphereGeometry(1.5, 16, 16)
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: getMoodColor(),
          wireframe: true,
          transparent: true,
          opacity: 0.7
        })
        const head = new THREE.Mesh(headGeometry, wireframeMaterial)
        avatarGroup.add(head)
        
        // Glowing eyes
        const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16)
        const eyeMaterial = new THREE.MeshBasicMaterial({
          color: getMoodColor(),
          transparent: true,
          opacity: 0.9
        })
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
        leftEye.position.set(-0.5, 0.2, 1)
        avatarGroup.add(leftEye)
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
        rightEye.position.set(0.5, 0.2, 1)
        avatarGroup.add(rightEye)
      } else if (settings.avatarStyle === 'pixel') {
        // Create pixelated cube-based avatar
        const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
        const cubeMaterial = new THREE.MeshBasicMaterial({
          color: getMoodColor()
        })
        
        // Create cube grid for pixelated look
        for (let x = -5; x <= 5; x++) {
          for (let y = -5; y <= 5; y++) {
            if (Math.random() > 0.7) {
              const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
              cube.position.set(x * 0.2, y * 0.2, 0)
              avatarGroup.add(cube)
            }
          }
        }
      } else if (settings.avatarStyle === 'cartoon') {
        // Create cartoon-style avatar with simple shapes
        const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 32)
        const bodyMaterial = new THREE.MeshToonMaterial({
          color: getMoodColor(),
          transparent: true,
          opacity: 0.9
        })
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        avatarGroup.add(body)
        
        // Add cartoon eyes
        const eyeGeometry = new THREE.CircleGeometry(0.2, 32)
        const eyeMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff
        })
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
        leftEye.position.set(-0.4, 0.2, 1.1)
        avatarGroup.add(leftEye)
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
        rightEye.position.set(0.4, 0.2, 1.1)
        avatarGroup.add(rightEye)
      }
      
      scene.add(avatarGroup)
      avatarRef.current = avatarGroup
    }
    
    createAvatar()
    
    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      
      if (avatarRef.current) {
        avatarRef.current.rotation.y += 0.005
        
        // Subtle floating animation
        avatarRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1
      }
      
      renderer.render(scene, camera)
      
      return () => {
        cancelAnimationFrame(animationId)
      }
    }
    
    animate()
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
    }
  }, [settings.avatarStyle]) // Recreate avatar when style changes
  
  // Update colors based on mood changes
  useEffect(() => {
    if (!avatarRef.current) return
    
    const color = getMoodColor()
    
    avatarRef.current.children.forEach(child => {
      if (child.material) {
        child.material.color.setHex(color)
      }
    })
  }, [mood])
  
  return (
    <motion.div 
      ref={containerRef}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    ></motion.div>
  )
}

export default LyoAvatar