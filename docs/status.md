# Status

Updated: 2026-11-26. Phase: **generic base** (milestones H0–H7). After the base, the baseball domain starts.

The orchestrator (`/iterate`) updates this file when an iteration closes.

## Done

- **H0 — Monorepo skeleton** (2026-11-26): npm workspaces, strict TypeScript, ESLint (no `any`, undeclared
  dependencies, generic/domain boundary), Prettier, husky + lint-staged + commitlint, VS Code settings,
  local MongoDB replica set.

## In progress

- **H1 — AI tooling and project memory**
  - [x] `CLAUDE.md`, `docs/` (architecture, status, glossary, standards, AI workflow guide)
  - [x] ADRs 0001–0005
  - [x] `.claude/`: agents, skills, rules, settings, hooks, `educational` output style
  - [x] `docs/domain/`: data model, rules and screens translated from the planning notes
  - [ ] Done when: a trial `/iterate` run goes planner → developer → tester without odd interventions

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
