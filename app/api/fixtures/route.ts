import { NextResponse } from "next/server";
import { Fixture } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");

  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/PL/matches?season=2025", {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from football-data.org");
    }

    const data = await response.json();
    
    // Map football-data.org response to our Fixture shape
    const mappedFixtures: Fixture[] = data.matches.map((match: any) => ({
      matchId: match.id.toString(),
      homeTeam: match.homeTeam.shortName || match.homeTeam.name,
      awayTeam: match.awayTeam.shortName || match.awayTeam.name,
      date: match.utcDate,
      score: match.score.fullTime.home !== null ? {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away
      } : null,
      competition: "Premier League"
    }));

    // If a team was requested, filter it. Otherwise return all.
    const finalData = team 
      ? mappedFixtures.filter(f => f.homeTeam === team || f.awayTeam === team)
      : mappedFixtures;

    return NextResponse.json(finalData);
  } catch (error) {
    console.error("Fixture API Error:", error);
    // Return a fallback flag so the client knows to use static data
    return NextResponse.json({ fallback: true });
  }
}
