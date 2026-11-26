# 0004 — Boundary between generic and domain code

- Status: accepted
- Date: 2026-11-26

## Context

After this project is built, its generic part (auth, users, organizations, audit log, CI, agents) will be
extracted into a reusable starter, `nest-react-mongo-starter`. If generic code depends on baseball code,
that extraction becomes a refactor instead of a copy.

## Decision

- Generic code lives in `core/` and `common/` (API and web) and in `packages/contracts/src/core`.
- Baseball code lives in `apps/api/src/modules/`, `apps/web/src/features/`, `packages/rules` and
  `packages/contracts/src/baseball`.
- Generic code never imports domain code. Domain code may import generic code.
- ESLint (`@typescript-eslint/no-restricted-imports` in `eslint.config.mjs`) fails the lint when the rule
  is broken.
- The generic organization is the league. Memberships are `{ organizationId, role, scope? }`; `scope`
  is generic (`{ type: 'team', id }`) and the domain gives it meaning.

## Alternatives considered

- **Build the starter first:** its design would be guessed, not tested by a real project.
- **No enforced boundary, only a convention:** it erodes quickly, especially with AI-generated code.
- **`eslint-plugin-boundaries`:** more powerful, but path patterns are enough for now.

## Consequences

- Extracting the starter is mostly copying folders.
- Generic features sometimes need an extension point (like `scope`) instead of a direct domain reference.
