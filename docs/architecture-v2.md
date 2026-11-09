# First Kick V2 — Architecture

First Kick V2 is a streamlined, zero-configuration version of the original app. It moves all logic into the client and reads sports data from a weekly pre-fetched JSON file.

## 1. Overview
The application is built as a single-page application (SPA) using **Next.js**. It removes all external backend dependencies (AWS Lambda, DynamoDB, Bedrock) to ensure the app is portable, zero-cost, and instant to run locally.

## 2. Data Flow
1. **Quiz Submission:** The `QuizForm` component collects user input.
2. **Matching Engine:** The inputs are passed to `lib/matcher.ts`, which performs a deterministic, rule-based match against 20 Premier League clubs.
3. **Recommendation:** The result is stored in `localStorage` and displayed via `RecommendationCard`.
4. **Fixture Loading:**
    - The `FixtureList` component shows a loading state and calls `/api/fixtures?team=…`.
    - The route handler reads the published `fixtures.json` from the `data` branch and filters it to the team.
    - On success, the card shows the season's fixtures and when the data was last updated. On any failure, it shows an error message with a **Try again** button. No fixtures are shown in the error case.
5. **Learning Progress:** As users complete modules in the `ProgressJourney`, their status is updated in `localStorage`.

## 3. Fixture Data Pipeline
- **Weekly Action:** `.github/workflows/fetch-fixtures.yml` runs every Tuesday at 06:17 UTC (and on manual dispatch). It runs `scripts/fetch-fixtures.mjs`, which makes one request to `football-data.org` (`/v4/competitions/PL/matches`, current season) using the `FOOTBALL_DATA_API_KEY` GitHub Actions secret. If the request or validation fails, the job fails and nothing is published.
- **`data` branch:** An orphan branch containing only `fixtures.json` (`schemaVersion`, `lastUpdated`, `season`, `source`, `fixtures`). The app reads it from `raw.githubusercontent.com`.
- **Route handler:** `app/api/fixtures/route.ts` fetches the published file (cached for 1 hour), validates it with `evaluatePublishedFixtures` (`lib/publishedFixtures.ts`), canonicalizes team names and filters to the requested team.
- **Staleness rule:** Data whose `lastUpdated` is more than 8 days old is not shown. This is how a failed weekly fetch becomes visible to users.
- **Errors:** Every response is a `FixturesResult`. Failures carry a code and a user-facing message:

| Code | HTTP | Meaning |
|---|---|---|
| `missing_team` | 400 | No `team` query parameter |
| `fetch_failed` | 502 | The published file couldn't be fetched |
| `invalid_data` | 502 | The file wasn't valid JSON or the expected shape |
| `stale_data` | 503 | `lastUpdated` is more than 8 days old |
| `team_not_found` | 404 | No fixtures for the team this season |
| `network_error` | — | Client-side only: the request to `/api/fixtures` failed |

- **No API key in the app:** The app never reads an API key. The key exists only as a GitHub Actions secret used by the fetch script.

### Why this design
- Users don't need their own API keys.
- The key never leaves GitHub Secrets.
- API usage is fixed at one request per week, regardless of user count.
- `main` stays free of bot commits; data lives on its own branch.
- Showing errors instead of falling back to bundled data is deliberate, so users never see outdated scores presented as current.

## 4. LocalStorage Schema
The app uses the following keys in `localStorage`:
- `firstkick_session_id`: A unique UUID for the user.
- `firstkick_recommendation`: A JSON object containing the matched `favoriteTeam`, `favoritePlayer`, `favoriteLeague`, and `reason`.
- `firstkick_progress`: A JSON object tracking `completedModules` and the `currentModule`.

## 5. V1 vs V2
V1 was built as a demonstration of a distributed AWS-hosted system with AI inference (Amazon Bedrock). While powerful, it required significant infrastructure overhead and cost. V2 refactors this into a "local-first" architecture, prioritizing speed, simplicity, and zero-cost operation while maintaining the same user experience. The V2 AWS Amplify deployment has since been retired as well; First Kick now runs locally only.
