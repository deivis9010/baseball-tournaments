# Code review standard

Every change reaches `main` through a pull request (from H5). The reviewer — a person or the `tester`
agent — checks, in this order:

1. **Correctness.** Does it do what the task asked? Are edge cases handled (empty lists, missing data, deadlines)?
2. **Security.** The [OWASP checklist](security-owasp.md) for anything touching the API, the session or personal data.
3. **Boundaries and layers.** Generic code does not import domain code; each layer does only its job.
4. **Tests.** New behavior is tested; the tests would fail without the change; thresholds still pass.
5. **Contracts and i18n.** Shared shapes in `packages/contracts`; every visible text in `es` and `en`.
6. **Readability.** Names follow [naming.md](naming.md); no dead code; comments explain why.
7. **Docs.** `docs/status.md` updated; an ADR when a decision was made.

## Comments

- Mark each comment's weight: **blocking**, **suggestion** or **question**.
- Point to the line and say why, with an example of the fix when possible.
- Formatting is not discussed; Prettier decides.

## Size

Keep pull requests small: one task, ideally under 400 changed lines excluding lock files.
