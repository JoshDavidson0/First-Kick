"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { QuizForm } from "@/components/quiz-form";
import { RecommendationCard } from "@/components/recommendation-card";
import { ProgressJourney } from "@/components/progress-journey";
import { ModuleLesson } from "@/components/module-lesson";
import { FixtureList } from "@/components/FixtureList";
import type { SessionData } from "@/types";
import { getMatch } from "@/lib/matcher";
import type { ModuleId } from "@/lib/lessons";
import { clearSession, completeModule, createSession, loadSession } from "@/lib/session";
import { ChevronDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Screen union — one discriminated variant per screen
// ---------------------------------------------------------------------------

type Screen =
  | { name: "hero" }
  | { name: "quiz"; progress?: SessionData["progress"] } // progress is kept on a retake
  | { name: "recommendation"; session: SessionData }
  | { name: "journey"; session: SessionData }
  | { name: "lesson"; moduleId: ModuleId; session: SessionData }

// ---------------------------------------------------------------------------
// Page — navigation state machine (saving and loading live in lib/session)
// ---------------------------------------------------------------------------

export default function Home() {
  const [screen, setScreen] = useState<Screen | null>(null);

  // Restore a saved session, if there is a valid one
  useEffect(() => {
    try {
      const session = loadSession();
      setScreen(session ? { name: "recommendation", session } : { name: "hero" });
    } catch (e) {
      console.error("Error loading session:", e);
      setScreen({ name: "hero" });
    }
  }, []);

  const handleStartOver = () => {
    clearSession();
    setScreen({ name: "quiz" });
  };

  if (!screen) return null; // Prevent hydration mismatch

  switch (screen.name) {
    case "hero":
      return (
        <main className="min-h-screen">
          <HeroSection onStart={() => setScreen({ name: "quiz" })} />
        </main>
      );

    case "quiz":
      return (
        <main className="min-h-screen py-12 px-4">
          <QuizForm
            onSubmit={(quizData) =>
              setScreen({ name: "recommendation", session: createSession(getMatch(quizData), screen.progress) })
            }
          />
        </main>
      );

    case "recommendation":
      return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
          <div className="flex flex-col">
            <RecommendationCard
              team={screen.session.favoriteTeam}
              player={screen.session.favoritePlayer}
              league={screen.session.favoriteLeague}
              reason={screen.session.reason}
              isLoading={false}
              error={null}
              onViewJourney={() => setScreen({ name: "journey", session: screen.session })}
              onRetake={() => setScreen({ name: "quiz", progress: screen.session.progress })}
            />

            <div className="flex flex-col items-center animate-bounce text-muted-foreground py-4">
              <span className="text-sm mb-1">Scroll down to see your team's full season</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <FixtureList teamName={screen.session.favoriteTeam} />
            </div>

            <div className="flex justify-center py-12">
              <button
                onClick={handleStartOver}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Start Over / Reset All Progress
              </button>
            </div>
          </div>
        </main>
      );

    case "journey":
      return (
        <main className="min-h-screen py-12 px-4">
          <ProgressJourney
            completedModules={screen.session.progress.completedModules}
            currentModule={screen.session.progress.currentModule}
            onContinue={(module) =>
              setScreen({ name: "lesson", moduleId: module, session: screen.session })
            }
            onViewRecommendation={() =>
              setScreen({ name: "recommendation", session: screen.session })
            }
          />
        </main>
      );

    case "lesson":
      return (
        <main className="min-h-screen py-12 px-4">
          <ModuleLesson
            moduleId={screen.moduleId}
            onComplete={() =>
              setScreen({ name: "journey", session: completeModule(screen.session, screen.moduleId) })
            }
            onBack={() =>
              setScreen({ name: "journey", session: screen.session })
            }
          />
        </main>
      );
  }
}
