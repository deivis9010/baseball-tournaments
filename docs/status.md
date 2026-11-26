# Status

Updated: 2026-11-26. Phase: **generic base** (milestones H0–H7). After the base, the baseball domain starts.

The orchestrator (`/iterate`) updates this file when an iteration closes.

## Done

- **H0 — Monorepo skeleton** (2026-11-26): npm workspaces, strict TypeScript, ESLint (no `any`, undeclared
  dependencies, generic/domain boundary), Prettier, husky + lint-staged + commitlint, VS Code settings,
  local MongoDB replica set.
- **H1 — AI tooling and project memory** (2026-11-26): `CLAUDE.md`, `docs/` (architecture, status,
  glossary, standards, AI workflow guide, domain), ADRs 0001–0005, `.claude/` (agents, skills, rules,
  settings, hooks, `educational` output style), root `npm run check` script. Validated by a trial
  `/iterate` run (planner → developer → tester) that added `npm run check`.

## In progress

- Nothing. Next up: H2.

## Next

| Milestone | Content                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| H2        | API base (NestJS): validated config, coded errors, security, health, layered `example` module, tests with thresholds |
| H3        | Web base: React + Bootstrap, i18n es/en, public and admin layouts, PWA                                               |
| H4        | Shared contracts used by api and web                                                                                 |
| H5        | CI and security: CodeQL, dependency audit, gitleaks, Dependabot, protected `main`                                    |
| H6        | Auth, users, organizations and audit log                                                                             |
| H7        | Demo deployed on Render, Cloudflare Pages and Atlas                                                                  |

## Open questions with the league

- Tie-break criteria in standings.
- Minimum inning for a rain-shortened game to count.
