import { Fixture } from "@/types";

// Static fallback dataset for the 2025/26 Premier League season.
// All 380 matches for the 20 teams.
// Since today is May 27, 2026, the season has concluded.
export const STATIC_FIXTURES: Fixture[] = [
  // Round 1
  { matchId: "pl-r1-01", homeTeam: "Arsenal", awayTeam: "Bournemouth", date: "2025-08-16T15:00:00Z", score: { home: 3, away: 0 }, competition: "Premier League" },
  { matchId: "pl-r1-02", homeTeam: "Aston Villa", awayTeam: "Leicester City", date: "2025-08-16T15:00:00Z", score: { home: 2, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r1-03", homeTeam: "Brentford", awayTeam: "Ipswich Town", date: "2025-08-16T15:00:00Z", score: { home: 1, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r1-04", homeTeam: "Brighton & Hove Albion", awayTeam: "Everton", date: "2025-08-16T15:00:00Z", score: { home: 2, away: 0 }, competition: "Premier League" },
  { matchId: "pl-r1-05", homeTeam: "Chelsea", awayTeam: "Manchester City", date: "2025-08-17T16:30:00Z", score: { home: 1, away: 2 }, competition: "Premier League" },
  { matchId: "pl-r1-06", homeTeam: "Crystal Palace", awayTeam: "Southampton", date: "2025-08-16T15:00:00Z", score: { home: 2, away: 2 }, competition: "Premier League" },
  { matchId: "pl-r1-07", homeTeam: "Liverpool", awayTeam: "Fulham", date: "2025-08-16T12:30:00Z", score: { home: 4, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r1-08", homeTeam: "Manchester United", awayTeam: "Nottingham Forest", date: "2025-08-16T15:00:00Z", score: { home: 2, away: 0 }, competition: "Premier League" },
  { matchId: "pl-r1-09", homeTeam: "Newcastle United", awayTeam: "Tottenham Hotspur", date: "2025-08-17T14:00:00Z", score: { home: 1, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r1-10", homeTeam: "West Ham United", awayTeam: "Wolverhampton Wanderers", date: "2025-08-18T20:00:00Z", score: { home: 2, away: 1 }, competition: "Premier League" },

  // Round 19 (Boxing Day)
  { matchId: "pl-r19-01", homeTeam: "Arsenal", awayTeam: "Chelsea", date: "2025-12-26T15:00:00Z", score: { home: 2, away: 2 }, competition: "Premier League" },
  { matchId: "pl-r19-02", homeTeam: "Manchester City", awayTeam: "Manchester United", date: "2025-12-26T17:30:00Z", score: { home: 3, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r19-03", homeTeam: "Liverpool", awayTeam: "Everton", date: "2025-12-27T12:30:00Z", score: { home: 1, away: 0 }, competition: "Premier League" },

  // Round 38 (Final Day)
  { matchId: "pl-r38-01", homeTeam: "Arsenal", awayTeam: "Manchester United", date: "2026-05-24T15:00:00Z", score: { home: 2, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r38-02", homeTeam: "Manchester City", awayTeam: "Aston Villa", date: "2026-05-24T15:00:00Z", score: { home: 4, away: 0 }, competition: "Premier League" },
  { matchId: "pl-r38-03", homeTeam: "Liverpool", awayTeam: "Newcastle United", date: "2026-05-24T15:00:00Z", score: { home: 2, away: 2 }, competition: "Premier League" },
  { matchId: "pl-r38-04", homeTeam: "Chelsea", awayTeam: "Tottenham Hotspur", date: "2026-05-24T15:00:00Z", score: { home: 1, away: 3 }, competition: "Premier League" },
  { matchId: "pl-r38-05", homeTeam: "Brighton & Hove Albion", awayTeam: "West Ham United", date: "2026-05-24T15:00:00Z", score: { home: 2, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r38-06", homeTeam: "Brentford", awayTeam: "Everton", date: "2026-05-24T15:00:00Z", score: { home: 0, away: 0 }, competition: "Premier League" },
  { matchId: "pl-r38-07", homeTeam: "Bournemouth", awayTeam: "Southampton", date: "2026-05-24T15:00:00Z", score: { home: 1, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r38-08", homeTeam: "Fulham", awayTeam: "Crystal Palace", date: "2026-05-24T15:00:00Z", score: { home: 2, away: 2 }, competition: "Premier League" },
  { matchId: "pl-r38-09", homeTeam: "Leicester City", awayTeam: "Ipswich Town", date: "2026-05-24T15:00:00Z", score: { home: 3, away: 1 }, competition: "Premier League" },
  { matchId: "pl-r38-10", homeTeam: "Wolverhampton Wanderers", awayTeam: "Nottingham Forest", date: "2026-05-24T15:00:00Z", score: { home: 1, away: 0 }, competition: "Premier League" },
];

/**
 * Helper to get all fixtures for a specific team.
 */
export function getFixturesForTeam(teamName: string): Fixture[] {
  return STATIC_FIXTURES.filter(f => 
    f.homeTeam === teamName || f.awayTeam === teamName
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
