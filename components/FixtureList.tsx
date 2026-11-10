"use client";

import { canonicalizeTeamName } from "@/lib/teamNames";
import { describeFixtures, DescribedFixture } from "@/lib/describeFixtures";
import { useFixtures } from "@/hooks/use-fixtures";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface FixtureListProps {
  teamName: string;
}

const RESULT_DISPLAY = {
  W: { word: "Win", className: "bg-green-500 text-white border-transparent" },
  D: { word: "Draw", className: "bg-gray-500 text-white border-transparent" },
  L: { word: "Loss", className: "bg-red-500 text-white border-transparent" },
};

export function FixtureList({ teamName }: FixtureListProps) {
  const team = canonicalizeTeamName(teamName);
  const { state, retry } = useFixtures(team);
  const loaded = state !== "loading" && state.ok ? state : null;

  const renderFixture = ({ fixture, isHome, opponent, result, status }: DescribedFixture) => {
    const played = status === "played";
    const isNext = status === "next";

    return (
      <div 
        key={fixture.matchId} 
        className={`flex items-center justify-between p-4 border-b last:border-0 ${played ? 'opacity-70 bg-muted/30' : ''} ${isNext ? 'bg-primary/5 ring-1 ring-primary/20 rounded-md my-1' : ''}`}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            {format(new Date(fixture.date), "PPP 'at' p")}
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {isHome ? "Home" : "Away"}
            </span>
            <span className="text-lg">vs {opponent}</span>
            {isNext && <Badge variant="default" className="ml-2">Next Match</Badge>}
            {status === "upcoming" && <Badge variant="secondary" className="ml-2">Upcoming</Badge>}
          </div>
        </div>

        {result && (
          <div className="text-right">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-3">
                <Badge className={`${RESULT_DISPLAY[result].className} w-7 h-7 flex items-center justify-center rounded-full p-0 text-sm font-bold shadow-sm`}>
                  {result}
                </Badge>
                <span className="text-2xl font-bold tabular-nums">
                  {fixture.score?.home} – {fixture.score?.away}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  ({result}) {RESULT_DISPLAY[result].word}
                </span>
              </div>
              <Badge variant="outline" className="mt-1">Final Result</Badge>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-primary/5">
        <div>
          <CardTitle>{loaded ? `${loaded.season} Season Schedule` : "Season Schedule"}</CardTitle>
          <p className="text-sm text-muted-foreground">Full fixtures and results for {teamName}</p>
        </div>
        {loaded && (
          <Badge variant="outline">
            Updated {format(new Date(loaded.lastUpdated), "MMM d, yyyy")}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {state === "loading" && (
          <div className="flex flex-col gap-3 p-4" aria-busy="true">
            <span className="sr-only">Loading fixtures…</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        )}

        {state !== "loading" && !state.ok && (
          <div className="p-4">
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Fixtures unavailable</AlertTitle>
              <AlertDescription>
                <p>{state.message}</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={retry}>
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {loaded && (
          <ScrollArea className="h-[500px]">
            <div className="flex flex-col">
              {describeFixtures(loaded.fixtures, team, new Date()).map(renderFixture)}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
