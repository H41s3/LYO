import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiX, FiEdit, FiTrash2 } from 'react-icons/fi'
import { useMemory } from '../contexts/MemoryContext'

const Memory = () => {
  const { memories, addMemory, removeMemory } = useMemory()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMemory, setNewMemory] = useState({ title: '', content: '' })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMemory.title.trim() && newMemory.content.trim()) {
      addMemory({
        ...newMemory,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      })
      setNewMemory({ title: '', content: '' })
      setShowAddForm(false)
    }
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
  
  return (
    <motion.div 
      className="min-h-screen pt-20 pb-6 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-display text-white">Memory Sketchboard</h1>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="neon-button-pink flex items-center"
          >
            <FiPlus className="mr-2" /> Add Memory
          </button>
        </div>
        
        {/* Add Memory Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-4 rounded-xl mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-display text-white">New Memory</h2>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-300 mb-2 text-sm">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={newMemory.title}
                    onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                    className="w-full bg-glass-dark border border-glass-light rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                    placeholder="Give your memory a title"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="content" className="block text-gray-300 mb-2 text-sm">
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={newMemory.content}
                    onChange={(e) => setNewMemory({...newMemory, content: e.target.value})}
                    className="w-full bg-glass-dark border border-glass-light rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan h-32"
                    placeholder="What would you like to remember?"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="mr-2 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-glass-light"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan rounded-lg hover:bg-neon-cyan/30"
                  >
                    Save Memory
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Memory Grid */}
        {memories.length === 0 ? (
          <motion.div 
            className="glass-panel rounded-xl p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 mb-4">Your sketchboard is empty</p>
            <p className="text-sm text-gray-500">
              Save insights from your conversations with Lyo or create new memories
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {memories.map(memory => (
              <motion.div
                key={memory.id}
                className="memory-card bg-glass-medium border-glass-light"
                variants={itemVariants}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-medium mb-1">{memory.title}</h3>
                  <div className="flex space-x-1">
                    <button className="text-gray-400 hover:text-white">
                      <FiEdit size={14} />
                    </button>
                    <button 
                      onClick={() => removeMemory(memory.id)}
                      className="text-gray-400 hover:text-error-DEFAULT"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">{memory.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(memory.date).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Add AnimatePresence to the export
import { AnimatePresence } from 'framer-motion'
export default Memory