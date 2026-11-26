---
paths:
  - 'apps/web/**'
---

# Web rules (React + Vite + Bootstrap)

- Generic code in `src/core/` never imports from `src/features/`.
- Every visible text comes from the i18n files (`src/i18n/es.ts` and `en.ts`); add each key to both.
  No literal UI strings in components.
- API errors arrive as codes; show them with the translation `errors.<CODE>`, never the raw `message`.
- Use react-bootstrap components before custom ones. Mobile first: design for a phone, then widen.
- Components are function components with typed props. Pages (route containers) fetch data through
  `services/`; presentational components receive props and do not call the API.
- All HTTP calls go through the core HTTP client (session refresh, error mapping). No direct `fetch` in components.
- Never use `dangerouslySetInnerHTML`. Never store tokens in `localStorage`; the session lives in an `httpOnly` cookie.
- Follow `docs/standards/accessibility.md`: labels on inputs, roles in tests, 44 px touch targets.
