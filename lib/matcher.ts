// Relative .ts imports so scripts/check-quiz.mjs can load this file with Node.
import type { QuizData, RecommendationResponse } from "@/types";
import { TEAMS, type TeamIdentity } from "./teams.ts";
import { GAME_TO_TAGS, TRAIT_TO_TAGS, type Game, type Tag, type Trait } from "./quiz.ts";

/** The clubs tied for the highest tag overlap with the answers (never empty). */
export function topTeams(traits: readonly Trait[], games: readonly Game[]): TeamIdentity[] {
  const preferredTags = new Set<Tag>([
    ...traits.flatMap((trait) => TRAIT_TO_TAGS[trait]),
    ...games.flatMap((game) => GAME_TO_TAGS[game]),
  ]);

  const scores = TEAMS.map((team) => team.tags.filter((tag) => preferredTags.has(tag)).length);
  const best = Math.max(...scores);
  return TEAMS.filter((_, i) => scores[i] === best);
}

/** Recommends a club for the answers. Ties are broken at random by `random`. */
export function getMatch(quizData: QuizData, random: () => number = Math.random): RecommendationResponse {
  const tied = topTeams(quizData.personalityTraits, quizData.favoriteGames);
  const matchedTeam = tied[Math.floor(random() * tied.length)];

  // Select player
  const primaryTrait = quizData.personalityTraits[0] || "passionate";
  let matchedPlayer = matchedTeam.players.find(p => p.traitMatch === primaryTrait);
  if (!matchedPlayer) {
    matchedPlayer = matchedTeam.players[0];
  }

  // Generate reason
  const primaryGame = quizData.favoriteGames[0] || "video games";
  const reason = matchedTeam.reasonTemplate
    .replace("{trait}", primaryTrait)
    .replace("{game}", primaryGame);

  return {
    team: matchedTeam.name,
    player: matchedPlayer.name,
    league: matchedTeam.league,
    reason: reason
  };
}
