// Checks the quiz against the team registry: every club must win for at least
// one valid set of answers, every club has exactly 4 tags, and every player's
// traitMatch is a quiz trait. Prints each club's share of all answer sets
// (ties split evenly, as the random tie-break does on average).
// Run by .github/workflows/ci.yml.
// Usage: node scripts/check-quiz.mjs

import { GAME_TO_TAGS, GAMES, MAX_SELECTIONS, TRAIT_TO_TAGS, TRAITS } from "../lib/quiz.ts";
import { TEAMS } from "../lib/teams.ts";
import { topTeams } from "../lib/matcher.ts";

// Order doesn't affect scoring, so each set of 1..MAX_SELECTIONS answers is counted once.
function selections(ids) {
  const out = [];
  for (let mask = 1; mask < 1 << ids.length; mask++) {
    const picked = ids.filter((_, i) => (mask >> i) & 1);
    if (picked.length <= MAX_SELECTIONS) out.push(picked);
  }
  return out;
}

const traitSets = selections(TRAITS.map((t) => t.id));
const gameSets = selections(GAMES.map((g) => g.id));

const share = new Map(TEAMS.map((team) => [team.name, 0]));
for (const traits of traitSets) {
  for (const games of gameSets) {
    const tied = topTeams(traits, games);
    for (const team of tied) share.set(team.name, share.get(team.name) + 1 / tied.length);
  }
}

const problems = [];
const traitIds = new Set(TRAITS.map((t) => t.id));
for (const team of TEAMS) {
  if (share.get(team.name) === 0) problems.push(`"${team.name}" can't be recommended by any set of answers.`);
  if (team.tags.length !== 4) problems.push(`"${team.name}" has ${team.tags.length} tags; every club needs exactly 4.`);
  for (const player of team.players) {
    if (!traitIds.has(player.traitMatch)) problems.push(`${player.name} (${team.name}) has traitMatch "${player.traitMatch}", which isn't a quiz trait.`);
  }
}

const total = traitSets.length * gameSets.length;
console.log(`[check-quiz] Share of ${total} answer sets:`);
for (const [name, wins] of [...share].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${((100 * wins) / total).toFixed(1).padStart(5)}%  ${name}`);
}

const teamTags = new Set(TEAMS.flatMap((team) => team.tags));
const unused = [...new Set([...Object.values(TRAIT_TO_TAGS), ...Object.values(GAME_TO_TAGS)].flat())].filter((tag) => !teamTags.has(tag));
if (unused.length > 0) console.warn(`[check-quiz] WARNING: answers produce tags no club has: ${unused.join(", ")}`);

if (problems.length > 0) {
  for (const problem of problems) console.error(`[check-quiz] ERROR: ${problem}`);
  process.exit(1);
}
console.log(`[check-quiz] All ${TEAMS.length} clubs can be recommended.`);
