# API design standard

Applies from H2.

## Routes

- Every route is under `/api`. Resources are plural nouns; actions that are not CRUD are sub-resources
  with a verb only when unavoidable: `POST /api/games/:gameId/reports/:reportId/approval`.
- Nest resources under their owner when the owner is always known:
  `/api/tournaments/:tournamentId/team-entries`.
- IDs in paths are validated (Mongo `ObjectId`) before reaching the service.

## Methods and status codes

| Method   | Use                       | Success                                               |
| -------- | ------------------------- | ----------------------------------------------------- |
| `GET`    | Read; never changes state | `200`                                                 |
| `POST`   | Create or run an action   | `201` with the created resource, or `200` for actions |
| `PATCH`  | Partial update            | `200` with the updated resource                       |
| `DELETE` | Remove or deactivate      | `204`                                                 |

Errors follow [error-handling.md](error-handling.md): `400` validation, `401` no session, `403` no permission,
`404` not found (also when the resource exists in another organization), `409` conflict with a rule, `429` rate limit.

## Payloads

- Input is a DTO validated with `class-validator`; the global `ValidationPipe` uses `whitelist` and
  `forbidNonWhitelisted`, so unknown fields are rejected.
- Output is a response DTO, never a raw Mongoose document. Internal fields (`passwordHash`, encrypted CURP,
  `__v`) are never returned.
- JSON in `camelCase`. Dates as ISO 8601 strings in UTC. Money is out of scope.
- Lists are paginated with `?page` and `?limit` (default 20, maximum 100) and return `{ items, total, page, limit }`.

## Contracts

Request and response shapes that the web uses live in `packages/contracts` (from H4), so a change breaks
the typecheck on both sides.

## Documentation

OpenAPI is generated from Nest decorators and served only in development.
