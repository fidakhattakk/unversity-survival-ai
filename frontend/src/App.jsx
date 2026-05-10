import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        {/* Animated background orbs */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-accent-warm/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Main content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="glass rounded-3xl p-10 text-center max-w-lg glow-primary"
            >
              <h1 className="text-5xl font-bold mb-3">
                <span className="bg-gradient-to-r from-primary-light via-accent to-accent-warm bg-clip-text text-transparent">
                  UETSurvival.ai
                </span>
              </h1>
              <p className="text-text-muted text-lg mb-6">
                🔥 The Ultimate Student Survival System
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {['Bunk Calc', 'Roast AI', 'Excuses', 'Scanner', 'Reels'].map((feature, i) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="px-4 py-2 glass rounded-xl text-sm text-primary-light border border-primary/20 hover:glow-accent hover:border-accent/40 transition-all cursor-pointer"
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-xs text-text-muted"
              >
                🚀 System Initialized — Awaiting UI Directive
              </motion.p>
            </motion.div>
          </div>

          <Routes>
            {/* Feature routes will be added here */}
            <Route path="/" element={null} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  )
}

export default App
