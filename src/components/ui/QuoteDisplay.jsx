import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const quotes = [
  "Presence over pressure. Insight over answers. Growth that respects pacing.",
  "Emotions aren't good or bad. They're information.",
  "Clarity comes from engagement, not avoidance.",
  "Your feelings are valid, even when they're complicated.",
  "Small moments of reflection create powerful change.",
  "Understanding yourself is the beginning of growth.",
  "The path to clarity starts with a single honest conversation.",
  "When words fail, presence matters most."
]

const QuoteDisplay = () => {
  const [quote, setQuote] = useState("")
  
  useEffect(() => {
    // Select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])
  
  return (
    <motion.div
      className="text-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 1 }}
    >
      <p className="text-gray-400 italic text-sm md:text-base">"{quote}"</p>
    </motion.div>
  )
}

export default QuoteDisplay