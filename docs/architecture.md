# Architecture

## Overview

```
baseball-tournaments/
├── apps/
│   ├── api/          NestJS REST API (from H2)
│   └── web/          React + Vite + Bootstrap, responsive PWA (from H3)
├── packages/
│   ├── contracts/    types shared by api and web: roles, error codes, request/response shapes
│   └── rules/        pure baseball rules and stats, no Nest or React (with the domain)
├── docs/             project memory: architecture, status, glossary, decisions, standards
└── .claude/          agents, skills, rules, hooks and output style for Claude Code
```

Workspaces are managed with npm ([ADR 0003](decisions/0003-npm-workspaces-monorepo.md)).
Packages are imported by name, for example `@baseball-tournaments/contracts`.

## Generic and domain code

The repository is built so that its generic part can later be extracted into a reusable starter
([ADR 0004](decisions/0004-generic-domain-boundary.md)).

| Layer    | Generic                                                                             | Baseball                                               |
| -------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |
| API      | `apps/api/src/core/` (auth, users, organizations, audit-log, health), `src/common/` | `apps/api/src/modules/` (leagues, tournaments, teams…) |
| Web      | `apps/web/src/core/` (HTTP client, session, layouts, i18n base, shared UI)          | `apps/web/src/features/`                               |
| Packages | `packages/contracts/src/core`                                                       | `packages/rules`, `packages/contracts/src/baseball`    |

Generic code never imports domain code; ESLint fails otherwise. Domain code may import generic code.
The generic "organization" is the league: memberships are `{ organizationId, role, scope? }`, where
`scope` is generic (`{ type: 'team', id }`) and the domain gives it meaning.

## API layers

| Layer      | File                  | Does                                                          | Does not                           |
| ---------- | --------------------- | ------------------------------------------------------------- | ---------------------------------- |
| Controller | `*.controller.ts`     | Receives HTTP, validates DTOs, applies permissions, delegates | Business logic, data access        |
| Service    | `*.service.ts`        | Business rules, transactions, audit log entries               | Know about HTTP or Mongoose models |
| Repository | `*.repository.ts`     | Queries and indexes                                           | Business rules                     |
| Schema     | `schemas/*.schema.ts` | Document shape and indexes                                    | Logic                              |
| DTO        | `dto/*.dto.ts`        | Input validation and output shape                             | —                                  |

## Request flow

```
client ──HTTP──▶ main.ts (helmet, CORS allow-list, rate limit, ValidationPipe, /api prefix)
          ──▶ guards (session, role, organization membership)
          ──▶ controller ──▶ service ──▶ repository ──▶ MongoDB
          ◀── response DTO, or AppError ──▶ global exception filter ──▶ { code, message?, details? }
```

The web shows translated text for each `code`; the API never returns user-facing sentences.

## Data

- MongoDB (local replica set with Docker Compose, Atlas in the demo). The replica set enables transactions.
- Integrity rules are protected with unique indexes, not only with code.
- Standings, leaders and eligibility are computed from approved game data, not stored by hand.
- The CURP (Mexican personal ID) is encrypted in its own collection with an HMAC fingerprint for lookups and is never public.

## Session

Short-lived JWT access token plus a rotated refresh token in an `httpOnly`, `Secure`, `SameSite=Lax`
cookie ([ADR 0002](decisions/0002-technology-stack.md)). Web and API share a domain or a `/api` proxy
so the cookie works across browsers.

## Deployment (demo)

Web on Cloudflare Pages, API on Render, database on MongoDB Atlas free tiers (H7).
