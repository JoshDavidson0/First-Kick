import { format } from "date-fns";
import { Fixture, FixtureErrorCode, FixturesResult } from "@/types";
import { canonicalizeTeamName } from "@/lib/teamNames";

export const PUBLISHED_FIXTURES_URL =
  "https://raw.githubusercontent.com/JoshDavidson0/First-Kick-Retired/data/fixtures.json";

export const MAX_DATA_AGE_DAYS = 8;

const DAY_MS = 24 * 60 * 60 * 1000;

export const FIXTURE_ERROR_MESSAGES: Record<FixtureErrorCode, string> = {
  missing_team: "No team was provided, so fixtures can't be loaded.",
  fetch_failed: "We couldn't load fixture data right now. Please try again later.",
  invalid_data: "The fixture data we received was not in the expected format.",
  stale_data: "Fixture data is out of date (last updated {date}). It refreshes every Tuesday. Please check back later.",
  team_not_found: "No fixtures were found for this team in the current season.",
  network_error: "Couldn't reach the fixtures service. Check that the app is running and try again.",
};

export function fixtureError(code: FixtureErrorCode): FixturesResult {
  return { ok: false, code, message: FIXTURE_ERROR_MESSAGES[code] };
}

/**
 * Validates published fixture JSON and returns the fixtures for one team.
 * Pure: no fetching, so it can be checked without the network or the data branch.
 */
export function evaluatePublishedFixtures(json: unknown, team: string, now: Date): FixturesResult {
  const data = json as Record<string, unknown> | null;
  const lastUpdated = typeof data?.lastUpdated === "string" ? new Date(data.lastUpdated) : null;

  if (
    !data ||
    data.schemaVersion !== 1 ||
    !lastUpdated ||
    Number.isNaN(lastUpdated.getTime()) ||
    typeof data.season !== "string" ||
    !Array.isArray(data.fixtures)
  ) {
    return fixtureError("invalid_data");
  }

  if (now.getTime() - lastUpdated.getTime() > MAX_DATA_AGE_DAYS * DAY_MS) {
    return {
      ok: false,
      code: "stale_data",
      message: FIXTURE_ERROR_MESSAGES.stale_data.replace("{date}", format(lastUpdated, "MMM d, yyyy")),
      lastUpdated: data.lastUpdated as string,
    };
  }

  const requestedTeam = canonicalizeTeamName(team);
  const fixtures = (data.fixtures as Fixture[])
    .map((f) => ({
      ...f,
      homeTeam: canonicalizeTeamName(f.homeTeam),
      awayTeam: canonicalizeTeamName(f.awayTeam),
    }))
    .filter((f) => f.homeTeam === requestedTeam || f.awayTeam === requestedTeam);

  if (fixtures.length === 0) {
    return fixtureError("team_not_found");
  }

  return { ok: true, fixtures, lastUpdated: data.lastUpdated as string, season: data.season };
}
