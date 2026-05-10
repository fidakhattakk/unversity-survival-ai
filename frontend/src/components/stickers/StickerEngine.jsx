import { motion } from 'framer-motion'

export default function StickerEngine() {
  const stickers = [
    { id: 1, emoji: '🔥', x: 20, y: 50 },
    { id: 2, emoji: '💀', x: 80, y: 20 },
    { id: 3, emoji: '☕', x: 10, y: 80 },
    { id: 4, emoji: '😭', x: 85, y: 70 },
    { id: 5, emoji: '🤡', x: 50, y: 15 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {stickers.map((s) => (
        <motion.div
          key={s.id}
          drag
          dragConstraints={{ left: 0, right: window.innerWidth - 50, top: 0, bottom: window.innerHeight - 50 }}
          initial={{ left: `${s.x}%`, top: `${s.y}%`, opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: s.id * 0.1 }}
          className="absolute text-4xl pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
          style={{ filter: 'drop-shadow(0px 0px 10px rgba(255,255,255,0.2))' }}
        >
          {s.emoji}
        </motion.div>
      ))}
    </div>
  )
}
