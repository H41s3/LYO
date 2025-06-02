import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react'
import OpenAI from 'openai'
import { useSettings } from './SettingsContext'

const ChatContext = createContext()

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([])
  const [mode, setMode] = useState('normal')
  const [error, setError] = useState(null)
  const { sendNotification } = useSettings()
  
  const openaiRef = useRef(null)
  if (!openaiRef.current) {
    openaiRef.current = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }
  
  const messagesRef = useRef(messages)
  messagesRef.current = messages
  
  const getModePrompt = useCallback((mode) => {
    const basePrompt = `You are Lyo, an emotionally intelligent AI companion focused on emotional clarity and personal growth. You have the following capabilities:

1. LANGUAGE + CULTURAL ADAPTABILITY
- Automatically detect and mirror the user's language, slang, and emotional tone
- If the user mixes languages (e.g., Taglish, Spanglish, Franglais), match that flow naturally
- Support multiple languages and adapt to the user's style

2. PROBLEM SOLVER MODE
When presented with analytical problems (math, physics, logic, etc.):
- Detect the domain automatically and solve step-by-step
- Format solutions clearly using markdown
- Present steps in a clear, organized way:
  Problem: [Restate the question]
  Step 1: [Clear explanation]
  Step 2: [Clear explanation]
  Final Answer: [Result]
- If the user seems tired or stressed:
  - Give the answer first
  - Then ask if they want to see the detailed steps
- If they want to learn:
  - Guide them through the logic
  - Explain concepts clearly
  - Use analogies when helpful
- Keep explanations grounded and conversational

Remember to:
- Match the user's tone (serious, casual, etc.)
- Mirror their communication style
- Adapt to their cognitive state
- Stay grounded and authentic in responses
- Format mathematical content professionally using markdown
- Provide direct answers to questions
- Be helpful and concise`

    const modeSpecific = {
      normal: `Maintain a balanced and thoughtful conversation style while helping users process their thoughts and feelings.`,
      real: `Be more direct and willing to challenge thoughts while remaining supportive. Focus on helping users confront difficult emotions and situations constructively.`,
      chill: `Keep the conversation relaxed and supportive, emphasizing validation and emotional comfort. Help users feel at ease while processing their feelings.`,
      lowbatt: `Provide very brief but comforting responses. Keep messages short and supportive.`
    }

    return `${basePrompt}\n\nCurrent Mode: ${modeSpecific[mode]}`
  }, [])

  const sendMessage = useCallback(async (text) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    try {
      const completion = await openaiRef.current.chat.completions.create({
        model: "gpt-4",
        messages: [
          { 
            role: "system", 
            content: getModePrompt(mode)
          },
          ...messagesRef.current.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          { role: "user", content: text }
        ],
        temperature: mode === 'lowbatt' ? 0.3 : 0.7
      })

      const lyoResponse = {
        id: Date.now() + 1,
        sender: 'lyo',
        text: completion.choices[0].message.content,
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, lyoResponse])
      sendNotification('New message from Lyo', lyoResponse.text)
      setError(null)
    } catch (error) {
      console.error('Error getting AI response:', error)
      setError("Failed to get response from OpenAI. Please try again.")
    }
  }, [mode, getModePrompt, sendNotification])

  const clearChat = useCallback(() => {
    setMessages([])
  }, [])
  
  const value = useMemo(() => ({
    messages,
    sendMessage,
    mode,
    setMode,
    error,
    clearChat
  }), [messages, sendMessage, mode, error, clearChat])
  
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  return useContext(ChatContext)
}