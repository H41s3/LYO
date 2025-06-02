import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

// Default settings
const defaultSettings = {
  voiceEnabled: false,
  language: 'english',
  avatarStyle: 'holographic',
  notifications: false
}

export function SettingsProvider({ children }) {
  // Initialize state from localStorage or default settings
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('lyoSettings')
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings
  })
  
  // Request notification permission when notifications are enabled
  useEffect(() => {
    if (settings.notifications && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [settings.notifications])
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lyoSettings', JSON.stringify(settings))
  }, [settings])
  
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const sendNotification = (title, body) => {
    if (settings.notifications && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/src/assets/lyo-favicon.svg'
      })
    }
  }
  
  const value = {
    settings,
    updateSettings,
    sendNotification
  }
  
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}