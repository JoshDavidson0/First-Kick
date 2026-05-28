import { Fixture } from "@/types";
import { canonicalizeTeamName } from "@/lib/teamNames";
import { getFixturesForTeam } from "./fixtureData";

/**
 * Client-side helper to fetch fixtures for a team.
 * Falls back to static data if the API fails or returns no matches.
 */
export async function fetchFixtures(teamName: string): Promise<Fixture[]> {
  const canonical = canonicalizeTeamName(teamName);

  try {
    const response = await fetch(
      `/api/fixtures?team=${encodeURIComponent(canonical)}`
    );
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    if (data.fallback || !Array.isArray(data) || data.length === 0) {
      return getFixturesForTeam(canonical);
    }

    return data;
  } catch {
    return getFixturesForTeam(canonical);
  }
}
