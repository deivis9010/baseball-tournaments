---
paths:
  - 'packages/contracts/**'
---

# Contracts rules

- This package holds only types, enums, constants and pure helpers shared by the API and the web.
  No Nest, React, Mongoose or runtime dependencies.
- `src/core/` is generic (roles, error codes, auth and organization shapes) and never imports
  `src/baseball/`. `src/baseball/` may import `src/core/`.
- Every API request and response shape the web uses is defined here, so a change breaks the typecheck
  of whoever does not adapt.
- Error codes are `UPPER_SNAKE_CASE` string constants grouped by area; each needs a translation in the
  web's `es` and `en` files.
- Changing or removing an exported type is a breaking change: update both apps in the same change.
- Export everything public through the package entry points; consumers never import internal paths.
