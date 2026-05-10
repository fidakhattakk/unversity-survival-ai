import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import BottomNav from './components/ui/BottomNav'
import StickerEngine from './components/stickers/StickerEngine'
import BunkCalculator from './features/bunk_calc/BunkCalculator'
import Scanner from './features/scanner/Scanner'
import VoiceNotes from './features/voice_notes/VoiceNotes'
import ReelsFeed from './features/reels_feed/ReelsFeed'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden bg-surface text-white">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-electric/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-1/3 w-[300px] h-[300px] bg-danger/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Global Interactive Sticker Engine */}
        <StickerEngine />

        {/* Main Content Area */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 p-6 pb-32 pt-12 min-h-screen flex flex-col justify-center"
        >

          <Routes>
            <Route path="/" element={<BunkCalculator />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/voice" element={<VoiceNotes />} />
            <Route path="/reels" element={<ReelsFeed />} />
          </Routes>
        </motion.main>

        {/* Global Bottom Navigation */}
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
