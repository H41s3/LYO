import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi'
import { useSettings } from '../contexts/SettingsContext'
import { useChat } from '../contexts/ChatContext'

const Settings = () => {
  const { settings, updateSettings } = useSettings()
  const { clearChat, userApiKey, updateApiKey } = useChat()
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  
  const handleToggle = (setting) => {
    updateSettings({ [setting]: !settings[setting] })
  }
  
  const handleSelect = (setting, value) => {
    updateSettings({ [setting]: value })
  }
  
  const handleClearChat = () => {
    clearChat()
    setShowClearConfirm(false)
  }
  
  const handleApiKeyChange = (e) => {
    updateApiKey(e.target.value)
  }
  
  const avatarStyles = [
    { id: 'holographic', label: 'Holographic' },
    { id: 'pixel', label: 'Pixel Art' },
    { id: 'cartoon', label: 'Cartoon' }
  ]
  
  const languages = [
    { id: 'english', label: 'English' },
    { id: 'tagalog', label: 'Tagalog' },
    { id: 'auto', label: 'Auto-detect' }
  ]
  
  return (
    <motion.div 
      className="min-h-screen pt-20 pb-6 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-display text-white mb-6">Settings</h1>
        
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="settings-option">
            <div>
              <h3 className="text-white font-medium">Voice Output</h3>
              <p className="text-gray-400 text-sm">Enable text-to-speech for Lyo's responses</p>
            </div>
            <button 
              onClick={() => handleToggle('voiceEnabled')}
              className="text-2xl text-gray-400"
            >
              {settings.voiceEnabled ? (
                <FiToggleRight className="text-neon-cyan" />
              ) : (
                <FiToggleLeft />
              )}
            </button>
          </div>
          
          <div className="settings-option">
            <div>
              <h3 className="text-white font-medium">Avatar Style</h3>
              <p className="text-gray-400 text-sm">Choose how Lyo appears</p>
            </div>
            <div className="flex gap-2">
              {avatarStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => handleSelect('avatarStyle', style.id)}
                  className={`px-3 py-1.5 text-xs rounded-full ${
                    settings.avatarStyle === style.id
                      ? 'bg-neon-cyan text-midnight'
                      : 'bg-glass-light text-gray-300'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="settings-option">
            <div>
              <h3 className="text-white font-medium">Language</h3>
              <p className="text-gray-400 text-sm">Set Lyo's response language</p>
            </div>
            <div className="flex gap-2">
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleSelect('language', lang.id)}
                  className={`px-3 py-1.5 text-xs rounded-full ${
                    settings.language === lang.id
                      ? 'bg-neon-cyan text-midnight'
                      : 'bg-glass-light text-gray-300'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="settings-option">
            <div>
              <h3 className="text-white font-medium">Notifications</h3>
              <p className="text-gray-400 text-sm">Receive insight and reflection reminders</p>
            </div>
            <button 
              onClick={() => handleToggle('notifications')}
              className="text-2xl text-gray-400"
            >
              {settings.notifications ? (
                <FiToggleRight className="text-neon-cyan" />
              ) : (
                <FiToggleLeft />
              )}
            </button>
          </div>

          <div className="settings-option border-b-0">
            <div>
              <h3 className="text-white font-medium">Clear Chat History</h3>
              <p className="text-gray-400 text-sm">Delete all chat messages</p>
            </div>
            {showClearConfirm ? (
              <div className="flex gap-2">
                <button
                  onClick={handleClearChat}
                  className="px-3 py-1.5 text-xs rounded-full bg-error-DEFAULT text-white hover:bg-error-dark"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3 py-1.5 text-xs rounded-full bg-glass-light text-gray-300"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowClearConfirm(true)}
                className="text-2xl text-gray-400 hover:text-error-DEFAULT"
              >
                <FiTrash2 className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-white">API Configuration</h2>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={userApiKey}
              onChange={handleApiKeyChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your OpenAI API key"
            />
            <p className="mt-2 text-sm text-gray-400">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">Lyo v0.1.0</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Settings