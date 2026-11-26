# Screens

Everything is **[P]** unless marked **[D]**. Designed for the phone first [D]: board members and scorers
use the app mostly at the field.

## Principles

1. **One app, two faces:** public portal and signed-in admin (`/admin`).
2. **The tournament is the context:** the portal opens on the active tournament; switching is always visible.
3. **Admin by pending work:** each role lands on a list of what it must do, not on a menu of tables.
4. **No sensitive data in the portal:** never CURP, contact data or full birth date.
5. **Readable routes:** `/<league-slug>/<tournament-slug>/standings` (route words in English; league and
   tournament names are data), easy to share on WhatsApp.

## Portal (visitors, no account) [D]

Phone navigation: bottom bar with **Home · Schedule · Standings · Leaders · More**. "More" leads to teams,
venues, rules and search.

| #   | Screen               | Content                                                                                        | MVP   |
| --- | -------------------- | ---------------------------------------------------------------------------------------------- | ----- |
| P1  | Tournament home      | Tournament selector, upcoming games, latest results, top 3 leaders, notices                    | Yes   |
| P2  | Schedule and results | Games by matchday; filters by team, venue and state                                            | Yes   |
| P3  | Game                 | Score, runs by inning, box score, venue, umpires, state ("roster under review", "forfeit 9-0") | Yes   |
| P4  | Standings            | By group: GP, W, L, PCT, GB; withdrawn teams marked as disqualified                            | Yes   |
| P5  | Leaders              | Batting and pitching with minimum plate appearances or innings; shows games with full capture  | Yes   |
| P6  | Teams                | List with logo and record                                                                      | Yes   |
| P7  | Team                 | Roster (name, number, position), games and stats                                               | Yes   |
| P8  | Player               | Tournament stats, public appearances ("3 of 5") [D], history by tournament                     | Yes   |
| P9  | Venues               | Name, address and map link                                                                     | Yes   |
| P10 | Tournament rules [D] | Current settings, change history and written rulebook [D]                                      | Yes   |
| P11 | Player search        | By name within the league                                                                      | Later |

Public player data: name, authorized photo, team, number, position, bats/throws and stats. The portal
never shows the score sheet photo; the board, the scorer and the game's managers can see it [D].

## Admin (signed in)

### Common

| #   | Screen                   | Content                     |
| --- | ------------------------ | --------------------------- |
| A1  | Sign in / reset password | Email and password [D]      |
| A2  | Pending work             | List by role and tournament |
| A3  | My account               | Name, password, roles       |

### Board

| #   | Screen                  | Content                                                                                                                |
| --- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| D1  | Pending work            | Games to review, additions to approve, possibly ineligible players, deadlines, reported mistakes                       |
| D2  | Seasons and tournaments | Create tournament, category, state                                                                                     |
| D3  | Tournament settings     | Minimum appearances, roster deadline, rain inning, forfeit, game and standings tie-breakers; each change with a reason |
| D4  | Teams and entries       | Register, assign manager, withdraw with disqualification                                                               |
| D5  | Rosters to approve      | Proposed and provisional players with deadline; approve or reject with a reason                                        |
| D6  | Player (admin)          | Profile, roster entries in the league, CURP search [D], merge duplicates, exceptions                                   |
| D7  | Schedule generator [D]  | Wizard: format, rounds, groups, dates and slots → draft → adjust → publish                                             |
| D8  | Games                   | List; schedule, reschedule, assign venue, umpires and scorer                                                           |
| D9  | Game review [D]         | Score sheet photo next to the capture, validations, approve and publish or return with a comment                       |
| D10 | Game decisions          | Forfeit, double forfeit, rain, coin toss; always with a reason                                                         |
| D11 | Venues and umpires      | Catalogs [D]                                                                                                           |
| D12 | Users                   | Create scorers and managers; assign roles                                                                              |
| D13 | Rulebook                | Upload or write, version and effective date                                                                            |
| D14 | Audit log               | Who changed what and why, with filters                                                                                 |

### Scorer

| #   | Screen       | Content                                                                                                                      |
| --- | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| N1  | My games     | Assigned, to capture and returned                                                                                            |
| N2  | Game capture | **Quick:** score, innings, umpires, participants. **Full:** box score per player. Score sheet photo [D]. Provisional players |

### Manager

| #   | Screen              | Content                                                                              |
| --- | ------------------- | ------------------------------------------------------------------------------------ |
| M1  | My team             | Upcoming games, roster pending items and deadlines                                   |
| M2  | Roster              | Propose additions and removals; complete provisional players before the deadline [D] |
| M3  | Eligibility         | Counter per player for playoffs                                                      |
| M4  | Lineup template [D] | Download blank or with the roster printed                                            |
| M5  | Report a mistake    | About a game of their team                                                           |

### Super admin

| #   | Screen           | Content                                 |
| --- | ---------------- | --------------------------------------- |
| S1  | Leagues          | Create leagues and assign board members |
| S2  | Privacy notices  | Versions of the CURP notice             |
| S3  | Everything above | Access to every league                  |

Count: portal 10 in the MVP + 1 later; admin 26.

## Key journeys

1. **Sunday after the game:** scorer N1 → N2 → quick capture + photo → submit. Board D1 → D9 → publish. Portal P3 and P4 update.
2. **Occasional player:** added as provisional in N2 → M1 warns "complete before Tuesday" → M2 adds the CURP → D5 approves.
3. **Deadline passed:** D1 flags a possibly ineligible player → D10 forfeit, extension or exception.
4. **Tournament start:** D2 → D3 → D4 → D7 → publish schedule → P2.

## Phone-first consequences

- **Full capture (N2):** one card per player, + and − counters, batting order from the roster; no wide tables.
- **Local draft:** the capture is saved on the phone while being filled, so it survives lost signal or a
  closed browser; it is sent when there is a connection.
- **Review (D9):** on a phone, toggle between capture and photo with zoom; side by side on a computer.
- **Photo:** camera straight from N2, compression before upload, warning if blurry or dark.
- **Large buttons**, main actions within thumb reach.

### Sketches (2026-11-25)

- **N2:** "Saved on the phone" state; quick/full and team selectors; a card per player with AB, H, R, RBI,
  BB and SO counters; provisional player marked with its deadline; add unregistered player; score sheet
  photos (one per team); "Submit for review".
- **D9:** runs by inning; validations in green (they add up) or yellow (warning); capture/photo toggle with
  zoom; "Return" requires a comment; "Approve and publish".
- **[D]** Warnings (provisional player, hits difference) only inform and do not block publishing; they are
  shown to the board and its decision is audited. [P] Impossible errors (more hits than at-bats) block submitting.

## Lineup template [D]

Downloadable to print; the lineup uses name and number. [P] Two versions: blank, and with team, rival,
date, venue and roster printed. Fields: batting order, number, name, position; starting pitcher; bench;
rows for new players; manager's name and signature; delivery time. No CURP. Letter size, black and white.
