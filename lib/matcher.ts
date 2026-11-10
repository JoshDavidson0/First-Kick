import { QuizData, RecommendationResponse } from "@/types";
import { TEAMS } from "@/lib/teams";

// Map quiz answers to identity tags
const TRAIT_TO_TAGS: Record<string, string[]> = {
  "competitive": ["ambitious", "determined", "glamour"],
  "laid-back": ["balanced", "coastal", "smart"],
  "creative": ["attacking", "flair", "technical", "modern"],
  "analytical": ["smart", "technical", "balanced"],
  "passionate": ["passionate", "historic", "loud", "working-class"],
  "determined": ["tough", "determined", "physical", "working-class"],
  "energetic": ["attacking", "dynamic", "young"],
  "focused": ["smart", "balanced", "technical"],
  "confident": ["glamour", "global", "ambitious"]
};

const GAME_TO_TAGS: Record<string, string[]> = {
  "EA FC": ["glamour", "global", "attacking", "modern"],
  "Football Manager": ["smart", "technical", "analytical", "rising"],
  "Action Games": ["attacking", "dynamic", "energetic"],
  "Strategy Games": ["smart", "technical", "balanced"],
  "RPG Games": ["historic", "passionate", "global"],
  "Shooter Games": ["dynamic", "energetic", "physical"],
  "Simulation Games": ["smart", "technical", "balanced"]
};

export function getMatch(quizData: QuizData): RecommendationResponse {
  const preferredTags = new Set<string>();
  
  quizData.personalityTraits.forEach(trait => {
    (TRAIT_TO_TAGS[trait] || []).forEach(tag => preferredTags.add(tag));
  });
  
  quizData.favoriteGames.forEach(game => {
    (GAME_TO_TAGS[game] || []).forEach(tag => preferredTags.add(tag));
  });

  // Score each team
  const scoredTeams = TEAMS.map(team => {
    let score = 0;
    team.tags.forEach(tag => {
      if (preferredTags.has(tag)) {
        score++;
      }
    });
    return { team, score };
  });

  // Sort by score (desc), then by total tag count (desc) to break ties
  scoredTeams.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.team.tags.length - a.team.tags.length;
  });

  const matchedTeam = scoredTeams[0].team;

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
