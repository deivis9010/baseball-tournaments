# 0003 — Monorepo with npm workspaces

- Status: accepted
- Date: 2026-11-26

## Context

The API and the web share types (roles, error codes, request and response shapes) and, later, pure
baseball rules. Keeping them in one repository lets an agent see both sides of a change at once.

## Decision

One repository with npm workspaces: `apps/*` and `packages/*`. No Nx or Turborepo for now.

- Root scripts run in every workspace (`npm run test --workspaces --if-present`).
- Shared packages are imported by name (`@baseball-tournaments/contracts`).
- CI installs with `npm ci` from the lock file.
- Because npm hoists packages, an undeclared dependency would still resolve locally. The ESLint rule
  `import-x/no-extraneous-dependencies` makes every workspace declare what it imports.

## Alternatives considered

- **Separate repositories for api and web:** shared types would need publishing and versioning.
- **pnpm:** stricter about dependencies, but npm is already known and enough for two apps.
- **Nx or Turborepo:** build caching is not needed at this size.

## Consequences

- One install, one lint, one CI for the whole project.
- Render only redeploys on changes inside the app folder unless `packages/` is added to its build filters.
