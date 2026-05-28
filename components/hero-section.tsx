interface HeroSectionProps {
  onStart: () => void
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">

      {/* Decorative soccer field pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect
            x="5" y="5" width="90" height="90"
            fill="none" stroke="currentColor" strokeWidth="0.5"
            className="text-emerald-900"
          />
          <line
            x1="50" y1="5" x2="50" y2="95"
            stroke="currentColor" strokeWidth="0.5"
            className="text-emerald-900"
          />
          <circle
            cx="50" cy="50" r="15"
            fill="none" stroke="currentColor" strokeWidth="0.5"
            className="text-emerald-900"
          />
          <rect
            x="5" y="30" width="15" height="40"
            fill="none" stroke="currentColor" strokeWidth="0.5"
            className="text-emerald-900"
          />
          <rect
            x="80" y="30" width="15" height="40"
            fill="none" stroke="currentColor" strokeWidth="0.5"
            className="text-emerald-900"
          />
        </svg>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-200/40 to-green-300/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-tl from-teal-200/40 to-emerald-300/30 blur-3xl" />

      {/* Content container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* App name */}
          <h1 className="text-balance text-5xl font-bold tracking-tight text-emerald-900 sm:text-6xl lg:text-7xl">
            First Kick ⚽
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-pretty text-xl font-medium text-emerald-700 sm:text-2xl lg:text-3xl">
            Discover soccer your way — from zero to fan.
          </p>

          {/* Description */}
          <p className="mt-6 text-pretty text-base leading-relaxed text-emerald-800/80 sm:text-lg lg:text-xl">
            Never watched soccer before? Answer a few quick questions and
            we&apos;ll match you with a team, a player, and a league you&apos;ll
            actually care about.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <button
              onClick={onStart}
              className="group relative inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98] sm:px-10 sm:text-xl"
            >
              Find My Team
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom wave — transitions cleanly into next section */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-16 w-full text-white sm:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.72,69.45,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  )
}