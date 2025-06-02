import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMic, FiPenTool } from 'react-icons/fi'

import LyoAvatar from '../components/avatar/LyoAvatar'
import ModeSelector from '../components/chat/ModeSelector'
import { useMood } from '../contexts/MoodContext'
import { useChat } from '../contexts/ChatContext'

const Chat = () => {
  const { mood } = useMood()
  const { messages, sendMessage, mode, setMode, error } = useChat()
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }
  
  const handleRecordVoice = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        setInput('This is a simulated voice message for the MVP')
      }, 2000)
    }
  }
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const examples = [
    { text: "How are you feeling today, Lyo?" },
    { text: "I need some clarity about a situation" },
    { text: "Can you help me process my thoughts?" },
    { text: "I'm feeling overwhelmed" }
  ]
  
  return (
    <motion.div 
      className="min-h-screen pt-16 pb-6 px-4 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {error && (
          <div className="mb-4 p-4 bg-error-dark/50 text-error-light rounded-lg">
            {error}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 glass-panel p-4 rounded-2xl">
          <div className="flex items-center">
            <div className="w-16 h-16">
              <LyoAvatar mood={mood} />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-display text-white">Lyo</h2>
              <p className="text-gray-400 text-sm">Here to help you reflect</p>
            </div>
          </div>
          
          <ModeSelector currentMode={mode} onChange={setMode} />
        </div>
        
        <div className="flex-1 glass-panel rounded-2xl p-4 mb-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <p className="text-gray-400 mb-4">Start chatting with Lyo...</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {examples.map((example, index) => (
                    <button 
                      key={index}
                      onClick={() => setInput(example.text)}
                      className="bg-glass-light px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-glass-medium transition-all"
                    >
                      {example.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`chat-bubble ${
                      message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-lyo'
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.sender === 'lyo' && (
                      <div className="flex justify-end mt-2">
                        <button 
                          className="text-xs text-gray-400 hover:text-neon-cyan flex items-center"
                          onClick={() => {/* Add to memory functionality */}}
                        >
                          <FiPenTool className="mr-1" /> Save to memory
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            )}
          </div>
        </div>
        
        <div className="glass-panel rounded-2xl p-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRecordVoice}
              className={`p-2 rounded-full ${
                isRecording 
                  ? 'bg-error-DEFAULT text-white animate-pulse' 
                  : 'bg-glass-light text-gray-300 hover:bg-glass-medium'
              }`}
            >
              <FiMic className="w-5 h-5" />
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your thoughts with Lyo..."
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none focus:ring-0"
            />
            
            <button
              type="submit"
              disabled={!input.trim()}
              className={`p-2 rounded-full ${
                input.trim() 
                  ? 'bg-neon-cyan text-space' 
                  : 'bg-glass-light text-gray-500'
              }`}
            >
              <FiSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Chat