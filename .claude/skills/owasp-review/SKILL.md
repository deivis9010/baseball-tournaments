---
name: owasp-review
description: Reviews a change against the project's OWASP Top 10:2025 checklist (access control, misconfiguration, supply chain, crypto, injection, design, authentication, integrity, logging, exceptions). Use for any change to the API, the session, permissions or personal data.
argument-hint: [files or area to review]
---

# /owasp-review

Area: $ARGUMENTS (if empty, review the current `git diff`).

Read `docs/standards/security-owasp.md`, then the changed files. For each category, answer **✅ cumple**,
**❌ falla** (with file:line and the fix) or **n/a** (with the reason in a few words).

## Checklist

**A01 Broken Access Control**

- Each new endpoint has the session guard, the role check and the organization membership check.
- A resource from another organization returns `404`, not `403` and not the data.
- Manager actions are limited to their `scope` (their team). The default is deny.

**A02 Security Misconfiguration**

- No new CORS origin, header relaxation, debug route or OpenAPI exposure outside development.
- New environment variables are validated at startup and listed in `.env.example` without real values.

**A03 Software Supply Chain Failures**

- New dependencies are justified, maintained, pinned to an exact version and in the lock file.
- `npm audit --audit-level=high` reports nothing new.

**A04 Cryptographic Failures**

- Passwords use argon2id; tokens are random and stored hashed; CURP is encrypted (AES-GCM) and looked up by HMAC.
- No keys, secrets or salts in code.

**A05 Injection**

- Every input goes through a DTO with whitelist validation.
- No user input reaches a Mongo query as an object that may contain `$` operators; no string-built queries.
- No `dangerouslySetInnerHTML` or unescaped HTML in the web.

**A06 Insecure Design**

- Business rules are enforced in the service and, where possible, by unique indexes, not only in the UI.
- Capture and approval stay separate (scorer captures, board approves).

**A07 Authentication Failures**

- Login is rate limited and locks temporarily; errors do not reveal whether the email exists.
- Cookies are `httpOnly`, `Secure`, `SameSite=Lax`; refresh tokens rotate and old ones are revoked.

**A08 Software or Data Integrity Failures**

- Changes to game data create a new version and an audit log entry; nothing is overwritten silently.

**A09 Security Logging and Alerting Failures**

- Sensitive actions write to the audit log (who, what, when, on what).
- No password, token, cookie or CURP appears in logs, errors or test snapshots.

**A10 Mishandling of Exceptional Conditions**

- Errors go through the global filter; unknown errors return a generic `500`.
- Failure paths deny access and leave data unchanged (fail closed).

## Report

In Spanish: a table with the ten categories and their result, then the list of ❌ with the fix, ordered
by severity (high first). End with a **Para aprender** section about the most relevant category.
