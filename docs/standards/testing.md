# Testing standard

## Tools and thresholds

| Workspace    | Runner                   | Thresholds (lines / statements / functions / branches) |
| ------------ | ------------------------ | ------------------------------------------------------ |
| `apps/api`   | Jest                     | 70 / 70 / 69 / 60                                      |
| `apps/web`   | Vitest + Testing Library | 70 / 70 / 69 / 60                                      |
| `packages/*` | Vitest                   | 70 / 70 / 69 / 60                                      |

CI fails below the thresholds (from H5). Thresholds may rise; they never drop without an ADR.

## API test types

| Folder             | What                                        | How                                           |
| ------------------ | ------------------------------------------- | --------------------------------------------- |
| `test/unit`        | Services and pure functions                 | Dependencies replaced with fakes; no database |
| `test/integration` | Repositories and services with the database | `mongodb-memory-server`                       |
| `test/e2e`         | HTTP endpoints, including guards and errors | `supertest` against the Nest app              |

Shared helpers: `test/builders` (test data builders with sensible defaults), `test/fixtures` (fixed data
sets), `test/helpers` (app and database setup).

## Rules

- One behavior per test. Name tests by behavior: `rejects a roster entry after the deadline`.
- Arrange, act, assert, separated by a blank line.
- Tests are independent: no order dependency, each cleans its data.
- Test the public behavior, not private details. Do not test the framework.
- Every bug fix comes with a test that fails without the fix.
- Every endpoint has e2e tests for: success, validation error, no session (`401`), wrong role (`403`) and
  another organization's resource.
- Test data is invented. Never use real names, phones or CURPs; use builders that generate fake ones.
- No `.only` or skipped tests in committed code without a `TODO` with the reason.
