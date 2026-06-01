"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { QuizForm } from "@/components/quiz-form";
import { RecommendationCard } from "@/components/recommendation-card";
import { ProgressJourney } from "@/components/progress-journey";
import { ModuleLesson } from "@/components/module-lesson";
import { FixtureList } from "@/components/FixtureList";
import type { QuizData, SessionData } from "@/types";
import { getMatch } from "@/lib/matcher";
import { ChevronDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Screen union — one discriminated variant per screen
// ---------------------------------------------------------------------------

type Screen =
  | { name: "hero" }
  | { name: "quiz" }
  | { name: "recommendation"; session: SessionData }
  | { name: "journey"; session: SessionData }
  | { name: "lesson"; moduleId: string; session: SessionData }

// ---------------------------------------------------------------------------
// LocalStorage Keys
// ---------------------------------------------------------------------------

const STORAGE_KEYS = {
  SESSION_ID: "firstkick_session_id",
  RECOMMENDATION: "firstkick_recommendation",
  PROGRESS: "firstkick_progress",
};

// ---------------------------------------------------------------------------
// Page — navigation state machine
// ---------------------------------------------------------------------------

export default function Home() {
  const [screen, setScreen] = useState<Screen | null>(null);

  // Initial load from localStorage
  useEffect(() => {
    try {
      const sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
      const recommendation = localStorage.getItem(STORAGE_KEYS.RECOMMENDATION);
      const progress = localStorage.getItem(STORAGE_KEYS.PROGRESS);

      if (sessionId && recommendation && progress) {
        const session: SessionData = {
          sessionId,
          ...JSON.parse(recommendation),
          progress: JSON.parse(progress),
          createdAt: new Date().toISOString(), // Fallback
          lastActive: new Date().toISOString(),
        };
        setScreen({ name: "recommendation", session });
      } else {
        setScreen({ name: "hero" });
      }
    } catch (e) {
      console.error("Error loading session:", e);
      setScreen({ name: "hero" });
    }
  }, []);

  const handleQuizSubmit = (quizData: QuizData) => {
    const match = getMatch(quizData);
    const sessionId = quizData.sessionId || crypto.randomUUID();
    const now = new Date().toISOString();
    
    const progress = {
      completedModules: [],
      currentModule: "rules",
      lastActive: now,
    };

    const session: SessionData = {
      sessionId,
      favoriteTeam: match.team,
      favoritePlayer: match.player,
      favoriteLeague: match.league,
      reason: match.reason,
      progress,
      createdAt: now,
      lastActive: now,
    };

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
    localStorage.setItem(STORAGE_KEYS.RECOMMENDATION, JSON.stringify({
      favoriteTeam: session.favoriteTeam,
      favoritePlayer: session.favoritePlayer,
      favoriteLeague: session.favoriteLeague,
      reason: session.reason,
    }));
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));

    setScreen({ name: "recommendation", session });
  };

  const handleModuleComplete = async (moduleId: string, session: SessionData) => {
    const updatedCompletedModules = Array.from(new Set([...session.progress.completedModules, moduleId]));
    
    // Simple linear progression: rules -> positions -> formations -> rivalries -> history
    const modules = ["rules", "positions", "formations", "rivalries", "history"];
    const currentIndex = modules.indexOf(moduleId);
    const nextModule = modules[currentIndex + 1] || moduleId;

    const updatedProgress = {
      ...session.progress,
      completedModules: updatedCompletedModules,
      currentModule: nextModule,
      lastActive: new Date().toISOString(),
    };

    const updatedSession = {
      ...session,
      progress: updatedProgress,
    };

    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updatedProgress));
    setScreen({ name: "journey", session: updatedSession });
  };

  const handleStartOver = () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
    localStorage.removeItem(STORAGE_KEYS.RECOMMENDATION);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
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
          <QuizForm onSubmit={handleQuizSubmit} />
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
              onRetake={() => setScreen({ name: "quiz" })}
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
            onComplete={() => handleModuleComplete(screen.moduleId, screen.session)}
            onBack={() =>
              setScreen({ name: "journey", session: screen.session })
            }
          />
        </main>
      );
  }
}
