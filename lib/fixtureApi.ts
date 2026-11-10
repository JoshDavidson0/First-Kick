import { FixturesResult } from "@/types";
import { canonicalizeTeamName } from "@/lib/teamNames";

const NETWORK_ERROR_MESSAGE =
  "Couldn't reach the fixtures service. Check that the app is running and try again.";

function isFixturesResult(body: unknown): body is FixturesResult {
  const result = body as FixturesResult | null;
  if (!result || typeof result !== "object") return false;
  return result.ok === true
    ? Array.isArray(result.fixtures)
    : result.ok === false && typeof result.code === "string" && typeof result.message === "string";
}

/**
 * Client-side helper to fetch fixtures for a team.
 * Returns the route's result as-is, whatever the HTTP status.
 */
export async function fetchFixtures(teamName: string): Promise<FixturesResult> {
  const canonical = canonicalizeTeamName(teamName);

  try {
    const response = await fetch(
      `/api/fixtures?team=${encodeURIComponent(canonical)}`
    );
    const body = await response.json();
    if (isFixturesResult(body)) return body;
  } catch {
    // Fall through to network_error
  }

  return { ok: false, code: "network_error", message: NETWORK_ERROR_MESSAGE };
}
