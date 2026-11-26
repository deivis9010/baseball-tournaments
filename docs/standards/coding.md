# Coding standard

## TypeScript

- `strict` is on for every workspace (`tsconfig.base.json`). Do not weaken it per file.
- No `any`, explicit or implicit. Receive unknown data as `unknown` and narrow it (type guards, DTO validation).
- No non-null assertions (`value!`) to silence the compiler; handle the `undefined` case.
- Use `import type` for type-only imports (ESLint enforces it).
- Prefer `readonly` properties and `as const` objects over mutable shared state.
- Model states with discriminated unions, not with several optional booleans.

## Structure

- One responsibility per file. Keep functions short; extract when a function needs a comment to explain its parts.
- Respect the layers in [architecture.md](../architecture.md) and the generic/domain boundary.
- Pure logic (rules, calculations) has no framework imports, so it can be tested without Nest or React.
- No dead code, commented-out code or `console.log` in committed code. Use the logger in the API.

## Comments

- Explain **why**, not what. The code says what.
- Public functions of shared packages get a short TSDoc comment.
- `TODO` comments include what is missing and, when possible, the milestone (`TODO(H6): ...`).

## Dependencies

- Every workspace declares what it imports (`import-x/no-extraneous-dependencies`).
- Pin exact versions (`.npmrc` has `save-exact=true`). Prefer well-maintained packages; ask before adding one.

## Formatting

Prettier decides formatting; do not argue with it in reviews. ESLint decides correctness.
