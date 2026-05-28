import { Fixture } from "@/types";
import { getFixturesForTeam } from "./fixtureData";

/**
 * Client-side helper to fetch fixtures for a team.
 * Falls back to static data if the API fails.
 */
export async function fetchFixtures(teamName: string): Promise<Fixture[]> {
  try {
    const response = await fetch(`/api/fixtures?team=${encodeURIComponent(teamName)}`);
    if (!response.ok) throw new Error("API request failed");
    
    const data = await response.json();
    if (data.fallback) {
      return getFixturesForTeam(teamName);
    }
    
    return data;
  } catch (error) {
    console.error("Failed to fetch live fixtures, using static fallback:", error);
    return getFixturesForTeam(teamName);
  }
}
