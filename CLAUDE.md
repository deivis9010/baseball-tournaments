# Baseball Tournaments

Web app to manage amateur baseball tournaments (rosters, schedules, games, standings, stats),
starting with the aluminum-bat tournament of a local league in Mérida, Yucatán.
Monorepo: `apps/api` (NestJS), `apps/web` (React + Vite + Bootstrap), `packages/*` (shared code).
Current state and next steps: [docs/status.md](docs/status.md).

## Commands

```bash
npm ci                      # install (never `npm install` in CI)
docker compose up -d        # local MongoDB replica set on localhost:27017
npm run lint                # ESLint, zero warnings allowed
npm run typecheck           # tsc in every workspace
npm run check               # lint + typecheck + format:check
npm test                    # tests in every workspace
npm run format              # Prettier
```

## Critical rules

1. **Language.** Talk to the user in Spanish. Code, comments, names, commits, docs, agents and skills in English. User-visible UI text lives only in the i18n files (es/en).
2. **No `any`.** Strict TypeScript; `no-explicit-any` and `no-unsafe-*` are errors. Narrow `unknown` instead.
3. **Generic/domain boundary.** Generic code (`core/`, `common/`, `contracts/src/core`) never imports baseball code (`modules/`, `features/`, `packages/rules`, `contracts/src/baseball`). ESLint enforces it. See [ADR 0004](docs/decisions/0004-generic-domain-boundary.md).
4. **API layers.** controller → service → repository → schema, with validated DTOs. Each layer only does its own job ([docs/architecture.md](docs/architecture.md)).
5. **Errors are codes.** The API returns `{ code, message?, details? }`; the web translates `code`.
6. **Secrets.** Never read, write or commit `.env` files or keys. Only `.env.example` goes in the repo. The repo is public: no real personal data (CURP, names, phones) anywhere.
7. **Definition of done** before saying a task is finished: [docs/standards/definition-of-done.md](docs/standards/definition-of-done.md).
8. **Commits** only when the user asks, Conventional Commits, never on `main` directly.

## Map of docs

| Need                                                       | Read                                                     |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| How the code is organized                                  | [docs/architecture.md](docs/architecture.md)             |
| What is done and what is next                              | [docs/status.md](docs/status.md)                         |
| Domain terms and their code names                          | [docs/glossary.md](docs/glossary.md)                     |
| Baseball rules, data model, screens                        | [docs/domain/](docs/domain/)                             |
| Why something was decided                                  | [docs/decisions/](docs/decisions/)                       |
| Coding, naming, API, errors, tests, security, a11y, review | [docs/standards/](docs/standards/)                       |
| How to work with the agents and skills                     | [docs/guides/ai-workflow.md](docs/guides/ai-workflow.md) |
