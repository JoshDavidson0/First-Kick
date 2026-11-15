// Shared TypeScript types for First Kick V2.

import type { Game, Trait } from "@/lib/quiz";
import type { ModuleId } from "@/lib/lessons";

export type QuizData = {
  sessionId: string
  personalityTraits: Trait[]
  favoriteGames: Game[]
}

export type Fixture = {
  matchId: string
  homeTeam: string
  awayTeam: string
  date: string // ISO 8601 date string
  score: { home: number | null; away: number | null } | null
  competition: "Premier League"
}

export type FixtureErrorCode =
  | "missing_team"
  | "fetch_failed"
  | "invalid_data"
  | "stale_data"
  | "team_not_found"
  | "network_error" // client-side only: the request to /api/fixtures itself failed

export type FixturesResult =
  | { ok: true; fixtures: Fixture[]; lastUpdated: string; season: string }
  | { ok: false; code: FixtureErrorCode; message: string; lastUpdated?: string }

export type SessionData = {
  sessionId: string
  favoriteTeam: string
  favoritePlayer: string
  favoriteLeague: string
  reason: string
  progress: {
    completedModules: ModuleId[]
    currentModule: ModuleId
    lastActive: string
  }
  createdAt: string
  lastActive: string
}

export type RecommendationResponse = {
  team: string
  player: string
  league: string
  reason: string
}

export type ProgressResponse = {
  status: string
  progress: {
    completedModules: string[]
    currentModule: string
    lastActive: string
  }
}
