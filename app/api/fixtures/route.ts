import { NextResponse } from "next/server";
import { Fixture } from "@/types";
import { canonicalizeTeamName } from "@/lib/teamNames";
import { rateLimit } from "@/lib/rateLimit";

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

  if (!apiKey) {
    return NextResponse.json({ fallback: true });
  }

  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/PL/matches?season=2025", {
      headers: {
        "X-Auth-Token": apiKey
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json({ fallback: true });
    }

    const data = await response.json();
    
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
    // Return a fallback flag so the client knows to use static data
    return NextResponse.json({ fallback: true });
  }
}
