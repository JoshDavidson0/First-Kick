# First Kick V2 — Architecture

First Kick V2 is a streamlined, zero-configuration version of the original app. It moves all logic into the client and uses a hybrid data strategy for sports data.

## 1. Overview
The application is built as a single-page application (SPA) using **Next.js**. It removes all external backend dependencies (AWS Lambda, DynamoDB, Bedrock) to ensure the app is portable, free to host, and instant to set up.

## 2. Data Flow
1. **Quiz Submission:** The `QuizForm` component collects user input.
2. **Matching Engine:** The inputs are passed to `lib/matcher.ts`, which performs a deterministic, rule-based match against 20 Premier League clubs.
3. **Recommendation:** The result is stored in `localStorage` and displayed via `RecommendationCard`.
4. **Fixture Loading:** 
    - The `FixtureList` component immediately renders data from `lib/fixtureData.ts` (static fallback).
    - Simultaneously, it triggers a fetch to `/api/fixtures`, which attempts to get live data from `football-data.org`.
    - If live data is retrieved, the UI silently upgrades to show the latest scores.
5. **Learning Progress:** As users complete modules in the `ProgressJourney`, their status is updated in `localStorage`.

## 3. Fixture Hybrid Strategy
To avoid dependency on a live API for the app to function, we use a two-layer approach:
- **Layer 1 (Static):** A complete dataset of the 2025/26 Premier League season is bundled with the app.
- **Layer 2 (Live):** A Next.js Route Handler proxies requests to the `football-data.org` API. This handles rate limiting and API key management (if any) server-side, while providing the client with fresh data when available.

## 4. LocalStorage Schema
The app uses the following keys in `localStorage`:
- `firstkick_session_id`: A unique UUID for the user.
- `firstkick_recommendation`: A JSON object containing the matched `favoriteTeam`, `favoritePlayer`, `favoriteLeague`, and `reason`.
- `firstkick_progress`: A JSON object tracking `completedModules` and the `currentModule`.

## 5. V1 vs V2
V1 was built as a demonstration of a distributed AWS-hosted system with AI inference (Amazon Bedrock). While powerful, it required significant infrastructure overhead and cost. V2 refactors this into a "local-first" architecture, prioritizing speed, simplicity, and zero-cost operation while maintaining the same user experience.
