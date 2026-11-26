# Security standard (OWASP Top 10)

Based on the OWASP Top 10:2025. The `owasp-review` skill walks this checklist; the `tester` agent
applies it to every change that touches the API or the session. Check the current OWASP edition when
updating this file.

| #   | Category                               | What it means here                                                                                                                                                                  |
| --- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 | Broken Access Control                  | Every endpoint checks session, role and organization membership. A resource from another organization answers `404`. Managers only act on their team (`scope`). Deny by default.    |
| A02 | Security Misconfiguration              | `helmet` headers, CORS from an allow-list, OpenAPI only in development, environment validated at startup, no default credentials.                                                   |
| A03 | Software Supply Chain Failures         | Exact versions, lock file, `npm ci`, `npm audit` and Dependabot in CI, few and well-known dependencies.                                                                             |
| A04 | Cryptographic Failures                 | Passwords with argon2id. CURP encrypted with AES-GCM and looked up by HMAC fingerprint. Keys only in environment variables. HTTPS in every deployment.                              |
| A05 | Injection                              | DTO validation with whitelist; Mongo query sanitization (no `$` operators from user input); no string-built queries; React escapes output, no `dangerouslySetInnerHTML`.            |
| A06 | Insecure Design                        | Rules enforced by unique indexes and in the service, not only in the UI. Approval flow: scorers capture, board approves.                                                            |
| A07 | Authentication Failures                | Short access tokens, rotated refresh tokens stored hashed, `httpOnly` + `Secure` + `SameSite=Lax` cookies, rate limit and temporary lockout on login, generic login error messages. |
| A08 | Software or Data Integrity Failures    | CI is the only path to `main`; game data changes keep versions (`GameReport`) and an audit log entry.                                                                               |
| A09 | Security Logging and Alerting Failures | Audit log for who changed what; structured logs with request id; never log secrets, tokens or CURPs.                                                                                |
| A10 | Mishandling of Exceptional Conditions  | Global exception filter; unknown errors return a generic `500`; operations fail closed (an error never grants access).                                                              |

## Always

- No secrets, real personal data or real CURPs in the repository, tests, logs or screenshots. The repository is public.
- Personal data is collected only after the privacy notice is accepted, and used only for identification.
- Report and fix high or critical findings before merging.
