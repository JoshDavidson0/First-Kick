import { QuizData, RecommendationResponse } from "@/types";

type TeamIdentity = {
  name: string;
  league: string;
  tags: string[];
  players: {
    name: string;
    description: string;
    traitMatch: string; // The personality trait this player best matches
  }[];
  reasonTemplate: string;
};

const TEAMS: TeamIdentity[] = [
  {
    name: "Arsenal",
    league: "Premier League",
    tags: ["technical", "attacking", "young", "historic", "global"],
    players: [
      {
        name: "Martin Ødegaard",
        description: "The creative heartbeat of the team, known for his incredible vision and leadership.",
        traitMatch: "analytical"
      },
      {
        name: "Bukayo Saka",
        description: "A dynamic and homegrown winger who plays with immense joy and flair.",
        traitMatch: "energetic"
      }
    ],
    reasonTemplate: "Because you're {trait} and enjoy {game}, Arsenal's blend of technical excellence and youthful energy makes them your perfect match."
  },
  {
    name: "Manchester City",
    league: "Premier League",
    tags: ["technical", "glamour", "global", "attacking"],
    players: [
      {
        name: "Erling Haaland",
        description: "The ultimate goal-scoring machine who dominates the pitch with power and precision.",
        traitMatch: "competitive"
      },
      {
        name: "Kevin De Bruyne",
        description: "A master passer who can unlock any defense with a single touch.",
        traitMatch: "analytical"
      }
    ],
    reasonTemplate: "Your {trait} nature and love for {game} align perfectly with Manchester City's pursuit of perfection and dominant, world-class style."
  },
  {
    name: "Liverpool",
    league: "Premier League",
    tags: ["historic", "working-class", "attacking", "passionate"],
    players: [
      {
        name: "Mohamed Salah",
        description: "A legendary forward whose speed and clinical finishing have made him a global icon.",
        traitMatch: "focused"
      },
      {
        name: "Virgil van Dijk",
        description: "The calm and commanding leader at the heart of the defense.",
        traitMatch: "confident"
      }
    ],
    reasonTemplate: "Matching your {trait} spirit and interest in {game}, Liverpool offers a deep history of passion and high-intensity attacking football."
  },
  {
    name: "Chelsea",
    league: "Premier League",
    tags: ["glamour", "global", "ambitious", "young"],
    players: [
      {
        name: "Cole Palmer",
        description: "A cool-headed and incredibly talented playmaker who has quickly become the team's star.",
        traitMatch: "laid-back"
      },
      {
        name: "Enzo Fernández",
        description: "A world-class midfielder who dictates the tempo of the game.",
        traitMatch: "analytical"
      }
    ],
    reasonTemplate: "Chelsea's ambitious and glamorous approach to the game perfectly suits someone like you who is {trait} and enjoys {game}."
  },
  {
    name: "Manchester United",
    league: "Premier League",
    tags: ["historic", "global", "glamour", "ambitious"],
    players: [
      {
        name: "Bruno Fernandes",
        description: "A passionate captain who creates countless chances and leads by example.",
        traitMatch: "energetic"
      },
      {
        name: "Marcus Rashford",
        description: "A pacy forward known for his explosive skill and commitment to the club.",
        traitMatch: "determined"
      }
    ],
    reasonTemplate: "As a {trait} individual who likes {game}, you'll find a home with Manchester United—a club with a massive global legacy and a drive for greatness."
  },
  {
    name: "Tottenham Hotspur",
    league: "Premier League",
    tags: ["attacking", "ambitious", "modern", "technical"],
    players: [
      {
        name: "Heung-min Son",
        description: "One of the most clinical finishers and beloved figures in world football.",
        traitMatch: "positive"
      },
      {
        name: "James Maddison",
        description: "A creative midfielder who brings flair and imagination to every match.",
        traitMatch: "creative"
      }
    ],
    reasonTemplate: "Your {trait} personality and interest in {game} match Tottenham's commitment to entertaining, risk-taking, and stylish football."
  },
  {
    name: "Aston Villa",
    league: "Premier League",
    tags: ["historic", "ambitious", "determined", "rising"],
    players: [
      {
        name: "Ollie Watkins",
        description: "A hardworking and prolific striker who never stops running for the team.",
        traitMatch: "determined"
      },
      {
        name: "Emiliano Martínez",
        description: "A world-class goalkeeper known for his incredible reflexes and big personality.",
        traitMatch: "confident"
      }
    ],
    reasonTemplate: "With your {trait} attitude and love for {game}, Aston Villa's historic roots and exciting climb to the top make them an ideal choice."
  },
  {
    name: "Newcastle United",
    league: "Premier League",
    tags: ["working-class", "passionate", "ambitious", "physical"],
    players: [
      {
        name: "Alexander Isak",
        description: "A tall, elegant, and lightning-fast striker who makes scoring look easy.",
        traitMatch: "focused"
      },
      {
        name: "Bruno Guimarães",
        description: "A tenacious midfielder who plays with his heart on his sleeve.",
        traitMatch: "passionate"
      }
    ],
    reasonTemplate: "Newcastle's passionate community and ambitious growth perfectly reflect your {trait} nature and interest in {game}."
  },
  {
    name: "West Ham United",
    league: "Premier League",
    tags: ["working-class", "historic", "tough", "loyal"],
    players: [
      {
        name: "Jarrod Bowen",
        description: "A tireless winger known for his work rate and knack for scoring crucial goals.",
        traitMatch: "hardworking"
      },
      {
        name: "Mohammed Kudus",
        description: "An incredibly skillful and powerful player who can beat anyone in a 1-v-1.",
        traitMatch: "creative"
      }
    ],
    reasonTemplate: "Your {trait} character and {game} preference align with West Ham's 'Iron' spirit and their history of resilience and hard work."
  },
  {
    name: "Brighton & Hove Albion",
    league: "Premier League",
    tags: ["technical", "smart", "innovative", "underdog"],
    players: [
      {
        name: "Kaoru Mitoma",
        description: "A dribbling wizard who studied the art of the 1-v-1 at university.",
        traitMatch: "analytical"
      },
      {
        name: "Joao Pedro",
        description: "A versatile and skillful young forward who leads the line with flair.",
        traitMatch: "creative"
      }
    ],
    reasonTemplate: "If you're {trait} and enjoy {game}, you'll appreciate Brighton's smart, innovative, and highly technical approach to the beautiful game."
  },
  {
    name: "Everton",
    league: "Premier League",
    tags: ["historic", "tough", "loyal", "working-class"],
    players: [
      {
        name: "Jordan Pickford",
        description: "England's number one goalkeeper, known for his vocal leadership and heroic saves.",
        traitMatch: "vocal"
      },
      {
        name: "Dominic Calvert-Lewin",
        description: "A powerful striker who excels in the air and leads the line with strength.",
        traitMatch: "physical"
      }
    ],
    reasonTemplate: "Everton's rich history and legendary grit match your {trait} personality and interest in {game}."
  },
  {
    name: "Brentford",
    league: "Premier League",
    tags: ["smart", "analytical", "underdog", "determined"],
    players: [
      {
        name: "Bryan Mbeumo",
        description: "A fast and clinical attacker who is a constant threat on the counter.",
        traitMatch: "determined"
      },
      {
        name: "Christian Nørgaard",
        description: "The intelligent captain who provides balance and stability to the team.",
        traitMatch: "analytical"
      }
    ],
    reasonTemplate: "Brentford's data-driven and clever 'underdog' success story is a great fit for a {trait} {game} fan like you."
  },
  {
    name: "Crystal Palace",
    league: "Premier League",
    tags: ["flair", "passionate", "dynamic", "south-london"],
    players: [
      {
        name: "Eberechi Eze",
        description: "One of the most graceful and skillful playmakers in the league.",
        traitMatch: "creative"
      },
      {
        name: "Jean-Philippe Mateta",
        description: "A charismatic striker who has become a fan favorite for his goals and energy.",
        traitMatch: "energetic"
      }
    ],
    reasonTemplate: "With your {trait} vibe and love for {game}, Crystal Palace's flair and incredible home atmosphere make them a standout choice."
  },
  {
    name: "Fulham",
    league: "Premier League",
    tags: ["historic", "technical", "balanced", "london"],
    players: [
      {
        name: "Andreas Pereira",
        description: "A creative midfielder who is a specialist in set-pieces and delivery.",
        traitMatch: "focused"
      },
      {
        name: "Antonee Robinson",
        description: "One of the fastest full-backs in the league, known for his non-stop running.",
        traitMatch: "energetic"
      }
    ],
    reasonTemplate: "Fulham's balanced and technical style, combined with their historic stadium, suits your {trait} and {game}-loving lifestyle."
  },
  {
    name: "Wolverhampton Wanderers",
    league: "Premier League",
    tags: ["physical", "tough", "determined", "technical"],
    players: [
      {
        name: "Matheus Cunha",
        description: "A skillful Brazilian forward who can create something out of nothing.",
        traitMatch: "creative"
      },
      {
        name: "Hwang Hee-chan",
        description: "A clinical and hardworking attacker known for his intelligent movement.",
        traitMatch: "hardworking"
      }
    ],
    reasonTemplate: "Your {trait} nature and {game} interests fit Wolves' blend of toughness and technical Brazilian-influenced flair."
  },
  {
    name: "Nottingham Forest",
    league: "Premier League",
    tags: ["historic", "passionate", "underdog", "loud"],
    players: [
      {
        name: "Morgan Gibbs-White",
        description: "The team's creative engine who plays with immense heart and skill.",
        traitMatch: "passionate"
      },
      {
        name: "Murillo",
        description: "A strong and exceptionally talented defender with a bright future.",
        traitMatch: "confident"
      }
    ],
    reasonTemplate: "As someone {trait} who likes {game}, Forest's incredible history and passionate fanbase offer an experience like no other."
  },
  {
    name: "Bournemouth",
    league: "Premier League",
    tags: ["attacking", "rising", "smart", "coastal"],
    players: [
      {
        name: "Antoine Semenyo",
        description: "A powerful and explosive winger who is always looking to drive forward.",
        traitMatch: "energetic"
      },
      {
        name: "Justin Kluivert",
        description: "A pacy and skillful attacker who comes from a legendary football family.",
        traitMatch: "creative"
      }
    ],
    reasonTemplate: "Bournemouth's exciting, modern, and attacking rise is a perfect match for your {trait} and {game}-focused personality."
  },
  {
    name: "Leicester City",
    league: "Premier League",
    tags: ["historic", "determined", "ambitious", "underdog"],
    players: [
      {
        name: "Jamie Vardy",
        description: "The legendary striker known for his incredible speed and never-say-die attitude.",
        traitMatch: "determined"
      },
      {
        name: "Harry Winks",
        description: "A composed midfielder who keeps the team ticking with his precise passing.",
        traitMatch: "analytical"
      }
    ],
    reasonTemplate: "Your {trait} spirit and {game} hobby match Leicester's famous 'nothing is impossible' attitude and historic achievements."
  },
  {
    name: "Ipswich Town",
    league: "Premier League",
    tags: ["historic", "rising", "passionate", "determined"],
    players: [
      {
        name: "Omari Hutchinson",
        description: "A young and exciting talent with incredible dribbling ability.",
        traitMatch: "creative"
      },
      {
        name: "Leif Davis",
        description: "A modern full-back who provides a massive amount of assists from the wing.",
        traitMatch: "focused"
      }
    ],
    reasonTemplate: "Matching your {trait} energy and interest in {game}, Ipswich's historic return to the top flight is an inspiring journey to follow."
  },
  {
    name: "Southampton",
    league: "Premier League",
    tags: ["technical", "young", "historic", "rising"],
    players: [
      {
        name: "Adam Armstrong",
        description: "A hardworking striker who is always in the right place at the right time.",
        traitMatch: "hardworking"
      },
      {
        name: "Flynn Downes",
        description: "A tenacious midfielder who is key to the team's possession-based style.",
        traitMatch: "analytical"
      }
    ],
    reasonTemplate: "If you're {trait} and enjoy {game}, you'll appreciate Southampton's commitment to playing technical, attractive football with young talent."
  }
];

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
