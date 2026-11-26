# Domain

The baseball side of the project, translated from the planning notes. It is the source the `planner`
reads before planning domain features. Terms and code names: [glossary](../glossary.md).

Markers: **[D]** decided with the league or the product owner · **[P]** proposed, may change when built.
When a proposal is confirmed or changed during an iteration, update the marker here.

| Document                       | Content                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| [data-model.md](data-model.md) | Collections, fields, indexes that protect rules, what is computed, transactions             |
| [rules.md](rules.md)           | Rosters, eligibility, special games, ties, schedule generation, visible rules, CURP privacy |
| [screens.md](screens.md)       | Public portal and admin screens, key journeys, phone-first decisions                        |

## Context

- Amateur Sunday tournaments with very variable rosters: some players play one game, others all of them.
- Today everything is on paper: score sheets, no digital rosters or stats.
- Billing, fees, umpires' pay and equipment are **out of the app** [D].

## MVP scope

**In** [D]: tournaments and categories, seasons [P], teams and rosters, umpires (catalog and assignment,
no pay), venues, automatic schedule, games with manual capture and a photo of the score sheet, standings
and leaders (computed from published games), public portal, visible rules, rulebook, printable lineup
template, users and roles.

**Out:** AI reading of score sheets (planned, not built) [D], RAG [D], anything with money [D], live
scoring and play-by-play [P], accounts for players (they are visitors) [D].

## Roles

| Role         | Account | Who                      |
| ------------ | ------- | ------------------------ |
| `superAdmin` | Yes     | Platform owner           |
| `board`      | Yes     | League board             |
| `scorer`     | Yes     | Enters game data         |
| `manager`    | Yes     | Responsible for one team |
| `visitor`    | No      | Players and public       |

One account may hold several roles (for example manager and board). **[D]** The scorer captures; the
board approves and publishes.

## Permissions [P]

| Action                                                  | superAdmin | board       | scorer    | manager   | visitor |
| ------------------------------------------------------- | ---------- | ----------- | --------- | --------- | ------- |
| Create leagues and board members                        | Yes        | —           | —         | —         | —       |
| Create scorers and managers                             | Yes        | Own league  | —         | —         | —       |
| Tournaments, venues, umpires, schedule                  | Yes        | Own league  | —         | —         | —       |
| Create teams                                            | Yes        | Own league  | —         | —         | —       |
| Propose roster additions and removals [D: manager]      | Yes        | Yes         | —         | Own team  | —       |
| Complete a roster after a game, within the deadline [D] | Yes        | Yes         | Own games | Own team  | —       |
| Approve roster additions and removals [D]               | Yes        | Own league  | —         | —         | —       |
| Search a player by CURP in the league [D]               | Yes        | Own league  | —         | —         | —       |
| Roster and deadline exceptions [D]                      | Yes        | With reason | —         | —         | —       |
| Capture a game                                          | Yes        | Own league  | Assigned  | —         | —       |
| Approve and publish a game [D]                          | Yes        | Own league  | —         | —         | —       |
| Report a mistake in a game                              | Yes        | Yes         | Yes       | Own games | —       |
| Correct a published game                                | Yes        | With reason | —         | —         | —       |
| Edit the rulebook                                       | Yes        | Own league  | —         | —         | —       |
| See the portal                                          | Yes        | Yes         | Yes       | Yes       | Yes     |

## Game states [P]

`scheduled` → `submitted` → `inReview` → `published`. Also `postponed`, `suspended`, `cancelled`, and
forfeit as a result type. Every change records who, when and why.

## Ready for AI, without building it [P]

- Each capture records its source: `manual` today, `ai` later.
- Capture, validation and approval are separate steps: AI would only replace capture.
- The score sheet photo [D] is evidence today and test material later. Access [D]: board, scorer and the
  game's managers; never public.

## Open questions with the league

1. Tie-break criteria in standings.
2. Minimum inning for a rain-shortened game to count.
