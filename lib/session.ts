import { z } from "zod";
import { isModuleId, MODULE_IDS, nextModule, type ModuleId } from "@/lib/lessons";
import type { RecommendationResponse, SessionData } from "@/types";

/** The subset of the Web Storage API the session needs; tests pass an in-memory one. */
export type SessionStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const KEYS = {
  RECOMMENDATION: "firstkick_recommendation",
  PROGRESS: "firstkick_progress",
};

// Written by earlier versions and never read; removed whenever it's found.
const LEGACY_SESSION_ID_KEY = "firstkick_session_id";

const recommendationSchema = z.object({
  favoriteTeam: z.string(),
  favoritePlayer: z.string(),
  favoriteLeague: z.string(),
  reason: z.string(),
});

// Lessons that no longer exist are dropped from completedModules, but an
// unknown currentModule leaves nowhere to continue, so the save is invalid.
const progressSchema = z.object({
  completedModules: z.array(z.string()).transform((ids) => ids.filter(isModuleId)),
  currentModule: z.string().refine(isModuleId),
});

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function saveRecommendation(session: SessionData, storage: SessionStorage) {
  const { favoriteTeam, favoritePlayer, favoriteLeague, reason } = session;
  storage.setItem(KEYS.RECOMMENDATION, JSON.stringify({ favoriteTeam, favoritePlayer, favoriteLeague, reason }));
}

function saveProgress(session: SessionData, storage: SessionStorage) {
  storage.setItem(KEYS.PROGRESS, JSON.stringify(session.progress));
}

/**
 * Restores the saved session, or returns null if there is none.
 * A save that is incomplete or doesn't validate is cleared.
 */
export function loadSession(storage: SessionStorage = localStorage): SessionData | null {
  storage.removeItem(LEGACY_SESSION_ID_KEY);

  const recommendationText = storage.getItem(KEYS.RECOMMENDATION);
  const progressText = storage.getItem(KEYS.PROGRESS);
  if (recommendationText === null && progressText === null) return null;

  const recommendation = recommendationSchema.safeParse(parseJson(recommendationText ?? ""));
  const progress = progressSchema.safeParse(parseJson(progressText ?? ""));
  if (!recommendation.success || !progress.success) {
    clearSession(storage);
    return null;
  }

  return {
    ...recommendation.data,
    progress: {
      completedModules: progress.data.completedModules,
      currentModule: progress.data.currentModule as ModuleId,
    },
  };
}

/**
 * Starts a session for a quiz match and saves it. Pass `progress` to keep
 * lesson progress across a retake; otherwise it starts at the first lesson.
 */
export function createSession(
  match: RecommendationResponse,
  progress: SessionData["progress"] = { completedModules: [], currentModule: MODULE_IDS[0] },
  storage: SessionStorage = localStorage
): SessionData {
  const session: SessionData = {
    favoriteTeam: match.team,
    favoritePlayer: match.player,
    favoriteLeague: match.league,
    reason: match.reason,
    progress,
  };
  saveRecommendation(session, storage);
  saveProgress(session, storage);
  return session;
}

/** Marks a lesson complete, moves on to the next one, and saves the result. */
export function completeModule(
  session: SessionData,
  moduleId: ModuleId,
  storage: SessionStorage = localStorage
): SessionData {
  const completed = session.progress.completedModules;
  const updated: SessionData = {
    ...session,
    progress: {
      completedModules: completed.includes(moduleId) ? completed : [...completed, moduleId],
      currentModule: nextModule(moduleId),
    },
  };
  saveProgress(updated, storage);
  return updated;
}

/** Removes everything the app saves (Start Over, or a save that didn't validate). */
export function clearSession(storage: SessionStorage = localStorage) {
  storage.removeItem(KEYS.RECOMMENDATION);
  storage.removeItem(KEYS.PROGRESS);
  storage.removeItem(LEGACY_SESSION_ID_KEY);
}
