Gaining familiarity with IaaC and Cloud tools with assistance from Claude.

# First Kick ⚽

**Discover soccer your way — zero configuration, zero cost, instant fan.**

![Build](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Stack](https://img.shields.io/badge/stack-Next.js-black) ![AI-Assisted](https://img.shields.io/badge/built%20with-AI--assisted%20SDLC-purple)

First Kick is a beginner-friendly soccer discovery app designed to help new fans understand and enjoy the sport without feeling overwhelmed. Through a short onboarding quiz based on personality traits and video game preferences, users receive an AI-generated recommendation for a soccer team, player, and league tailored specifically to them.

---

## 1. Getting Started

### Check out the project here: 

- https://main.d3ftcq147q0j04.amplifyapp.com

### Or Install and Run the project locally: 
- Node.js v18 or higher
- npm or yarn
- Git


```bash
git clone https://github.com/JoshDavidson0/first-kick.git
cd first-kick 
npm install
npm run dev
```

Visit: `http://localhost:3000`

---

## 2. How it Works

1. **Onboarding Quiz:** Share your personality traits and gaming preferences.
2. **Team Match:** Our rule-based engine (`lib/matcher.ts`) pairs you with one of 20 Premier League clubs based on their identity tags and playing style.
3. **Player Recommendation:** Get introduced to a key player on your new team who matches your dominant personality trait.
4. **Season Schedule:** View every match in the 2025/26 season for your matched team, with past results and upcoming fixtures.
5. **Learning Journey:** Unlock bite-sized modules on rules, positions, formations, and more as you explore the sport.

---

## 3. Architecture Summary

First Kick is a monolithic Next.js application designed for maximum portability and ease of use.

- **Frontend:** React with Tailwind CSS and Radix UI components.
- **Matching Engine:** A synchronous, pure TypeScript matcher that maps quiz answers to team identity tags.
- **Data Strategy:** A hybrid approach for fixtures. The app loads an internal static dataset (`lib/fixtureData.ts`) for instant rendering and silently attempts to fetch live updates from a Next.js Route Handler (`app/api/fixtures/route.ts`).
- **Persistence:** All user state (recommendations, learning progress) is stored in `localStorage`.

> 📄 For full architecture details, see [`docs/architecture-v2.md`](docs/architecture-v2.md)

---

## 4. AI-Assisted SDLC

The project's foundation was built using a deliberate **AI-assisted software development lifecycle (SDLC)**. This project serves as a case study in matching specific AI tools to the engineering phases where they perform best.

| Tool | Role in Project | SDLC Phase |
|---|---|---|
| ChatGPT (GPT-4o) | Planning, documentation, feasibility analysis, SRS, risk register | Planning |
| v0 by Vercel | UI scaffolding, component generation, responsive layout prototyping | Design |
| Claude Code | Full-stack implementation, refactoring, core logic generation | Development |
| GitHub Copilot | Debugging assistance, test generation, inline code completion | Testing |

### AI Engineering Analysis

Building First Kick demonstrated several key insights into modern AI-assisted engineering:

- **Context is King:** Tools like Claude Code perform exponentially better when provided with structured context (like our `claude.md`) that defines architectural boundaries and naming conventions.
- **Verification is Non-Negotiable:** AI tools can hallucinate API signatures or quantitatively overconfident claims. The role of the developer has shifted from "writer" to "editor and orchestrator," where verification of every AI output is the most critical step.
- **Design Compression:** v0 and similar tools dramatically compress the time from concept to high-fidelity UI, allowing developers to focus more on integration and business logic.

---

## License

MIT — see `LICENSE` for details.
