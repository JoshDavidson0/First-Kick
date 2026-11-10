import { isBefore, startOfDay } from "date-fns";
import { Fixture } from "@/types";

export type FixtureStatus = "next" | "upcoming" | "awaiting" | "played";

export type DescribedFixture = {
  fixture: Fixture
  isHome: boolean
  opponent: string
  score: { for: number; against: number } | null
  result: "W" | "D" | "L" | null
  status: FixtureStatus
}

/**
 * Describes a team's fixtures from that team's point of view, sorted by date.
 * Exactly one unplayed fixture dated today or later is "next"; unplayed
 * fixtures before today are "awaiting" a result (data refreshes weekly).
 * Pure: `team` must already be canonical, like the fixtures from /api/fixtures.
 */
export function describeFixtures(fixtures: Fixture[], team: string, now: Date): DescribedFixture[] {
  const today = startOfDay(now);
  let nextFound = false;

  return [...fixtures]
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .map((fixture): DescribedFixture => {
      const isHome = fixture.homeTeam === team;
      const opponent = isHome ? fixture.awayTeam : fixture.homeTeam;
      const { home, away } = fixture.score ?? { home: null, away: null };

      if (home !== null && away !== null) {
        const score = isHome ? { for: home, against: away } : { for: away, against: home };
        const result = score.for > score.against ? "W" : score.for < score.against ? "L" : "D";
        return { fixture, isHome, opponent, score, result, status: "played" };
      }

      let status: FixtureStatus = "upcoming";
      if (isBefore(new Date(fixture.date), today)) {
        status = "awaiting";
      } else if (!nextFound) {
        status = "next";
        nextFound = true;
      }
      return { fixture, isHome, opponent, score: null, result: null, status };
    });
}
