// Checks published fixture JSON against the team registry (lib/teams.ts):
// every club name in the fixtures must resolve, and every quiz club must have
// fixtures. Promotion and relegation each summer break one or the other.
// Run weekly by .github/workflows/fetch-fixtures.yml after publishing.
// Usage: node scripts/check-teams.mjs <fixturesPath>

import { readFile } from "node:fs/promises";
import { TEAMS, resolveTeamName } from "../lib/teams.ts";

const fixturesPath = process.argv[2];
if (!fixturesPath) {
  console.error("[check-teams] ERROR: Usage: node scripts/check-teams.mjs <fixturesPath>");
  process.exit(1);
}

const { fixtures } = JSON.parse(await readFile(fixturesPath, "utf8"));
const publishedNames = new Set(fixtures.flatMap((f) => [f.homeTeam, f.awayTeam]));

const problems = [];
const resolvedNames = new Set();
for (const name of publishedNames) {
  const canonical = resolveTeamName(name);
  if (canonical) resolvedNames.add(canonical);
  else problems.push(`"${name}" is in the fixtures but matches no club in lib/teams.ts (add it as an alias).`);
}
for (const team of TEAMS) {
  if (!resolvedNames.has(team.name)) {
    problems.push(`"${team.name}" is a quiz club but has no fixtures (relegated, or its published spelling isn't an alias).`);
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`[check-teams] ERROR: ${problem}`);
  process.exit(1);
}
console.log(`[check-teams] All ${publishedNames.size} published clubs resolve and all ${TEAMS.length} quiz clubs have fixtures.`);
