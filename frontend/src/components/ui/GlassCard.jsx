import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', glow = 'cyan', ...props }) {
  // Glow logic using the new tailwind v4 theme variables
  const hoverGlowClass = glow === 'cyan' 
    ? 'hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
    : 'hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass rounded-2xl p-6 transition-shadow duration-300 ${hoverGlowClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
