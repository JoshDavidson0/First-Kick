"use client"

import { useState } from "react"

type LessonItem = { label: string; description: string }

type LessonSection = {
  title: string
  body: string
  items?: LessonItem[]
}

type LessonContent = {
  id: string
  name: string
  emoji: string
  tagline: string
  sections: LessonSection[]
}

const LESSONS: LessonContent[] = [
  {
    id: "rules",
    name: "The Rules",
    emoji: "📋",
    tagline: "Soccer is simple at heart — here's everything you need to know",
    sections: [
      {
        title: "The Basics",
        body: "Two teams of 11 players try to kick a ball into the other team's goal. The team with the most goals after 90 minutes wins. If it's tied, some competitions go to extra time or a penalty shootout.",
      },
      {
        title: "Cards & Fouls",
        body: "Referees use colored cards to deal with bad behavior on the pitch.",
        items: [
          { label: "Yellow Card", description: "A warning. Earn two in one game and you're sent off." },
          { label: "Red Card", description: "Instant removal — your team plays the rest of the match with 10 players." },
          { label: "Foul", description: "Illegal physical contact. The fouled team gets a free kick." },
        ],
      },
      {
        title: "Offside",
        body: "The trickiest rule for beginners. You're offside if you receive a pass while standing behind the last defender. It stops attackers from just camping next to the goalkeeper waiting for long balls.",
      },
      {
        title: "Set Pieces",
        body: "Special situations that restart play after the ball goes out or a foul is committed.",
        items: [
          { label: "Corner Kick", description: "Awarded when a defender kicks the ball over their own goal line." },
          { label: "Free Kick", description: "Awarded after a foul — the team can shoot or pass from the spot." },
          { label: "Penalty", description: "A free 1-on-1 shot against the goalkeeper from 12 yards out, given for fouls inside the box." },
          { label: "Throw-in", description: "Used to restart play when the ball exits the pitch on the sides." },
        ],
      },
    ],
  },
  {
    id: "positions",
    name: "Positions",
    emoji: "🧩",
    tagline: "Every player has a role — here's what they all do",
    sections: [
      {
        title: "Goalkeeper (GK)",
        body: "The last line of defense and the only player allowed to use their hands — but only inside their own penalty area. A great goalkeeper can single-handedly win games.",
      },
      {
        title: "Defenders",
        body: "Usually 3 or 4 players stationed close to their own goal. Their primary job is stopping the other team from scoring.",
        items: [
          { label: "Centre-Back (CB)", description: "The main stoppers — strong and physical, they win headers and tackles in dangerous areas." },
          { label: "Full-Back (LB / RB)", description: "Play on the flanks. In modern soccer they push forward to join attacks as well as defend." },
        ],
      },
      {
        title: "Midfielders",
        body: "The engine of the team. Midfielders link defense and attack, control the tempo of the game, and cover more ground than anyone else during a match.",
        items: [
          { label: "Defensive Midfielder (DM)", description: "Shields the defense, wins the ball back, and keeps things simple with short passes." },
          { label: "Central Midfielder (CM)", description: "The all-rounder — passes, runs, and sometimes scores from distance." },
          { label: "Attacking Midfielder (AM)", description: "Operates in the space behind the forwards, creating goal-scoring opportunities with clever passes." },
        ],
      },
      {
        title: "Forwards",
        body: "Their primary goal is to score. Modern forwards also pressure defenders, create space for teammates, and track back to help out.",
        items: [
          { label: "Striker (ST)", description: "The main goal scorer. Lives inside the penalty box waiting for chances." },
          { label: "Winger (LW / RW)", description: "Plays on the wide sides of the pitch, using pace and skill to cross the ball or cut inside and shoot." },
        ],
      },
    ],
  },
  {
    id: "formations",
    name: "Formations",
    emoji: "🗺️",
    tagline: "How a team sets up on the pitch can change everything",
    sections: [
      {
        title: "What Is a Formation?",
        body: "A formation is the shape the 10 outfield players take on the pitch (the goalkeeper is always in goal). It's written as three numbers from defense to attack — so 4-3-3 means 4 defenders, 3 midfielders, and 3 forwards.",
      },
      {
        title: "Common Formations",
        body: "Different formations suit different styles of play. Here are the most popular ones you'll hear about.",
        items: [
          { label: "4-4-2", description: "The classic. Perfectly balanced — 4 defenders, 4 midfielders, 2 strikers. Simple and effective at any level." },
          { label: "4-3-3", description: "Attacking and fluid. Three forwards press high up the pitch constantly. Used by Barcelona, Liverpool, and many top clubs." },
          { label: "4-2-3-1", description: "The modern favorite. Two defensive midfielders protect the back four while one striker leads the attack." },
          { label: "3-5-2", description: "Three at the back with wide players (wing-backs) who bomb forward. Very aggressive when it works." },
        ],
      },
      {
        title: "Why Does It Matter?",
        body: "Formations decide how a team attacks, defends, and controls possession. A manager might switch formation mid-game to chase a goal or protect a lead. Watching how teams shift shape during a match is one of the most fascinating parts of the sport — even if you don't notice it at first.",
      },
    ],
  },
  {
    id: "rivalries",
    name: "Rivalries",
    emoji: "🔥",
    tagline: "Some matches mean far more than three points",
    sections: [
      {
        title: "El Clásico — Barcelona vs Real Madrid",
        body: "The biggest club match in the world. Barcelona represents Catalonia and its distinct cultural identity, while Real Madrid represents the Spanish capital. The history, the politics, and the decades of world-class players make this unmissable every single time it's played.",
      },
      {
        title: "The Manchester Derby — Man City vs Man United",
        body: "Two giants sharing the same city but very different worlds. United dominated English football for decades under Sir Alex Ferguson. City's takeover shifted the power balance completely. Every derby is a statement of who really owns Manchester.",
      },
      {
        title: "The North London Derby — Arsenal vs Tottenham",
        body: "Two clubs separated by just 4 miles who genuinely cannot stand each other. Spurs fans mock Arsenal for recent trophy droughts. Arsenal fans remind Tottenham of their own longer wait for a league title. Neither side can afford to lose this one.",
      },
      {
        title: "Der Klassiker — Bayern Munich vs Borussia Dortmund",
        body: "Germany's defining rivalry. Bayern Munich are wealthy, dominant, and consistent — Germany's answer to Real Madrid. Dortmund are electric, built on young talent, and the closest thing to a genuine challenger. Every Klassiker asks the same question: is anyone going to stop Bayern?",
      },
      {
        title: "Why Rivalries Matter",
        body: "Rivalries give soccer its emotional weight. These aren't just regular games — they're about pride, identity, local bragging rights, and history that stretches back generations. When your team beats their rivals, it counts for far more than an ordinary win.",
      },
    ],
  },
  {
    id: "history",
    name: "History",
    emoji: "🏆",
    tagline: "How soccer became the world's most popular sport",
    sections: [
      {
        title: "Where It All Started",
        body: "The modern game was officially codified in England in 1863 when the Football Association wrote the first unified rulebook. Before that, different schools and towns played wildly different versions — some allowed carrying the ball, which eventually split off to become rugby.",
      },
      {
        title: "Going Global",
        body: "Soccer spread through the British Empire and beyond in the late 1800s. Sailors, merchants, and workers brought the game to South America, Africa, and Asia. By the early 1900s, it was already the world's most-played sport.",
      },
      {
        title: "The World Cup",
        body: "FIFA, the global governing body, was founded in 1904. The first FIFA World Cup was held in Uruguay in 1930. Today it's the single biggest sporting event on the planet, watched by billions across every country. The 2026 World Cup is hosted across the USA, Canada, and Mexico.",
      },
      {
        title: "Club Competitions",
        body: "The UEFA Champions League is the pinnacle of club soccer — the best clubs in Europe competing for the most prestigious trophy in the game. It began in 1955 as the European Cup. Winning it is what every club manager and player dreams of.",
      },
      {
        title: "The Modern Era",
        body: "The Premier League launched in 1992 and transformed soccer's commercial appeal. Huge TV deals, global superstars, and billion-dollar clubs turned the sport into a worldwide industry. Yet at its heart, soccer is still the same: 22 players, one ball, and a goal.",
      },
    ],
  },
]

interface ModuleLessonProps {
  moduleId: string
  onComplete: () => Promise<void>
  onBack: () => void
}

export function ModuleLesson({ moduleId, onComplete, onBack }: ModuleLessonProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const lesson = LESSONS.find((l) => l.id === moduleId)
  if (!lesson) return null

  async function handleComplete() {
    setIsCompleting(true)
    try {
      await onComplete()
    } finally {
      setIsCompleting(false)
    }
  }

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
            onClick={handleComplete}
            disabled={isCompleting}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {isCompleting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving progress…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Got it — Mark as Complete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
