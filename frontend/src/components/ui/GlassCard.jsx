import { motion } from 'framer-motion'

/**
 * Reusable glassmorphism card with optional glow effect.
 */
export default function GlassCard({ children, className = '', glow = 'primary', ...props }) {
  const glowClass = glow === 'accent' ? 'glow-accent' : glow === 'primary' ? 'glow-primary' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`glass rounded-2xl p-6 ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
