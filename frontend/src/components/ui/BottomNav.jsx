import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiCamera, FiVideo, FiMic, FiUser } from 'react-icons/fi'

export default function BottomNav() {
  const location = useLocation()
  const navItems = [
    { id: 'home', path: '/', icon: <FiHome size={24} />, label: 'Home' },
    { id: 'scanner', path: '/scanner', icon: <FiCamera size={24} />, label: 'Scanner' },
    { id: 'reels', path: '/reels', icon: <FiVideo size={24} />, label: 'Reels' },
    { id: 'voice', path: '/voice', icon: <FiMic size={24} />, label: 'Voice' },
    { id: 'profile', path: '/profile', icon: <FiUser size={24} />, label: 'Profile' }
  ]

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass px-6 py-3 rounded-full flex items-center gap-8 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link key={item.id} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-gray-400 hover:text-cyan'}`}
              >
                {item.icon}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
