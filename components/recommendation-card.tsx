"use client"

import { Shield, User, Trophy, RefreshCw, ArrowRight } from "lucide-react"

interface RecommendationCardProps {
  team: string
  player: string
  league: string
  reason: string
  isLoading: boolean
  error?: string | null
  onViewJourney: () => void
  onRetake: () => void
}

function SkeletonCard() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="h-10 w-64 mx-auto bg-emerald-100 rounded-lg animate-pulse mb-8" />
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2" />
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 animate-pulse mb-3" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
          <div className="bg-emerald-50 rounded-xl p-6 mb-8">
            <div className="h-4 w-full bg-emerald-100 rounded animate-pulse mb-2" />
            <div className="h-4 w-3/4 bg-emerald-100 rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-emerald-100 rounded animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-48 bg-emerald-200 rounded-full animate-pulse" />
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ErrorCard({ error, onRetake }: { error: string; onRetake: () => void }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
        <div className="p-6 md:p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {error || "We couldn't find your match right now. Please try again."}
          </p>
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export function RecommendationCard({
  team,
  player,
  league,
  reason,
  isLoading,
  error,
  onViewJourney,
  onRetake,
}: RecommendationCardProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
        <SkeletonCard />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
        <ErrorCard error={error} onRetake={onRetake} />
      </div>
    )
  }

  const recommendations = [
    {
      icon: Shield,
      label: "Your Team",
      value: team,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: User,
      label: "Your Player",
      value: player,
      gradient: "from-emerald-600 to-emerald-500",
    },
    {
      icon: Trophy,
      label: "Your League",
      value: league,
      gradient: "from-teal-500 to-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          We found your match! <span aria-hidden="true">🎉</span>
        </h2>

        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
          {/* Accent bar */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2" />

          <div className="p-6 md:p-8">

            {/* Three recommendation sections */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3 md:gap-6">
              {recommendations.map(({ icon: Icon, label, value, gradient }, index) => (
                <div key={label}>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors h-full">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide mb-1">
                      {label}
                    </span>
                    <span className="text-lg md:text-xl font-bold text-gray-900">
                      {value}
                    </span>
                  </div>
                  {/* Mobile divider between cards — hidden on md and above */}
                  {index < recommendations.length - 1 && (
                    <div className="mt-4 border-b border-emerald-100 md:hidden" />
                  )}
                </div>
              ))}
            </div>

            {/* Reason quote block */}
            <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-8 border border-emerald-100">
              <svg
                className="absolute top-4 left-4 w-8 h-8 text-emerald-200"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-700 leading-relaxed pl-8 md:pl-10 text-pretty">
                {reason}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={onViewJourney}
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Start My Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onRetake}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
              >
                Retake the quiz
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}