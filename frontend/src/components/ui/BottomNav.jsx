import { motion } from 'framer-motion'
import { FiHome, FiCamera, FiVideo, FiMic, FiUser } from 'react-icons/fi'

export default function BottomNav() {
  const navItems = [
    { id: 'home', icon: <FiHome size={24} />, label: 'Home' },
    { id: 'scanner', icon: <FiCamera size={24} />, label: 'Scanner' },
    { id: 'reels', icon: <FiVideo size={24} />, label: 'Reels' },
    { id: 'voice', icon: <FiMic size={24} />, label: 'Voice' },
    { id: 'profile', icon: <FiUser size={24} />, label: 'Profile' }
  ]

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass px-6 py-3 rounded-full flex items-center gap-8 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.2, color: '#06B6D4' }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-cyan transition-colors flex flex-col items-center gap-1"
          >
            {item.icon}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
