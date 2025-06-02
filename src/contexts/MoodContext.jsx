import { createContext, useContext, useState } from 'react'

const MoodContext = createContext()

export function MoodProvider({ children }) {
  const [mood, setMood] = useState(50) // Default to neutral mood
  
  const value = {
    mood,
    setMood
  }
  
  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>
}

export function useMood() {
  return useContext(MoodContext)
}