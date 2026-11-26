# Naming standard

All names are in English. Domain terms use the code name from [glossary.md](../glossary.md).

| Thing                      | Convention                            | Example                                            |
| -------------------------- | ------------------------------------- | -------------------------------------------------- |
| Files and folders          | `kebab-case`                          | `team-entry.service.ts`, `audit-log/`              |
| Nest files                 | `<name>.<kind>.ts`                    | `teams.controller.ts`, `create-team.dto.ts`        |
| React components           | `PascalCase.tsx`                      | `StandingsTable.tsx`                               |
| React hooks                | `useCamelCase.ts`                     | `useCurrentUser.ts`                                |
| Classes, types, interfaces | `PascalCase`, no `I` prefix           | `TeamEntry`, `CreateTeamDto`                       |
| Variables and functions    | `camelCase`, verbs for functions      | `findActiveRoster()`                               |
| Booleans                   | `is`, `has`, `can` prefix             | `isApproved`, `canEditRoster`                      |
| Constants                  | `UPPER_SNAKE_CASE` for true constants | `MAX_ROSTER_SIZE`                                  |
| Error codes                | `UPPER_SNAKE_CASE`, subject first     | `ROSTER_DEADLINE_PASSED`                           |
| MongoDB collections        | plural `camelCase`                    | `teamEntries`, `auditLogs`                         |
| REST routes                | plural `kebab-case` nouns             | `/api/tournaments/:tournamentId/team-entries`      |
| i18n keys                  | dotted `camelCase` by area            | `standings.title`, `errors.ROSTER_DEADLINE_PASSED` |
| Test files                 | same name plus `.spec.ts`             | `team-entry.service.spec.ts`                       |
| Branches                   | `type/short-description`              | `feat/team-entries`, `fix/standings-tiebreak`      |
| Commits                    | Conventional Commits                  | `feat(api): add team entries`                      |

Avoid abbreviations except well-known ones (`id`, `dto`, `url`). Stats use baseball abbreviations only in
display, not in code: `atBats`, not `ab`.
