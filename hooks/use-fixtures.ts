"use client";

import { useCallback, useEffect, useState } from "react";
import { FixturesResult } from "@/types";

const NETWORK_ERROR_MESSAGE =
  "Couldn't reach the fixtures service. Check that the app is running and try again.";

function isFixturesResult(body: unknown): body is FixturesResult {
  const result = body as FixturesResult | null;
  if (!result || typeof result !== "object") return false;
  return result.ok === true
    ? Array.isArray(result.fixtures)
    : result.ok === false && typeof result.code === "string" && typeof result.message === "string";
}

// Returns the route's result as-is, whatever the HTTP status.
async function fetchFixtures(team: string): Promise<FixturesResult> {
  try {
    const response = await fetch(`/api/fixtures?team=${encodeURIComponent(team)}`);
    const body = await response.json();
    if (isFixturesResult(body)) return body;
  } catch {
    // Fall through to network_error
  }

  return { ok: false, code: "network_error", message: NETWORK_ERROR_MESSAGE };
}

/**
 * Loads a team's fixtures from /api/fixtures. `team` should be canonical.
 * Responses for a team (or attempt) that is no longer current are ignored.
 */
export function useFixtures(team: string) {
  const [state, setState] = useState<FixturesResult | "loading">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let current = true;
    setState("loading");
    fetchFixtures(team).then((result) => {
      if (current) setState(result);
    });
    return () => {
      current = false;
    };
  }, [team, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { state, retry };
}
