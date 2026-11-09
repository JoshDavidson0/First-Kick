"use client";

import { useState, useEffect, useCallback } from "react";
import { Fixture, FixtureErrorCode } from "@/types";
import { fetchFixtures } from "@/lib/fixtureApi";
import { canonicalizeTeamName } from "@/lib/teamNames";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CalendarDays, MapPin } from "lucide-react";
import { format, isPast, isToday } from "date-fns";

interface FixtureListProps {
  teamName: string;
}

export function FixtureList({ teamName }: FixtureListProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [season, setSeason] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<{ code: FixtureErrorCode; message: string } | null>(null);
  const canonicalTeamName = canonicalizeTeamName(teamName);

  const loadFixtures = useCallback(async () => {
    setStatus("loading");
    setError(null);

    const result = await fetchFixtures(canonicalTeamName);
    if (result.ok) {
      setFixtures(result.fixtures);
      setSeason(result.season);
      setLastUpdated(result.lastUpdated);
      setStatus("success");
    } else {
      setFixtures([]);
      setError({ code: result.code, message: result.message });
      setStatus("error");
    }
  }, [canonicalTeamName]);

  useEffect(() => {
    loadFixtures();
  }, [loadFixtures]);

  const renderFixture = (fixture: Fixture) => {
    const fixtureDate = new Date(fixture.date);
    const isHome = canonicalizeTeamName(fixture.homeTeam) === canonicalTeamName;
    const opponent = isHome ? fixture.awayTeam : fixture.homeTeam;
    const played = fixture.score !== null;
    const isNext = !played && (isToday(fixtureDate) || !isPast(fixtureDate));
    const userScore = played ? (isHome ? fixture.score!.home : fixture.score!.away) : null;
    const opponentScore = played ? (isHome ? fixture.score!.away : fixture.score!.home) : null;

    let resultLetter = "D";
    let resultWord = "Draw";
    let resultClass = "bg-gray-500 text-white border-transparent";

    if (played && userScore !== null && opponentScore !== null) {
      if (userScore > opponentScore) {
        resultLetter = "W";
        resultWord = "Win";
        resultClass = "bg-green-500 text-white border-transparent";
      } else if (userScore < opponentScore) {
        resultLetter = "L";
        resultWord = "Loss";
        resultClass = "bg-red-500 text-white border-transparent";
      }
    }

    return (
      <div 
        key={fixture.matchId} 
        className={`flex items-center justify-between p-4 border-b last:border-0 ${played ? 'opacity-70 bg-muted/30' : ''} ${isNext ? 'bg-primary/5 ring-1 ring-primary/20 rounded-md my-1' : ''}`}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            {format(fixtureDate, "PPP 'at' p")}
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {isHome ? "Home" : "Away"}
            </span>
            <span className="text-lg">vs {opponent}</span>
            {isNext && <Badge variant="default" className="ml-2">Next Match</Badge>}
            {!played && !isNext && <Badge variant="secondary" className="ml-2">Upcoming</Badge>}
          </div>
        </div>

        <div className="text-right">
          {played ? (
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-3">
                <Badge className={`${resultClass} w-7 h-7 flex items-center justify-center rounded-full p-0 text-sm font-bold shadow-sm`}>
                  {resultLetter}
                </Badge>
                <span className="text-2xl font-bold tabular-nums">
                  {fixture.score?.home} – {fixture.score?.away}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  ({resultLetter}) {resultWord}
                </span>
              </div>
              <Badge variant="outline" className="mt-1">Final Result</Badge>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>TBD</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-primary/5">
        <div>
          <CardTitle>{status === "success" ? `${season} Season Schedule` : "Season Schedule"}</CardTitle>
          <p className="text-sm text-muted-foreground">Full fixtures and results for {teamName}</p>
        </div>
        {status === "success" && lastUpdated && (
          <Badge variant="outline">
            Updated {format(new Date(lastUpdated), "MMM d, yyyy")}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {status === "loading" && (
          <div className="flex flex-col gap-3 p-4" aria-busy="true">
            <span className="sr-only">Loading fixtures…</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        )}

        {status === "error" && error && (
          <div className="p-4">
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Fixtures unavailable</AlertTitle>
              <AlertDescription>
                <p>{error.message}</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={loadFixtures}>
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {status === "success" && (
          <ScrollArea className="h-[500px]">
            <div className="flex flex-col">
              {fixtures.map(renderFixture)}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
