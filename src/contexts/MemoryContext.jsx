import { createContext, useContext, useState } from 'react'

const MemoryContext = createContext()

// Sample initial memories
const initialMemories = [
  {
    id: '1',
    title: 'Morning reflection',
    content: 'Today I woke up feeling anxious about the upcoming presentation. Talking with Lyo helped me realize I was catastrophizing again.',
    date: '2025-02-10T08:30:00Z',
  },
  {
    id: '2',
    title: 'Breakthrough moment',
    content: 'I realized my fear of rejection is connected to childhood experiences. This awareness feels freeing.',
    date: '2025-02-08T18:15:00Z',
  }
]

function MemoryProvider({ children }) {
  const [memories, setMemories] = useState(initialMemories)
  
  const addMemory = (memory) => {
    setMemories([...memories, memory])
  }
  
  const removeMemory = (id) => {
    setMemories(memories.filter(memory => memory.id !== id))
  }
  
  const updateMemory = (id, updatedMemory) => {
    setMemories(memories.map(memory => 
      memory.id === id ? { ...memory, ...updatedMemory } : memory
    ))
  }
  
  const value = {
    memories,
    addMemory,
    removeMemory,
    updateMemory
  }
  
  return <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>
}

function useMemory() {
  const context = useContext(MemoryContext)
  if (context === undefined) {
    throw new Error('useMemory must be used within a MemoryProvider')
  }
  return context
}

export { MemoryProvider, useMemory }

export default MemoryProvider