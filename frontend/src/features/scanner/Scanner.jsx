import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { motion } from 'framer-motion'
import { FiCamera, FiRefreshCw, FiCheckCircle } from 'react-icons/fi'
import GlassCard from '../../components/ui/GlassCard'

export default function Scanner() {
  const webcamRef = useRef(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot()
    setImageSrc(image)
  }, [webcamRef])

  const scanNotes = async () => {
    if (!imageSrc) return
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/media/vision/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_base64: imageSrc })
      })
      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      setResult({ error: "Failed to scan notes." })
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto relative z-10">
      <h2 className="text-3xl font-bold font-display text-cyan">📸 Notes Scanner</h2>
      
      {!imageSrc ? (
        <GlassCard className="w-full overflow-hidden p-2">
          <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-black">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-dashed border-cyan/50 pointer-events-none m-4 rounded-lg"></div>
          </div>
          <div className="mt-4 flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={capture} 
              className="bg-cyan text-surface p-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"
            >
              <FiCamera size={32} />
            </motion.button>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="w-full">
          <img src={imageSrc} alt="Scanned notes" className="w-full rounded-xl mb-4" />
          
          <div className="flex justify-between gap-4 mb-6">
            <button onClick={() => { setImageSrc(null); setResult(null); }} className="flex-1 py-2 bg-surface-card rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition">
              <FiRefreshCw /> Retake
            </button>
            <button onClick={scanNotes} disabled={loading} className="flex-1 py-2 bg-electric text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple-600 transition disabled:opacity-50">
              {loading ? <FiRefreshCw className="animate-spin" /> : <FiCheckCircle />}
              {loading ? 'Analyzing...' : 'Scan & Extract'}
            </button>
          </div>

          {result && !result.error && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-left">
              <h3 className="text-lg font-bold text-electric mb-2">Summary</h3>
              <p className="text-sm text-gray-300 mb-4 bg-black/30 p-3 rounded-lg border border-white/10">{result.summary}</p>
              
              <h3 className="text-lg font-bold text-danger mb-2">Likely Exam Questions</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                {result.exam_questions?.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {result?.error && (
            <div className="text-danger p-3 bg-danger/10 rounded-lg">{result.error}</div>
          )}
        </GlassCard>
      )}
    </div>
  )
}
