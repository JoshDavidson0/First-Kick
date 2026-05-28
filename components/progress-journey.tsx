"use client"

import { Check, Lock } from "lucide-react"

interface ProgressJourneyProps {
  completedModules: string[]
  currentModule: string
  onContinue: (module: string) => void
  onViewRecommendation: () => void
}

// Module IDs must match api-contracts.md and claude.md exactly:
// "rules" | "positions" | "formations" | "rivalries" | "history"
const modules = [
  {
    id: "rules",
    name: "The Rules",
    emoji: "📋",
    description: "Learn the basic rules of soccer",
  },
  {
    id: "positions",
    name: "Positions",
    emoji: "🧩",
    description: "Understand what each player does",
  },
  {
    id: "formations",
    name: "Formations",
    emoji: "🗺️",
    description: "How teams line up on the pitch",
  },
  {
    id: "rivalries",
    name: "Rivalries",
    emoji: "🔥",
    description: "The biggest feuds in soccer history",
  },
  {
    id: "history",
    name: "History",
    emoji: "🏆",
    description: "How the sport became the world's game",
  },
]

export function ProgressJourney({
  completedModules,
  currentModule,
  onContinue,
  onViewRecommendation,
}: ProgressJourneyProps) {
  const completedCount = completedModules.length
  const totalModules = modules.length
  const progressPercentage = (completedCount / totalModules) * 100

  const getModuleState = (moduleId: string): "completed" | "current" | "locked" => {
    if (completedModules.includes(moduleId)) return "completed"
    if (moduleId === currentModule) return "current"
    return "locked"
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pb-8"
    >

      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-lg mx-auto px-4 py-3">
          <button
            onClick={onViewRecommendation}
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            My Recommendation
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">My Journey</h1>
            <span className="text-sm text-gray-500">
              {completedCount} of {totalModules} modules complete
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-emerald-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Module Timeline */}
      <div className="max-w-lg mx-auto px-4">
        <div className="relative">
          {modules.map((module, index) => {
            const state = getModuleState(module.id)
            const isLast = index === modules.length - 1

            return (
              <div key={module.id} className="relative flex gap-4">

                {/* Timeline node and connecting line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0
                      ${state === "completed" ? "bg-emerald-500" : ""}
                      ${state === "current" ? "bg-white border-2 border-emerald-500" : ""}
                      ${state === "locked" ? "bg-gray-200" : ""}
                    `}
                  >
                    {state === "completed" && (
                      <Check className="w-5 h-5 text-white" aria-hidden="true" />
                    )}
                    {state === "current" && (
                      <>
                        <span className="text-lg" aria-hidden="true">{module.emoji}</span>
                        <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-30" />
                      </>
                    )}
                    {state === "locked" && (
                      <Lock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                    )}
                  </div>

                  {/* Connecting line to next module */}
                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 min-h-[2rem] ${
                        state === "completed" ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                {/* Module card */}
                <div
                  className={`
                    flex-1 mb-4 rounded-xl p-4 transition-all
                    ${state === "completed"
                      ? "bg-white border border-emerald-200 shadow-sm"
                      : ""}
                    ${state === "current"
                      ? "bg-white border-2 border-emerald-500 shadow-md shadow-emerald-100"
                      : ""}
                    ${state === "locked"
                      ? "bg-gray-50 border border-gray-200 opacity-60"
                      : ""}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-2xl ${state === "locked" ? "grayscale opacity-50" : ""}`}
                      aria-hidden="true"
                    >
                      {module.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`font-semibold ${
                            state === "locked" ? "text-gray-400" : "text-gray-900"
                          }`}
                        >
                          {module.name}
                        </h3>
                        {state === "completed" && (
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          state === "locked" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {module.description}
                      </p>

                      {/* Continue button — passes module.id (not module.name) to match API contract */}
                      {state === "current" && (
                        <button
                          onClick={() => onContinue(module.id)}
                          className="mt-3 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                          Continue Learning
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}