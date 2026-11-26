# Baseball Tournaments

Web app to manage amateur baseball tournaments: rosters, schedules, games, standings and stats.
It starts with the aluminum-bat tournament of a local league in Mérida, Yucatán.

> Work in progress. See [docs/status.md](docs/status.md) for the current state and [CLAUDE.md](CLAUDE.md) for the rules agents follow.

## Requirements

- Node.js 24 (see `.nvmrc`) and npm 11+
- Docker (for the local MongoDB)

## Getting started

```bash
npm ci
docker compose up -d   # local MongoDB replica set on localhost:27017
npm run lint
npm run typecheck
```

## Scripts

| Script                 | What it does                     |
| ---------------------- | -------------------------------- |
| `npm run lint`         | ESLint over the whole repository |
| `npm run lint:fix`     | ESLint with automatic fixes      |
| `npm run format`       | Prettier write                   |
| `npm run format:check` | Prettier check (used in CI)      |
| `npm run typecheck`    | Type check every workspace       |
| `npm test`             | Tests in every workspace         |
| `npm run build`        | Build every workspace            |

## Structure

```
apps/        api (NestJS) and web (React + Vite) — coming next
packages/    shared code: contracts (types shared by api and web)
```

Generic code lives in `core/` and `common/` folders and never imports baseball code
(`modules/`, `features/`). ESLint enforces this boundary.

## Conventions

- Code, comments, names, commits and docs in English. The UI is bilingual (es/en).
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/).
