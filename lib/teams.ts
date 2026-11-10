// The team registry: every club the app knows, with its canonical name, the
// other spellings it appears under, and its quiz identity. Club names are
// canonicalized here and nowhere else.
// No imports, so scripts/check-teams.mjs can load this file directly with Node.

export type TeamIdentity = {
  name: string; // Canonical: the only spelling the app and fixtures use
  aliases: string[]; // Other spellings, e.g. football-data.org short names
  league: string;
  tags: string[];
  players: {
    name: string;
    description: string;
    traitMatch: string; // The personality trait this player best matches
  }[];
  reasonTemplate: string;
};

export const TEAMS: TeamIdentity[] = [
  {
    name: "Arsenal",
    aliases: [],
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
    aliases: ["Man City"],
    league: "Premier League",
    tags: ["technical", "glamour", "global", "attacking"],
    players: [
      {
        name: "Erling Haaland",
        description: "The ultimate goal-scoring machine who dominates the pitch with power and precision.",
        traitMatch: "competitive"
      },
      {
        name: "Rayan Cherki",
        description: "A master passer who can unlock any defense with a single touch.",
        traitMatch: "analytical"
      }
    ],
    reasonTemplate: "Your {trait} nature and love for {game} align perfectly with Manchester City's pursuit of perfection and dominant, world-class style."
  },
  {
    name: "Liverpool",
    aliases: [],
    league: "Premier League",
    tags: ["historic", "working-class", "attacking", "passionate"],
    players: [
      {
        name: "Aleksandar Isak",
        description: "A versatile forward who combines skill, speed, and a relentless drive to score.",
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
    aliases: [],
    league: "Premier League",
    tags: ["glamour", "global", "ambitious", "young"],
    players: [
      {
        name: "Cole Palmer",
        description: "A cool-headed and incredibly talented playmaker who has quickly become the team's star.",
        traitMatch: "laid-back"
      },
      {
        name: "Moises Caicedo",
        description: "A world-class midfielder who dictates the tempo of the game.",
        traitMatch: "analytical"
      }
    ],
    reasonTemplate: "Chelsea's ambitious and glamorous approach to the game perfectly suits someone like you who is {trait} and enjoys {game}."
  },
  {
    name: "Manchester United",
    aliases: ["Man United", "Man Utd"],
    league: "Premier League",
    tags: ["historic", "global", "glamour", "ambitious"],
    players: [
      {
        name: "Bruno Fernandes",
        description: "A passionate captain who creates countless chances and leads by example.",
        traitMatch: "energetic"
      },
      {
        name: "Matheus Cunha",
        description: "A pacy forward known for his explosive skill and commitment to the club.",
        traitMatch: "determined"
      }
    ],
    reasonTemplate: "As a {trait} individual who likes {game}, you'll find a home with Manchester United—a club with a massive global legacy and a drive for greatness."
  },
  {
    name: "Tottenham Hotspur",
    aliases: ["Spurs", "Tottenham"],
    league: "Premier League",
    tags: ["attacking", "ambitious", "modern", "technical"],
    players: [
      {
        name: "Sandro Tonali",
        description: "A technically gifted midfielder who orchestrates play with elegance and precision.",
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
    aliases: [],
    league: "Premier League",
    tags: ["historic", "ambitious", "determined", "rising"],
    players: [
      {
        name: "Nicolas Jackson",
        description: "A hardworking and prolific striker who never stops running for the team.",
        traitMatch: "determined"
      },
      {
        name: "John McGinn",
        description: "A tenacious midfielder who plays with his heart on his sleeve.",
        traitMatch: "passionate"
      }
    ],
    reasonTemplate: "With your {trait} attitude and love for {game}, Aston Villa's historic roots and exciting climb to the top make them an ideal choice."
  },
  {
    name: "Newcastle United",
    aliases: ["Newcastle"],
    league: "Premier League",
    tags: ["working-class", "passionate", "ambitious", "physical"],
    players: [
      {
        name: "Lewis Hall",
        description: "A young and energetic full-back who brings pace and determination to the team.",
        traitMatch: "focused"
      },
      {
        name: "Yoanne Wissa",
        description: "A powerful forward who combines skill and strength to lead the attack.",
        traitMatch: "passionate"
      }
    ],
    reasonTemplate: "Newcastle's passionate community and ambitious growth perfectly reflect your {trait} nature and interest in {game}."
  },
  {
    name: "Leeds United",
    aliases: ["Leeds"],
    league: "Premier League",
    tags: ["historic", "passionate", "loud", "tough"],
    players: [
      {
        name: "Ethan Ampadu",
        description: "A versatile, tireless captain who reads the game and drives the team forward.",
        traitMatch: "determined"
      },
      {
        name: "Joe Rodon",
        description: "A commanding centre-back who stays calm and composed under pressure.",
        traitMatch: "focused"
      }
    ],
    reasonTemplate: "Your {trait} spirit and love for {game} fit right in at Leeds United, where a historic club and one of the loudest crowds in England demand total commitment."
  },
  {
    name: "Brighton & Hove Albion",
    aliases: ["Brighton", "Brighton Hove", "Brighton Hove Albion"],
    league: "Premier League",
    tags: ["technical", "smart", "innovative", "underdog"],
    players: [
      {
        name: "Kaoru Mitoma",
        description: "A dribbling wizard who studied the art of the 1-v-1 at university.",
        traitMatch: "analytical"
      },
      {
        name: "Diego Gomez",
        description: "A young and highly skilled midfielder who excels in tight spaces and quick transitions.",
        traitMatch: "creative"
      }
    ],
    reasonTemplate: "If you're {trait} and enjoy {game}, you'll appreciate Brighton's smart, innovative, and highly technical approach to the beautiful game."
  },
  {
    name: "Everton",
    aliases: [],
    league: "Premier League",
    tags: ["historic", "tough", "loyal", "working-class"],
    players: [
      {
        name: "Jordan Pickford",
        description: "England's number one goalkeeper, known for his vocal leadership and heroic saves.",
        traitMatch: "vocal"
      },
      {
        name: "James Garner",
        description: "A determined midfielder who never shies away from a challenge and always gives 100%.",
        traitMatch: "physical"
      }
    ],
    reasonTemplate: "Everton's rich history and legendary grit match your {trait} personality and interest in {game}."
  },
  {
    name: "Brentford",
    aliases: [],
    league: "Premier League",
    tags: ["smart", "analytical", "underdog", "determined"],
    players: [
      {
        name: "Igor Tiago",
        description: "A clever and hardworking midfielder who thrives on tactical discipline and teamwork.",
        traitMatch: "determined"
      },
      {
        name: "Jaidon Anthony",
        description: "A versatile winger who combines speed, skill, and intelligence to create opportunities.",
        traitMatch: "analytical"
      }
    ],
    reasonTemplate: "Brentford's data-driven and clever 'underdog' success story is a great fit for a {trait} {game} fan like you."
  },
  {
    name: "Crystal Palace",
    aliases: [],
    league: "Premier League",
    tags: ["flair", "passionate", "dynamic", "south-london"],
    players: [
      {
        name: "Adam Wharton",
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
    aliases: [],
    league: "Premier League",
    tags: ["historic", "technical", "balanced", "london"],
    players: [
      {
        name: "Alex Iwobi",
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
    name: "Sunderland",
    aliases: [],
    league: "Premier League",
    tags: ["passionate", "working-class", "historic", "loud"],
    players: [
      {
        name: "Granit Xhaka",
        description: "A vastly experienced leader who sets the tempo and demands the highest standards.",
        traitMatch: "confident"
      },
      {
        name: "Enzo Le Fée",
        description: "A creative midfielder who links play with neat touches and clever passing.",
        traitMatch: "creative"
      }
    ],
    reasonTemplate: "If you're {trait} and enjoy {game}, Sunderland's fiercely loyal fanbase and the roar of the Stadium of Light will feel like home."
  },
  {
    name: "Nottingham Forest",
    aliases: ["Nottingham", "Nottm Forest"],
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
    aliases: ["AFC Bournemouth"],
    league: "Premier League",
    tags: ["attacking", "rising", "smart", "coastal"],
    players: [
      {
        name: "Junior Kroupi",
        description: "A young and energetic winger who brings pace and creativity to the attack.",
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
    name: "Coventry City",
    aliases: ["Coventry"],
    league: "Premier League",
    tags: ["rising", "ambitious", "attacking", "young"],
    players: [
      {
        name: "Haji Wright",
        description: "A powerful forward who thrives on big moments and leads the attack.",
        traitMatch: "competitive"
      },
      {
        name: "Jack Rudoni",
        description: "An energetic attacking midfielder who arrives in the box and creates chances.",
        traitMatch: "energetic"
      }
    ],
    reasonTemplate: "Because you're {trait} and enjoy {game}, Coventry City's ambitious, attacking rise back to the top flight makes them a club to grow with."
  },
  {
    name: "Ipswich Town",
    aliases: ["Ipswich"],
    league: "Premier League",
    tags: ["historic", "rising", "passionate", "determined"],
    players: [
      {
        name: "Jordy de Wijs",
        description: "A commanding centre-back who leads the defense with authority and composure.",
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
    name: "Hull City",
    aliases: ["Hull"],
    league: "Premier League",
    tags: ["rising", "determined", "working-class", "dynamic"],
    players: [
      {
        name: "Regan Slater",
        description: "A hard-running midfielder who never stops pressing and fighting for the ball.",
        traitMatch: "determined"
      },
      {
        name: "Kyle Joseph",
        description: "A lively forward who stretches defences with pace and movement.",
        traitMatch: "energetic"
      }
    ],
    reasonTemplate: "Your {trait} nature and passion for {game} suit Hull City, a determined, hard-working side ready to prove themselves in the Premier League."
  }
];

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const CANONICAL_BY_SPELLING = new Map<string, string>(
  TEAMS.flatMap((team) => [team.name, ...team.aliases].map((spelling): [string, string] => [normalize(spelling), team.name]))
);

/** Returns the canonical name for any known spelling of a club, or null if the club is unknown. */
export function resolveTeamName(name: string): string | null {
  return CANONICAL_BY_SPELLING.get(normalize(name)) ?? null;
}
