const TEAM_NAME_ALIASES: Record<string, string> = {
  arsenal: "Arsenal",
  "aston villa": "Aston Villa",
  bournemouth: "Bournemouth",
  brentford: "Brentford",
  brighton: "Brighton & Hove Albion",
  "brighton and hove albion": "Brighton & Hove Albion",
  "brighton hove albion": "Brighton & Hove Albion",
  "brighton & hove albion": "Brighton & Hove Albion",
  chelsea: "Chelsea",
  "crystal palace": "Crystal Palace",
  everton: "Everton",
  fulham: "Fulham",
  "ipswich town": "Ipswich Town",
  ipswich: "Ipswich Town",
  "leicester city": "Leicester City",
  leicester: "Leicester City",
  liverpool: "Liverpool",
  "man city": "Manchester City",
  "manchester city": "Manchester City",
  "man utd": "Manchester United",
  "man united": "Manchester United",
  "manchester united": "Manchester United",
  "newcastle united": "Newcastle United",
  newcastle: "Newcastle United",
  "nottingham forest": "Nottingham Forest",
  "nottm forest": "Nottingham Forest",
  southampton: "Southampton",
  spurs: "Tottenham Hotspur",
  tottenham: "Tottenham Hotspur",
  "tottenham hotspur": "Tottenham Hotspur",
  wolverhampton: "Wolverhampton Wanderers",
  "west ham": "West Ham United",
  "west ham united": "West Ham United",
  wolves: "Wolverhampton Wanderers",
  "wolverhampton wanderers": "Wolverhampton Wanderers"
};

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function canonicalizeTeamName(name: string): string {
  const normalized = normalize(name);
  return TEAM_NAME_ALIASES[normalized] ?? name.trim();
}
