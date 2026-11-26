# 0005 — Languages of conversation, code and UI

- Status: accepted
- Date: 2026-11-26

## Context

The developer and the league speak Spanish. Code, libraries and most technical material are in English,
and the generic part will become a starter for future projects. The app may later serve English speakers.

## Decision

- **Conversation and explanations** with the developer, including agent replies: Spanish.
- **Everything in the repository** — code, comments, names (files, folders, variables, collections,
  routes), commits, branches, docs, agents, skills and rules: English.
- **The UI** is bilingual (Spanish by default, English), with every visible text in
  `apps/web/src/i18n/es.ts` and `en.ts`, never inside components. The browser language is detected and
  each user can choose. A test checks that both files have the same keys.
- **The API** returns error codes (`ROSTER_DEADLINE_PASSED`), not sentences; the web translates them.
- **Data** is not translated: team names and the rulebook stay as written.
- Domain terms are mapped once in [docs/glossary.md](../glossary.md).

## Alternatives considered

- **Code in Spanish:** mixes languages with every library and makes the starter harder to reuse.
- **Spanish-only UI:** simpler now, costly to add a language later.

## Consequences

- Each domain term needs an agreed English name before it is used in code.
- Every new visible text needs two translations.
