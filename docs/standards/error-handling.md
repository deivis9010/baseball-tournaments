# Error handling standard

Applies from H2.

## Shape

Every error response has the same body:

```json
{ "code": "ROSTER_DEADLINE_PASSED", "message": "optional, for developers", "details": {} }
```

- `code` is stable and `UPPER_SNAKE_CASE`. The web translates it; users never see `message`.
- `details` carries data the UI needs, such as the invalid fields of a validation error.
- Codes are listed in `packages/contracts` (from H4); a test checks that each one has a translation in `es` and `en`.

## In the API

- Services throw `AppError` (in `common/errors`) with a code and an HTTP status. They never throw Nest
  `HttpException` directly, so business logic does not depend on HTTP.
- A global exception filter turns `AppError`, validation errors and unknown errors into the shape above.
- Unknown errors return `500` with code `INTERNAL_ERROR` and are logged with a request id; the stack trace
  never reaches the client.
- Do not catch an error only to rethrow it unchanged. Catch only to add context or recover.

## Validation results versus errors

Game capture distinguishes two levels:

- **Warnings** (unusual but possible data) are returned as part of a successful response and only inform.
- **Errors** (impossible data, broken rules) block the operation and use the error shape.

## Logging

Log with the structured logger (pino). Never log passwords, tokens, cookies or CURPs.
