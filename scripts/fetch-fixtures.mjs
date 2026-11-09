// Fetches the current Premier League season from football-data.org and writes
// it as published fixture JSON. Run weekly by .github/workflows/fetch-fixtures.yml.
// Usage: node scripts/fetch-fixtures.mjs [outputPath]

import { writeFile } from "node:fs/promises";

const API_URL = "https://api.football-data.org/v4/competitions/PL/matches";
const EXPECTED_MATCH_COUNT = 380;

function fail(message) {
  console.error(`[fetch-fixtures] ERROR: ${message}`);
  process.exit(1);
}

function seasonLabel(season) {
  const start = new Date(season?.startDate).getUTCFullYear();
  const end = new Date(season?.endDate).getUTCFullYear();
  if (Number.isNaN(start) || Number.isNaN(end)) fail("Could not derive season from match data.");
  return `${start}/${String(end).slice(-2)}`;
}

const outputPath = process.argv[2] || "./fixtures.json";
const apiKey = process.env.FOOTBALL_DATA_API_KEY;

if (!apiKey) {
  fail("FOOTBALL_DATA_API_KEY is not set. Nothing was written.");
}

let response;
try {
  response = await fetch(API_URL, { headers: { "X-Auth-Token": apiKey } });
} catch (error) {
  fail(`Request to football-data.org failed: ${error.message}`);
}

if (!response.ok) {
  fail(`football-data.org responded ${response.status} ${response.statusText}`);
}

const data = await response.json();
const matches = data?.matches;

if (!Array.isArray(matches) || matches.length === 0) {
  fail("Response has no matches.");
}

const invalid = matches.find((m) => !m?.id || !m.utcDate || !m.homeTeam || !m.awayTeam);
if (invalid) {
  fail(`Match is missing id, utcDate, homeTeam or awayTeam (id: ${invalid?.id ?? "unknown"}).`);
}

if (matches.length !== EXPECTED_MATCH_COUNT) {
  console.warn(`[fetch-fixtures] WARNING: expected ${EXPECTED_MATCH_COUNT} matches, got ${matches.length}.`);
}

const fixtures = matches.map((match) => ({
  matchId: String(match.id),
  homeTeam: match.homeTeam.shortName || match.homeTeam.name,
  awayTeam: match.awayTeam.shortName || match.awayTeam.name,
  date: match.utcDate,
  score: match.score?.fullTime?.home !== null && match.score?.fullTime?.home !== undefined
    ? { home: match.score.fullTime.home, away: match.score.fullTime.away }
    : null,
  competition: "Premier League",
}));

const published = {
  schemaVersion: 1,
  lastUpdated: new Date().toISOString(),
  season: seasonLabel(matches[0].season),
  source: "football-data.org",
  fixtures,
};

await writeFile(outputPath, JSON.stringify(published, null, 2) + "\n");

const scored = fixtures.filter((f) => f.score !== null).length;
console.log(`[fetch-fixtures] Season ${published.season}: ${fixtures.length} matches, ${scored} with scores. Wrote ${outputPath}`);
