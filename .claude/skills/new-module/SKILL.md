---
name: new-module
description: Scaffolds a layered NestJS module (controller, service, repository, schema, DTOs, tests) and, when asked, its web feature folder, following the project's layers and naming. Use when adding a new resource such as teams or venues.
argument-hint: <resource name in English, plural> [generic|domain]
---

# /new-module

Arguments: $ARGUMENTS

## 1. Decide where it lives

- **Domain** (baseball: leagues, teams, games…): `apps/api/src/modules/<name>/` and `apps/web/src/features/<name>/`.
- **Generic** (users, organizations…): `apps/api/src/core/<name>/` and `apps/web/src/core/<name>/`.

If the argument does not say, infer it from `docs/glossary.md` and confirm with the user.
Check the code name in the glossary; if the term is missing, propose one and add it.

## 2. API files

Copy the structure of the reference module `apps/api/src/core/example/` (from H2). For a resource
`teams` with entity `Team`:

```
teams/
├── teams.module.ts
├── teams.controller.ts        # HTTP only: guards, DTO validation, delegate to the service
├── teams.service.ts           # business rules, throws AppError with codes
├── teams.repository.ts        # Mongoose queries only
├── schemas/team.schema.ts     # document shape and indexes
└── dto/
    ├── create-team.dto.ts
    ├── update-team.dto.ts
    └── team-response.dto.ts
```

Tests in `apps/api/test/`: `unit/teams/teams.service.spec.ts`,
`integration/teams/teams.repository.spec.ts`, `e2e/teams.e2e-spec.ts`, and a builder in `builders/`.
The e2e tests cover success, validation, `401`, `403` and another organization's resource.

Register the module in `app.module.ts`. Add the request/response types and error codes to
`packages/contracts` (in `src/core` or `src/baseball` according to the side).

## 3. Web files (only if asked)

`features/<name>/` (or `core/<name>/`) with `pages/`, `components/`, `services/<name>.service.ts` and
i18n keys in both `es.ts` and `en.ts`.

## 4. Verify

Run `npm run lint` and `npm run typecheck`, then delegate to `tester`. Report in Spanish with the file
tree and a **Para aprender** section.
