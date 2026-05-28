"use client"

import { useState, useEffect } from "react"

// ============================================
// Loading Screen Component
// ============================================

const loadingMessages = [
  "Analyzing your style...",
  "Searching the world's leagues...",
  "Finding your perfect match...",
]

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out, swap message, fade in
      setVisible(false)
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
        setVisible(true)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4">

      {/* App header */}
      <div className="mb-10 text-center">
        <h1 className="text-lg font-medium text-emerald-700">
          First Kick <span className="ml-1" aria-hidden="true">⚽</span>
        </h1>
      </div>

      {/* Animated soccer ball — clean minimalist design, single pulse animation */}
      <div className="relative mb-10 flex items-center justify-center">

        {/* Slow outer pulse ring */}
        <div
          className="absolute h-36 w-36 rounded-full bg-emerald-100 opacity-60"
          style={{ animation: "pulse-ring 2.4s ease-in-out infinite" }}
        />

        {/* Inner ring */}
        <div
          className="absolute h-24 w-24 rounded-full bg-emerald-200 opacity-50"
          style={{ animation: "pulse-ring 2.4s ease-in-out infinite 0.4s" }}
        />

        {/* Soccer ball SVG — minimalist, reliable at all sizes */}
        <div
          className="relative z-10"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <svg
            viewBox="0 0 100 100"
            className="h-20 w-20"
            aria-label="Loading animation"
            role="img"
          >
            {/* Ball */}
            <circle cx="50" cy="50" r="44" fill="white" stroke="#10b981" strokeWidth="2.5" />

            {/* Center hexagon panel */}
            <polygon
              points="50,28 64,38 64,58 50,68 36,58 36,38"
              fill="#10b981"
              opacity="0.85"
            />

            {/* Top panel line */}
            <line x1="50" y1="6" x2="50" y2="28" stroke="#10b981" strokeWidth="2" />

            {/* Upper left panel line */}
            <line x1="12" y1="30" x2="36" y2="38" stroke="#10b981" strokeWidth="2" />

            {/* Upper right panel line */}
            <line x1="88" y1="30" x2="64" y2="38" stroke="#10b981" strokeWidth="2" />

            {/* Lower left panel line */}
            <line x1="16" y1="72" x2="36" y2="58" stroke="#10b981" strokeWidth="2" />

            {/* Lower right panel line */}
            <line x1="84" y1="72" x2="64" y2="58" stroke="#10b981" strokeWidth="2" />

            {/* Bottom panel line */}
            <line x1="50" y1="94" x2="50" y2="68" stroke="#10b981" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Cycling loading message — CSS transition fade, no styled-jsx */}
      <div className="mb-4 h-8 flex items-center justify-center">
        <p
          className="text-lg font-medium text-emerald-800 text-center transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {loadingMessages[messageIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="mb-6 flex gap-2 items-center">
        {loadingMessages.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === messageIndex
                ? "w-6 bg-emerald-500"
                : "w-2 bg-emerald-200"
            }`}
          />
        ))}
      </div>

      {/* Hint */}
      <p className="text-sm text-gray-400">
        This usually takes a few seconds
      </p>

      {/* Keyframe animations injected via a style tag — valid in React without styled-jsx */}
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(0.95); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

    </div>
  )
}

// ============================================
// Error Screen Component
// ============================================

interface ErrorScreenProps {
  message: string
  onRetry: () => void
  onStartOver: () => void
}

export function ErrorScreen({ message, onRetry, onStartOver }: ErrorScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-6">

      {/* App header */}
      <div className="mb-8 text-center">
        <h1 className="text-lg font-medium text-emerald-700">
          First Kick <span className="ml-1" aria-hidden="true">⚽</span>
        </h1>
      </div>

      {/* Error illustration — sad soccer ball */}
      <div className="relative mb-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-amber-50">
          <svg
            viewBox="0 0 100 100"
            className="h-20 w-20"
            aria-label="Error illustration"
            role="img"
          >
            {/* Ball */}
            <circle cx="50" cy="50" r="44" fill="white" stroke="#d97706" strokeWidth="2.5" />

            {/* Center panel — muted amber */}
            <polygon
              points="50,28 64,38 64,58 50,68 36,58 36,38"
              fill="#fbbf24"
              opacity="0.5"
            />

            {/* Panel lines */}
            <line x1="50" y1="6" x2="50" y2="28" stroke="#d97706" strokeWidth="2" opacity="0.4" />
            <line x1="12" y1="30" x2="36" y2="38" stroke="#d97706" strokeWidth="2" opacity="0.4" />
            <line x1="88" y1="30" x2="64" y2="38" stroke="#d97706" strokeWidth="2" opacity="0.4" />
            <line x1="16" y1="72" x2="36" y2="58" stroke="#d97706" strokeWidth="2" opacity="0.4" />
            <line x1="84" y1="72" x2="64" y2="58" stroke="#d97706" strokeWidth="2" opacity="0.4" />
            <line x1="50" y1="94" x2="50" y2="68" stroke="#d97706" strokeWidth="2" opacity="0.4" />

            {/* Eyes */}
            <circle cx="38" cy="42" r="3.5" fill="#92400e" />
            <circle cx="62" cy="42" r="3.5" fill="#92400e" />

            {/* Sad mouth */}
            <path
              d="M 36 66 Q 50 56 64 66"
              fill="none"
              stroke="#92400e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Decorative dots */}
        <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-amber-200" aria-hidden="true" />
        <div className="absolute -bottom-1 -left-3 h-3 w-3 rounded-full bg-amber-300" aria-hidden="true" />
      </div>

      {/* Heading */}
      <h2 className="mb-3 text-center text-2xl font-bold text-gray-800">
        Something went wrong
      </h2>

      {/* Error message */}
      <div className="mb-6 max-w-sm rounded-xl bg-white/60 px-6 py-4 text-center shadow-sm">
        <p className="text-gray-600">{message}</p>
      </div>

      {/* Encouragement */}
      <p className="mb-8 max-w-xs text-center text-sm text-gray-500">
        Don&apos;t worry — this happens sometimes. Let&apos;s give it another shot!
      </p>

      {/* Action buttons — both have focus rings for keyboard/assistive navigation */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onRetry}
          className="group flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <svg
            className="h-5 w-5 transition-transform group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>

        <button
          onClick={onStartOver}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-3 font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Start Over
        </button>
      </div>

    </div>
  )
}