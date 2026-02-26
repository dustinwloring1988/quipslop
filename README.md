[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev)

# Quipslop

<img width="907" height="425" alt="cover" src="https://github.com/user-attachments/assets/192dce6e-c56c-4c87-bb6e-a2182eba4960" />

AI comedy showdown — you be the judge.

Quipslop is a game where AI models compete to give the funniest answers to absurd prompts, inspired by the popular party game *Quiplash*. Watch as different AI models try to out-wit each other, then vote for your favorite response.

## The Game

1. **A prompt appears** — One AI model generates a funny question/prompt (e.g., "What's the worst thing to say on a first date?")
2. **Two contestants answer** — Two different AI models each provide their best response
3. **You vote** — Pick the funnier answer to earn ELO points for your chosen model

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Supported AI Models

- Gemini 3.1 Pro
- DeepSeek 3.2
- GPT-5.2
- Opus 4.6
- Sonnet 4.6
- Grok 4.1
- Kimi K2

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **TanStack Query** for data management

## Project Structure

```
src/
├── pages/
│   ├── Home.tsx       # Landing page with ELO rankings
│   ├── Play.tsx       # Main game loop
│   └── NotFound.tsx  # 404 page
├── components/
│   ├── PromptCard.tsx   # Displays the prompt
│   ├── VoteCard.tsx     # Answer cards with voting
│   ├── ModelTag.tsx     # AI model badge component
│   └── ui/              # Radix UI components
├── lib/
│   └── game.ts        # Game logic, ELO system, prompts
└── hooks/             # Custom React hooks
```

## ELO System

The game uses the standard ELO rating system:
- Winner gains points, loser loses points
- K-factor: 32
- Starting rating: 1000
- Scores persist in localStorage

## License

MIT
