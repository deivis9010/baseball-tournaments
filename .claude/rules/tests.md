---
paths:
  - '**/test/**'
  - '**/*.spec.ts'
  - '**/*.spec.tsx'
  - '**/*.test.ts'
  - '**/*.test.tsx'
  - '**/*.e2e-spec.ts'
---

# Test rules

- Follow `docs/standards/testing.md`. Thresholds: 70 / 70 / 69 / 60 (lines, statements, functions, branches).
- Name tests by behavior (`rejects a roster entry after the deadline`), one behavior per test,
  arrange / act / assert separated by blank lines.
- Build data with the builders in `test/builders`; override only the fields the test cares about.
- Data is invented. Never use real names, phones, emails or CURPs. Generate CURP-shaped fake values.
- Unit tests have no database or network. Integration tests use `mongodb-memory-server`. E2E tests use
  `supertest` and cover success, validation, `401`, `403` and another organization's resource.
- Tests are independent and clean their data. No `.only`; no skipped test without a `TODO` with the reason.
- In the web, query by role and label (`getByRole`, `getByLabelText`), not by CSS class or test id when avoidable.
- Every bug fix includes a test that fails without the fix.
