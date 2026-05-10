import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMic, FiSquare, FiVolume2 } from 'react-icons/fi'
import GlassCard from '../../components/ui/GlassCard'
import ChachaGPT from '../../components/ui/ChachaGPT'

export default function VoiceNotes() {
  const [isRecording, setIsRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chachaReply, setChachaReply] = useState('')
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        await sendAudioToChacha(audioBlob)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error("Mic access denied", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  const sendAudioToChacha = async (audioBlob) => {
    setLoading(true)
    setChachaReply('')
    try {
      const formData = new FormData()
      formData.append('file', audioBlob, 'voicenote.wav')

      const response = await fetch('http://localhost:8000/api/media/voice/process', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      setChachaReply(data.reply || "Bhai, kuch samajh nahi aaya.")
      
      // Simulate playing audio back (since we only have text output from Gemini currently)
      // If we had text-to-speech, we'd play it here.
    } catch (err) {
      console.error(err)
      setChachaReply("Network error! Chacha is sleeping.")
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto relative z-10">
      <ChachaGPT state={isRecording ? 'judging' : (loading ? 'idle' : 'idle')} />

      <GlassCard className="w-full text-center relative overflow-hidden" glow={isRecording ? 'danger' : 'electric'}>
        <h2 className="text-2xl font-bold mb-2">Voice Study Mode</h2>
        <p className="text-sm text-gray-400 mb-8">Hold to talk with Chacha GPT</p>

        <motion.button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center mx-auto transition-colors ${isRecording ? 'bg-danger shadow-[0_0_40px_rgba(239,68,68,0.6)]' : 'bg-electric shadow-[0_0_30px_rgba(124,58,237,0.4)]'}`}
        >
          {isRecording ? <FiSquare size={40} className="text-white" /> : <FiMic size={48} className="text-white" />}
        </motion.button>

        <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest font-bold">
          {isRecording ? 'Recording... Release to send' : 'Hold to ask a question'}
        </p>

        {(loading || chachaReply) && (
          <div className="mt-8 p-4 bg-black/40 border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-cyan font-bold">
              <FiVolume2 /> Chacha says:
            </div>
            {loading ? (
              <div className="animate-pulse text-gray-300">Thinking... 🤔</div>
            ) : (
              <p className="font-hand text-xl text-left leading-relaxed">{chachaReply}</p>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  )
}
