"use client";

import { useState, useEffect } from "react";
import { Fixture } from "@/types";
import { fetchFixtures } from "@/lib/fixtureApi";
import { getFixturesForTeam } from "@/lib/fixtureData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, MapPin } from "lucide-react";
import { format, isPast, isToday } from "date-fns";

interface FixtureListProps {
  teamName: string;
}

export function FixtureList({ teamName }: FixtureListProps) {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // 1. Initial render with static data
    const staticData = getFixturesForTeam(teamName);
    setFixtures(staticData);

    // 2. Silent upgrade to live data
    fetchFixtures(teamName).then((liveData) => {
      if (liveData && liveData.length > 0) {
        setFixtures(liveData);
        setIsLive(true);
      }
    });
  }, [teamName]);

  const renderFixture = (fixture: Fixture) => {
    const fixtureDate = new Date(fixture.date);
    const isHome = fixture.homeTeam === teamName;
    const opponent = isHome ? fixture.awayTeam : fixture.homeTeam;
    const played = fixture.score !== null;
    const isNext = !played && (isToday(fixtureDate) || !isPast(fixtureDate));

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
                {(() => {
                  const userScore = isHome ? fixture.score!.home : fixture.score!.away;
                  const opponentScore = isHome ? fixture.score!.away : fixture.score!.home;
                  let result = "D";
                  let resultClass = "bg-gray-400 hover:bg-gray-400";
                  
                  if (userScore > opponentScore) {
                    result = "W";
                    resultClass = "bg-green-500 hover:bg-green-500";
                  } else if (userScore < opponentScore) {
                    result = "L";
                    resultClass = "bg-red-500 hover:bg-red-500";
                  }
                  
                  return (
                    <Badge className={`${resultClass} text-white border-transparent w-7 h-7 flex items-center justify-center rounded-full p-0 text-sm font-bold shadow-sm`}>
                      {result}
                    </Badge>
                  );
                })()}
                <span className="text-2xl font-bold tabular-nums">
                  {fixture.score?.home} – {fixture.score?.away}
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
          <CardTitle>2025/26 Season Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">Full fixtures and results for {teamName}</p>
        </div>
        {isLive && (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
            Live Updates
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="flex flex-col">
            {fixtures.length > 0 ? (
              fixtures.map(renderFixture)
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No fixtures found for this team.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
