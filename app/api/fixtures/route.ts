import { NextResponse } from "next/server";
import { Fixture } from "@/types";
import { canonicalizeTeamName } from "@/lib/teamNames";
import { rateLimit } from "@/lib/rateLimit";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // 1. Rate limiting
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { allowed } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { fallback: true, reason: "rate_limited" },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");
  const requestedTeam = team ? canonicalizeTeamName(team) : null;
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  // Debug log for Amplify logs (viewable in CloudWatch/Amplify Console)
  console.log(`[API] Fetching fixtures for ${requestedTeam}. API Key present: ${!!apiKey}`);

  if (!apiKey) {
    return NextResponse.json({ fallback: true, reason: "missing_api_key" });
  }

  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/PL/matches?season=2025", {
      headers: {
        "X-Auth-Token": apiKey
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`[API] External API error: ${response.status} ${response.statusText}`);
      return NextResponse.json({ fallback: true, reason: "api_fetch_failed" });
    }

    const data = await response.json();
    
    if (!data.matches) {
      console.error("[API] Unexpected response structure from football-data.org", data);
      return NextResponse.json({ fallback: true, reason: "invalid_api_response" });
    }

    // Map football-data.org response to our Fixture shape
    const mappedFixtures: Fixture[] = data.matches.map((match: any) => ({
      matchId: match.id.toString(),
      homeTeam: canonicalizeTeamName(match.homeTeam.shortName || match.homeTeam.name),
      awayTeam: canonicalizeTeamName(match.awayTeam.shortName || match.awayTeam.name),
      date: match.utcDate,
      score: match.score.fullTime.home !== null ? {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away
      } : null,
      competition: "Premier League"
    }));

    // If a team was requested, filter it. Otherwise return all.
    const finalData = requestedTeam
      ? mappedFixtures.filter(f => f.homeTeam === requestedTeam || f.awayTeam === requestedTeam)
      : mappedFixtures;

    return NextResponse.json(finalData);
  } catch (error) {
    console.error("[API] Caught error in route handler:", error);
    return NextResponse.json({ fallback: true, reason: "internal_server_error" });
  }
}
