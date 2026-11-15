// The quiz vocabulary: the answers a user can give and the identity tags each
// answer stands for. Club tags (lib/teams.ts) are typed as Tag, so a club tag
// that no answer produces is a compile error.
// No imports, so scripts/check-quiz.mjs can load this file directly with Node.

/** Users pick 1 to MAX_SELECTIONS traits, then 1 to MAX_SELECTIONS games. */
export const MAX_SELECTIONS = 3;

export const TRAITS = [
  { id: "competitive", label: "Competitive", emoji: "🏆" },
  { id: "creative", label: "Creative", emoji: "🎨" },
  { id: "laid-back", label: "Laid-back", emoji: "😎" },
  { id: "analytical", label: "Analytical", emoji: "🧠" },
  { id: "passionate", label: "Passionate", emoji: "🔥" },
  { id: "determined", label: "Determined", emoji: "💪" },
  { id: "energetic", label: "Energetic", emoji: "⚡" },
  { id: "focused", label: "Focused", emoji: "🎯" },
  { id: "confident", label: "Confident", emoji: "✨" },
] as const;

export const GAMES = [
  { id: "EA FC", label: "EA FC / FIFA", emoji: "⚽" },
  { id: "Football Manager", label: "Football Manager", emoji: "📊" },
  { id: "Action Games", label: "Action Games", emoji: "🕹️" },
  { id: "Strategy Games", label: "Strategy Games", emoji: "🧩" },
  { id: "RPG Games", label: "RPG Games", emoji: "⚔️" },
  { id: "Shooter Games", label: "Shooter Games", emoji: "🔫" },
  { id: "Simulation Games", label: "Simulation Games", emoji: "✈️" },
] as const;

export type Trait = (typeof TRAITS)[number]["id"];
export type Game = (typeof GAMES)[number]["id"];

// Map quiz answers to identity tags
export const TRAIT_TO_TAGS = {
  "competitive": ["ambitious", "determined", "glamour"],
  "laid-back": ["balanced", "coastal", "smart"],
  "creative": ["attacking", "flair", "technical", "modern", "innovative"],
  "analytical": ["smart", "technical", "balanced"],
  "passionate": ["passionate", "historic", "loud", "working-class", "loyal"],
  "determined": ["tough", "determined", "physical", "working-class", "underdog"],
  "energetic": ["attacking", "dynamic", "young"],
  "focused": ["smart", "balanced", "technical"],
  "confident": ["glamour", "global", "ambitious"]
} as const satisfies Record<Trait, readonly string[]>;

export const GAME_TO_TAGS = {
  "EA FC": ["glamour", "global", "attacking", "modern"],
  "Football Manager": ["smart", "technical", "analytical", "rising"],
  "Action Games": ["attacking", "dynamic"],
  "Strategy Games": ["smart", "technical", "balanced"],
  "RPG Games": ["historic", "passionate", "global"],
  "Shooter Games": ["dynamic", "physical"],
  "Simulation Games": ["smart", "technical", "balanced"]
} as const satisfies Record<Game, readonly string[]>;

/** Every tag some answer produces; the only tags a club may have. */
export type Tag = (typeof TRAIT_TO_TAGS)[Trait][number] | (typeof GAME_TO_TAGS)[Game][number];
