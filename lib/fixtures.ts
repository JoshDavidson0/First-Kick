import { format } from "date-fns";
import { z } from "zod";
import { Fixture, FixtureErrorCode, FixturesResult } from "@/types";
import { resolveTeamName } from "@/lib/teams";

export const PUBLISHED_FIXTURES_URL =
  "https://raw.githubusercontent.com/JoshDavidson0/First-Kick/data/fixtures.json";

export const MAX_DATA_AGE_DAYS = 8;

const DAY_MS = 24 * 60 * 60 * 1000;

export type FixturesResponse = { status: number; body: FixturesResult };

// network_error is produced by the client (hooks/use-fixtures.ts), never here.
type ServerErrorCode = Exclude<FixtureErrorCode, "network_error">;

const ERRORS: Record<ServerErrorCode, { status: number; message: string }> = {
  missing_team: { status: 400, message: "No team was provided, so fixtures can't be loaded." },
  fetch_failed: { status: 502, message: "We couldn't load fixture data right now. Please try again later." },
  invalid_data: { status: 502, message: "The fixture data we received was not in the expected format." },
  stale_data: {
    status: 503,
    message: "Fixture data is out of date (last updated {date}). It refreshes every Tuesday. Please check back later.",
  },
  team_not_found: { status: 404, message: "No fixtures were found for this team in the current season." },
};

function error(code: ServerErrorCode): FixturesResponse {
  const { status, message } = ERRORS[code];
  return { status, body: { ok: false, code, message } };
}

const fixtureSchema = z.object({
  matchId: z.string(),
  homeTeam: z.string(),
  awayTeam: z.string(),
  date: z.string().refine((s) => !Number.isNaN(Date.parse(s))),
  score: z.object({ home: z.number().nullable(), away: z.number().nullable() }).nullable(),
  competition: z.literal("Premier League"),
}) satisfies z.ZodType<Fixture>;

// Shape of fixtures.json on the data branch (written by scripts/fetch-fixtures.mjs).
// Unknown fields are ignored; one invalid fixture rejects the whole file.
const publishedSchema = z.object({
  schemaVersion: z.literal(1),
  lastUpdated: z.string().refine((s) => !Number.isNaN(Date.parse(s))),
  season: z.string(),
  source: z.literal("football-data.org"),
  fixtures: z.array(fixtureSchema),
});

/**
 * Validates published fixture JSON and returns the response for one team.
 * Pure: no fetching, so it can be checked without the network or the data branch.
 */
export function evaluateFixtures(json: unknown, team: string | null, now: Date): FixturesResponse {
  if (!team) return error("missing_team");

  const parsed = publishedSchema.safeParse(json);
  if (!parsed.success) return error("invalid_data");
  const data = parsed.data;

  const lastUpdated = new Date(data.lastUpdated);
  if (now.getTime() - lastUpdated.getTime() > MAX_DATA_AGE_DAYS * DAY_MS) {
    const { status, message } = ERRORS.stale_data;
    return {
      status,
      body: {
        ok: false,
        code: "stale_data",
        message: message.replace("{date}", format(lastUpdated, "MMM d, yyyy")),
        lastUpdated: data.lastUpdated,
      },
    };
  }

  // `team` must be canonical (it comes from the quiz). Published names are
  // canonicalized here, once; unknown clubs keep their published spelling.
  const fixtures = data.fixtures
    .map((f) => ({
      ...f,
      homeTeam: resolveTeamName(f.homeTeam) ?? f.homeTeam,
      awayTeam: resolveTeamName(f.awayTeam) ?? f.awayTeam,
    }))
    .filter((f) => f.homeTeam === team || f.awayTeam === team);

  if (fixtures.length === 0) return error("team_not_found");

  return {
    status: 200,
    body: { ok: true, fixtures, lastUpdated: data.lastUpdated, season: data.season },
  };
}

/** Fetches the published file (cached for 1 hour) and evaluates it for one team. */
export async function loadFixtures(team: string | null, now = new Date()): Promise<FixturesResponse> {
  if (!team) return error("missing_team");

  let response: Response;
  try {
    response = await fetch(PUBLISHED_FIXTURES_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
  } catch {
    return error("fetch_failed");
  }

  if (!response.ok) return error("fetch_failed");

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    return error("invalid_data");
  }

  return evaluateFixtures(json, team, now);
}
