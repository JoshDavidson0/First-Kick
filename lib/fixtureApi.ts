import { Fixture } from "@/types";
import { canonicalizeTeamName } from "@/lib/teamNames";
import { getFixturesForTeam } from "./fixtureData";

/**
 * Client-side helper to fetch fixtures for a team.
 * Returns the data and a flag indicating if it's live data.
 */
export async function fetchFixtures(teamName: string): Promise<{ data: Fixture[], isLive: boolean }> {
  const canonical = canonicalizeTeamName(teamName);

  try {
    const response = await fetch(
      `/api/fixtures?team=${encodeURIComponent(canonical)}`
    );
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    if (data.fallback || !Array.isArray(data) || data.length === 0) {
      return { data: getFixturesForTeam(canonical), isLive: false };
    }

    return { data, isLive: true };
  } catch {
    return { data: getFixturesForTeam(canonical), isLive: false };
  }
}
