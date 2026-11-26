# Definition of done

A task is done only when every item that applies is true. The `commit` skill and the `/iterate`
orchestrator check this list; the pull request template repeats it (from H5).

## Always

- [ ] The acceptance criteria of the task are met.
- [ ] `npm run lint` passes with zero warnings (no `any`, boundary respected).
- [ ] `npm run typecheck` passes.
- [ ] `npm test` passes and coverage is at or above the thresholds.
- [ ] `npm run format:check` passes.
- [ ] No secrets, `.env` files or real personal data in the change.

## When it applies

- [ ] New behavior has tests; a bug fix has a test that failed before the fix.
- [ ] Endpoints: e2e tests for success, validation, `401`, `403` and another organization.
- [ ] Changes to the API, session or personal data: OWASP checklist reviewed with the `owasp-review` skill.
- [ ] Shared shapes and error codes are in `packages/contracts`.
- [ ] Visible text exists in `es` and `en`; new error codes have translations.
- [ ] Accessibility checklist for new screens.
- [ ] `docs/status.md` updated; `docs/glossary.md` updated for new domain terms.
- [ ] An ADR for any significant decision.
- [ ] `CHANGELOG.md` updated under `Unreleased` for user-visible or structural changes.
