import { useState, useEffect } from 'react'

export default function ChachaGPT({ state = 'idle', className = '' }) {
  // state: 'idle' | 'crying' | 'judging'
  
  return (
    <div className={`relative w-48 h-48 mx-auto ${className}`}>
      {/* 
        This is an animated SVG representing Chacha GPT.
        - Hat: PhD Cap
        - Outfit: Shalwar Kameez (simple lines)
        - Laptop: Glowing cyan/electric laptop
      */}
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        {/* Background glow behind Chacha */}
        <circle cx="100" cy="100" r="80" fill="url(#chachaGlow)" opacity="0.5"/>
        
        {/* Head */}
        <circle cx="100" cy="80" r="35" fill="#EDBA96" />
        {/* Beard (Desi uncle style) */}
        <path d="M 65 80 Q 100 140 135 80 Q 100 110 65 80 Z" fill="#333" />
        
        {/* PhD Hat */}
        <path d="M 100 20 L 150 40 L 100 60 L 50 40 Z" fill="#1A1A1A" />
        <rect x="70" y="40" width="60" height="20" fill="#1A1A1A" />
        <path d="M 140 40 L 140 70 M 130 70 L 150 70 L 145 80 L 135 80 Z" stroke="#FBBF24" strokeWidth="2" fill="#FBBF24" />

        {/* Eyes based on state */}
        {state === 'idle' && (
          <g>
            <circle cx="85" cy="75" r="4" fill="#333" />
            <circle cx="115" cy="75" r="4" fill="#333" />
          </g>
        )}
        {state === 'crying' && (
          <g>
            <path d="M 75 75 Q 85 70 95 75" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            <path d="M 105 75 Q 115 70 125 75" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            <circle cx="85" cy="85" r="3" fill="#06B6D4" className="animate-bounce" />
            <circle cx="115" cy="85" r="3" fill="#06B6D4" className="animate-bounce" style={{animationDelay: '0.2s'}} />
          </g>
        )}
        {state === 'judging' && (
          <g>
            {/* Lowered glasses */}
            <path d="M 70 85 L 95 85 M 105 85 L 130 85 M 95 85 Q 100 80 105 85" stroke="#333" strokeWidth="3" fill="none" />
            {/* Stern eyes looking over glasses */}
            <circle cx="85" cy="72" r="3" fill="#333" />
            <circle cx="115" cy="72" r="3" fill="#333" />
            <path d="M 75 65 L 95 70" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            <path d="M 125 65 L 105 70" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* Body / Shalwar Kameez */}
        <path d="M 60 120 C 60 120, 40 180, 40 200 L 160 200 C 160 180, 140 120, 140 120 C 140 120, 100 140, 60 120 Z" fill="#EAEAEA" />

        {/* Props based on state */}
        {state === 'idle' && (
          <g className="animate-pulse">
            {/* Chai cup */}
            <path d="M 140 130 L 140 160 Q 150 160 150 130 Z" fill="#7C3AED" />
            <path d="M 150 135 Q 160 135 160 145 Q 160 155 150 155" stroke="#7C3AED" strokeWidth="3" fill="none" />
          </g>
        )}
        {(state === 'judging' || state === 'crying') && (
          <g>
            {/* Glowing Laptop */}
            <polygon points="60,160 140,160 155,190 45,190" fill="#1A1A2E" />
            <polygon points="65,165 135,165 145,185 55,185" fill="#06B6D4" opacity="0.8" />
            {/* Apple/Logo on laptop back if it was facing us, but it's open facing him. Let's make the screen glow */}
          </g>
        )}

        <defs>
          <radialGradient id="chachaGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0F0F0F" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
