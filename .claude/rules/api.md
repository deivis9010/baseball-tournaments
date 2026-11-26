---
paths:
  - 'apps/api/**'
---

# API rules (NestJS)

- Layers: controller → service → repository → schema. Controllers only handle HTTP, guards and DTOs;
  services hold business rules and throw `AppError` with a code; repositories only query Mongo.
- Generic code in `src/core/` and `src/common/` never imports from `src/modules/`.
- Every input is a DTO with `class-validator` decorators; the global `ValidationPipe` rejects unknown fields.
- Every output is a response DTO. Never return a Mongoose document or internal fields (`passwordHash`,
  encrypted CURP, `__v`).
- Every endpoint is protected by default: session guard, `@Roles`, and organization membership. Public
  endpoints are marked explicitly and reviewed. A resource of another organization answers `404`.
- Errors use the shape `{ code, message?, details? }` (`docs/standards/error-handling.md`).
- Configuration comes from the validated config module, never from `process.env` directly.
- Use the structured logger; never log passwords, tokens, cookies or CURPs.
- Rules that must never break (unique CURP per tournament, one team per player and tournament) are backed
  by unique indexes in the schema.
- Multi-document writes use a transaction.
- Follow `docs/standards/api-design.md` for routes, status codes and pagination.
