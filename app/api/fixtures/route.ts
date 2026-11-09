import { NextResponse } from "next/server";
import { FixturesResult } from "@/types";
import {
  PUBLISHED_FIXTURES_URL,
  evaluatePublishedFixtures,
  fixtureError,
} from "@/lib/publishedFixtures";

export const dynamic = 'force-dynamic';

const ERROR_STATUS: Record<string, number> = {
  missing_team: 400,
  fetch_failed: 502,
  invalid_data: 502,
  stale_data: 503,
  team_not_found: 404,
};

function respond(team: string | null, result: FixturesResult) {
  const status = result.ok ? 200 : ERROR_STATUS[result.code] ?? 500;
  // One line per outcome (visible in the terminal running npm run dev)
  console.log(`[API] fixtures team=${team ?? "-"} -> ${result.ok ? `ok (${result.fixtures.length})` : result.code} ${status}`);
  return NextResponse.json(result, { status });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");

  if (!team) {
    return respond(null, fixtureError("missing_team"));
  }

  let response: Response;
  try {
    response = await fetch(PUBLISHED_FIXTURES_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
  } catch {
    return respond(team, fixtureError("fetch_failed"));
  }

  if (!response.ok) {
    return respond(team, fixtureError("fetch_failed"));
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    return respond(team, fixtureError("invalid_data"));
  }

  return respond(team, evaluatePublishedFixtures(json, team, new Date()));
}
