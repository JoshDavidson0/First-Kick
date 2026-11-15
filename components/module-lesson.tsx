"use client"

import { getLesson, type ModuleId } from "@/lib/lessons"

interface ModuleLessonProps {
  moduleId: ModuleId
  onComplete: () => void
  onBack: () => void
}

export function ModuleLesson({ moduleId, onComplete, onBack }: ModuleLessonProps) {
  const lesson = getLesson(moduleId)

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white"
      style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}
    >
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-lg mx-auto px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium mb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            My Journey
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">{lesson.emoji}</span>
            <h1 className="text-xl font-bold text-gray-900">{lesson.name}</h1>
          </div>
        </div>
      </header>

      {/* Tagline */}
      <div className="max-w-lg mx-auto px-4 pt-5 pb-2">
        <p className="text-gray-500 text-sm">{lesson.tagline}</p>
      </div>

      {/* Sections */}
      <div className="max-w-lg mx-auto px-4 space-y-4 pb-4">
        {lesson.sections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl border border-emerald-100 shadow-sm p-5"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-2">{section.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>

            {section.items && section.items.length > 0 && (
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item.label} className="flex gap-3 items-start">
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">{item.label}</span>
                      {" — "}
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Sticky bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 px-4 py-4"
        style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={onComplete}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Got it — Mark as Complete
          </button>
        </div>
      </div>
    </div>
  )
}
