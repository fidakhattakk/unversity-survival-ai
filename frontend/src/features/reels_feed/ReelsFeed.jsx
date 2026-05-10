import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiMessageCircle, FiShare2, FiCamera } from 'react-icons/fi'

export default function ReelsFeed() {
  const [reels, setReels] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [showReaction, setShowReaction] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/reels/feed')
      .then(res => res.json())
      .then(data => setReels(data.reels))
      .catch(console.error)
  }, [])

  const handleDoubleTap = (e) => {
    // Determine which side of screen was tapped
    const x = e.clientX
    const width = window.innerWidth
    if (x > width / 2) {
      setShowReaction('🔥')
    } else {
      setShowReaction('😭')
    }
    
    setTimeout(() => setShowReaction(null), 1000)
  }

  if (reels.length === 0) return <div className="text-center mt-20 text-cyan animate-pulse">Loading Reels...</div>

  const activeReel = reels[currentIdx]

  return (
    <div className="fixed inset-0 bg-black z-0 flex justify-center items-center">
      <div 
        className="w-full h-full max-w-md relative bg-gray-900"
        onDoubleClick={handleDoubleTap}
      >
        {/* Mock Video Element */}
        <video 
          src={activeReel.video_url} 
          autoPlay 
          loop 
          muted
          className="w-full h-full object-cover opacity-80"
        />

        {/* Double Tap Reaction Animation */}
        <AnimatePresence>
          {showReaction && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
              animate={{ scale: 2, opacity: 1 }}
              exit={{ scale: 3, opacity: 0 }}
              className="absolute top-1/2 left-1/2 text-8xl pointer-events-none"
            >
              {showReaction}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay UI */}
        <div className="absolute bottom-24 left-4 right-16">
          <span className="bg-electric/80 text-xs px-2 py-1 rounded mb-2 inline-block">#{activeReel.category}</span>
          <h3 className="text-white font-bold text-lg">{activeReel.title}</h3>
          <p className="text-sm text-gray-300">Double tap right for 🔥, left for 😭</p>
        </div>

        {/* Right side actions */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center">
          <button className="flex flex-col items-center gap-1 text-white hover:text-danger transition">
            <div className="p-3 bg-black/40 rounded-full backdrop-blur-md">
              <FiHeart size={28} />
            </div>
            <span className="text-xs font-bold">{activeReel.likes}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white hover:text-cyan transition">
            <div className="p-3 bg-black/40 rounded-full backdrop-blur-md">
              <FiMessageCircle size={28} />
            </div>
            <span className="text-xs font-bold">128</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white hover:text-electric transition">
            <div className="p-3 bg-black/40 rounded-full backdrop-blur-md">
              <FiShare2 size={28} />
            </div>
          </button>
        </div>

        {/* Floating Record Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-6 right-4 p-3 bg-gradient-to-r from-electric to-cyan rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"
        >
          <FiCamera size={24} className="text-white" />
        </motion.button>

        {/* Simple navigation for mock purposes */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between pointer-events-none">
          <button 
            className="pointer-events-auto bg-black/40 p-2 rounded-full text-white backdrop-blur-md opacity-50 hover:opacity-100"
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
          >
            ↑
          </button>
          <button 
            className="pointer-events-auto bg-black/40 p-2 rounded-full text-white backdrop-blur-md opacity-50 hover:opacity-100"
            onClick={() => setCurrentIdx(Math.min(reels.length - 1, currentIdx + 1))}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  )
}
