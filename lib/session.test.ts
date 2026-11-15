import { beforeEach, describe, expect, it } from "vitest";
import { clearSession, completeModule, createSession, loadSession, type SessionStorage } from "@/lib/session";
import type { RecommendationResponse } from "@/types";

function memoryStorage(initial: Record<string, string> = {}) {
  const items = new Map(Object.entries(initial));
  const storage: SessionStorage = {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
    removeItem: (key) => void items.delete(key),
  };
  return { storage, items };
}

const match: RecommendationResponse = {
  team: "Brighton & Hove Albion",
  player: "Kaoru Mitoma",
  league: "Premier League",
  reason: "Because you're analytical…",
};

const savedRecommendation = JSON.stringify({
  favoriteTeam: match.team,
  favoritePlayer: match.player,
  favoriteLeague: match.league,
  reason: match.reason,
});

let mem: ReturnType<typeof memoryStorage>;
beforeEach(() => {
  mem = memoryStorage();
});

describe("createSession", () => {
  it("starts at the first lesson and saves", () => {
    const session = createSession(match, undefined, mem.storage);
    expect(session.favoriteTeam).toBe("Brighton & Hove Albion");
    expect(session.progress).toEqual({ completedModules: [], currentModule: "rules" });
    expect(loadSession(mem.storage)).toEqual(session);
  });

  it("keeps lesson progress on a retake", () => {
    const progress = { completedModules: ["rules" as const], currentModule: "positions" as const };
    const session = createSession({ ...match, team: "Everton" }, progress, mem.storage);
    expect(loadSession(mem.storage)).toEqual({ ...session, favoriteTeam: "Everton", progress });
  });
});

describe("completeModule", () => {
  it("moves through the lessons and saves each step", () => {
    let session = createSession(match, undefined, mem.storage);
    session = completeModule(session, "rules", mem.storage);
    session = completeModule(session, "positions", mem.storage);
    expect(session.progress).toEqual({ completedModules: ["rules", "positions"], currentModule: "formations" });
    expect(loadSession(mem.storage)).toEqual(session);
  });

  it("doesn't record a lesson twice and stays on the last lesson", () => {
    let session = createSession(match, { completedModules: [], currentModule: "history" }, mem.storage);
    session = completeModule(session, "history", mem.storage);
    session = completeModule(session, "history", mem.storage);
    expect(session.progress).toEqual({ completedModules: ["history"], currentModule: "history" });
  });
});

describe("loadSession", () => {
  it("returns null when nothing is saved", () => {
    expect(loadSession(mem.storage)).toBeNull();
  });

  it("restores a save from before this module, and removes the old session id", () => {
    mem = memoryStorage({
      firstkick_session_id: "abc",
      firstkick_recommendation: savedRecommendation,
      firstkick_progress: JSON.stringify({
        completedModules: ["rules"],
        currentModule: "positions",
        lastActive: "2026-11-01T10:00:00.000Z",
      }),
    });
    expect(loadSession(mem.storage)).toEqual({
      favoriteTeam: match.team,
      favoritePlayer: match.player,
      favoriteLeague: match.league,
      reason: match.reason,
      progress: { completedModules: ["rules"], currentModule: "positions" },
    });
    expect(mem.items.has("firstkick_session_id")).toBe(false);
  });

  it("drops completed lessons that no longer exist", () => {
    mem = memoryStorage({
      firstkick_recommendation: savedRecommendation,
      firstkick_progress: JSON.stringify({ completedModules: ["rules", "tactics"], currentModule: "positions" }),
    });
    expect(loadSession(mem.storage)?.progress.completedModules).toEqual(["rules"]);
  });

  it.each([
    ["an unknown current lesson", { firstkick_progress: JSON.stringify({ completedModules: [], currentModule: "tactics" }) }],
    ["corrupt JSON", { firstkick_progress: "{not json" }],
    ["missing progress", { firstkick_progress: undefined }],
    ["a recommendation missing fields", { firstkick_recommendation: JSON.stringify({ favoriteTeam: "Everton" }) }],
  ])("clears the save and returns null for %s", (_, overrides) => {
    const items: Record<string, string> = {
      firstkick_recommendation: savedRecommendation,
      firstkick_progress: JSON.stringify({ completedModules: [], currentModule: "rules" }),
    };
    for (const [key, value] of Object.entries(overrides)) {
      if (value === undefined) delete items[key];
      else items[key] = value;
    }
    mem = memoryStorage(items);
    expect(loadSession(mem.storage)).toBeNull();
    expect(mem.items.size).toBe(0);
  });
});

describe("clearSession", () => {
  it("removes everything the app saves", () => {
    mem = memoryStorage({ firstkick_session_id: "abc" });
    createSession(match, undefined, mem.storage);
    clearSession(mem.storage);
    expect(mem.items.size).toBe(0);
  });
});
