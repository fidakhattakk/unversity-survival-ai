import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import ChachaGPT from '../../components/ui/ChachaGPT'

export default function BunkCalculator() {
  const [attendance, setAttendance] = useState(80)
  const [threatLevel, setThreatLevel] = useState(1) // 1: Chill, 2: Bearded, 3: Dangerous

  const isDanger = attendance < 75

  // Threat descriptors
  const threatLabels = ["Chill 😌", "Bearded 🧔‍♂️", "Dangerous 💀"]

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto relative z-10">
      
      <ChachaGPT state={isDanger ? 'judging' : 'idle'} />

      <GlassCard className="w-full relative overflow-hidden" glow={isDanger ? 'danger' : 'cyan'}>
        <h2 className="text-2xl font-bold text-center mb-6">Bunk Calculator</h2>
        
        <div className="flex justify-center mb-8">
          <motion.div 
            animate={isDanger ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={isDanger ? { repeat: Infinity, duration: 0.4 } : {}}
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center border-4 ${isDanger ? 'border-danger text-danger shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'border-cyan text-cyan shadow-[0_0_30px_rgba(6,182,212,0.5)]'}`}
          >
            <span className="text-5xl font-bold">{attendance}%</span>
            <span className="text-xs uppercase tracking-widest mt-1">Attendance</span>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1 text-gray-300">
              <span>Current Attendance</span>
              <span>{attendance}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={attendance}
              onChange={(e) => setAttendance(Number(e.target.value))}
              className="w-full accent-electric"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 text-gray-300">
              <span>Professor Threat Level</span>
              <span className="font-hand text-lg text-electric">{threatLabels[threatLevel - 1]}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="3" 
              value={threatLevel}
              onChange={(e) => setThreatLevel(Number(e.target.value))}
              className="w-full accent-danger"
            />
          </div>
        </div>

        <div className="mt-8 text-center p-4 rounded-xl bg-black/30 border border-white/10">
          <p className="font-hand text-xl">
            {isDanger 
              ? "Chacha says: 'Beta, supply pakki hai teri. Sharam kar!' 😭" 
              : "Chacha says: 'Good boy, ek aur class bunk maar le.' ☕"}
          </p>
        </div>
      </GlassCard>
    </div>
  )
}
