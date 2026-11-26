# Tournament rules

Everything here is configurable per tournament unless it says otherwise. **[D]** decided · **[P]** proposed.

## Rosters

### Decided rules [D]

1. The manager proposes players and the board approves them.
2. The roster can be updated after each game, within a deadline (games on Sunday, deadline Tuesday).
3. The manager or the scorer updates it.
4. If it is not updated in time, there may be an ineligible player and the game may be forfeited.
5. A board member can make exceptions.
6. A CURP can be on only one team per tournament. Playing Aluminum and Wood in the same season is allowed
   for now (optional rule).
7. No transfers between teams for now (`transfersPerPlayer` = 0). No deadline for additions and no maximum roster size.

### Settings

| Setting                            | Initial value                                         |
| ---------------------------------- | ----------------------------------------------------- |
| Roster deadline                    | Tuesday 23:59 (league time zone) for Sunday games [P] |
| Minimum appearances for playoffs   | 5 [D, configurable]                                   |
| What counts as an appearance       | Being on the score sheet [D]                          |
| Teams per player in the tournament | 1 [D]                                                 |
| One category per season            | No, for now [D]                                       |
| Team changes per player            | 0 [D]                                                 |

### Flow [P]

1. **Game:** the scorer captures everyone who played. Anyone not on the roster enters as **provisional** (name and number).
2. **Until the deadline:** manager or scorer completes the provisional player's data or links them to an existing player.
3. **Proposed:** the board approves or rejects. The proposal date counts, not the approval date, so a slow board does not punish the team.
4. **Deadline passed without completing:** the system flags a **possibly ineligible player** and notifies the board.
5. **The board decides:** forfeit, extension or exception. Never automatic; the reason is required and audited.

Roster entry states: `provisional` → `proposed` → `approved`, or `rejected` / `released`.

The board can publish the score before the deadline; the game shows "roster under review" until it closes.

### Risks

- Adding players after the game could register someone who did not play. Mitigation: the scorer writes the
  name during the game and the late registration must match; the score sheet photo is the evidence.
- Frequent extensions: show the board how many each team has had.

## Eligibility for playoffs [P]

- Automatic counter per player: "3 of 5 games". Public on the player page [D].
- Appearances count in published games with an approved player.
- A board member can enable a player with a reason (exception).
- Being on the roster is not playing: the player must appear on the score sheet [D].
- The counter belongs to the player and follows them if they change teams [D]. Total = appearances +
  credits, computed, not editable.

**Consequence:** the quick capture must include the **list of participants** of both teams; without it
there is no eligibility control.

### Team that joins mid-tournament [D]

No debut credits. If needed, the minimum is lowered **for the whole tournament**: one value, the same
for everyone. The board changes it with a reason [P]; raising it mid-tournament shows a warning because it
may exclude players who were already eligible [P].

## Player identity

- **[D]** Today the league identifies players only by name. The app uses the **CURP** (unique across
  teams) and the **number** (identifies within the team). Lineups are given with name and number.
- [P] The number is unique among the team's active players and belongs to the team entry; each game keeps the number used.
- [P] CURP is required to approve, not to play: the provisional player completes it before the deadline.
- [P] Format and check digit are validated. That does not prove it belongs to the person.
- [P] No CURP: board exception with a reason.
- [P] The CURP reveals birth date, sex and state. It is stored encrypted, plus a keyed fingerprint (HMAC)
  for the unique index; masked on screen; never in the portal, printed lineups, logs or URLs.
- [P] The manager enters it and afterwards only sees it masked; the board can see it and the access is audited.
- [P] If it is already registered, the manager only sees "already registered in the tournament"; the board sees the detail.
- [D] Before a claim, the board can search the CURP in other tournaments of the league; the search is audited.

### Duplicate players [P]

- Unique index: one CURP, one active team per tournament. The database prevents it.
- The CURP makes the player unique [D]. Provisional players without CURP get a warning about similar names.
- The board resolves and can merge duplicates.

## Special games

### Forfeits [D]

- The score is 9-0 for the team that did not commit the offense; the offending team loses.
- The 9-0 runs count in the score, not in player stats, and not in tie-breakers.

| Case                                     | Appearances                                                                                        | Stats                                     |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Played and forfeited (ineligible player) | Those on the score sheet, except the ineligible player [D]                                         | Count, except the ineligible player's [D] |
| Not played; one team showed up           | It hands in a lineup: those players get an appearance and the rest of the roster gets a credit [D] | None                                      |
| Not played; the absent team              | None [P]                                                                                           | None                                      |
| Nobody showed up                         | None [D]; the board decides whether it is replayed or both lose                                    | None                                      |

[P] The credit only reaches players on the roster before the game (proposed or approved; counts once approved).

### Rain [D]

A game is valid after a configurable inning; otherwise it is replayed. [P] The score sheet of the voided
game is kept but adds no stats or appearances.

### Ties [D]

- No ties for now; a winner must be decided: extra innings or a coin toss.
- [P] Configurable per tournament: extra innings up to a limit, then a coin toss; optional runner on second.
- [P] The result records the method (`extraInnings` or `coinToss`), who decided and why. Extra-inning stats
  count; the coin only decides the winner.

### Team that withdraws [D]

- Disqualified. Its wins and losses are frozen, and so are its rivals' in games already played.
- Its pending games do not count. [P] They become `cancelled`; the team appears in standings as disqualified, without a place.
- [P] Stats and appearances from played games are kept.
- Its players become free to join another team and keep their counter.

## Standings [P]

Teams may end with a different number of games: order by winning percentage (PCT) and show GP, W, L and
games behind. Tie-breakers: pending with the league.

## Schedule generation

**[D]** The system generates the games: at least round robin with a number of rounds, and by groups.

| Format                          | How it works                            | Games with n teams    |
| ------------------------------- | --------------------------------------- | --------------------- |
| Round robin                     | Each pair meets r times (rounds)        | r × n(n−1)/2          |
| Groups                          | Round robin inside each group, r rounds | Sum of each group     |
| Groups with cross games (later) | Plus games between groups               | Configurable          |
| Playoffs (later)                | Brackets, best-of-k series              | Depends on qualifiers |

With one round: 8 teams = 28 games in 7 matchdays; 12 teams = 66 in 11. With an odd number, one team rests each matchday.

**Inputs [P]:** registered teams and, with groups, their assignment (manual or draw); rounds; game days
(weekday, start date, dates without games); time slots per venue; optional home venue and unavailable times per team.

**Algorithm [P]:**

1. Pair teams with the circle method: each team plays once per matchday.
2. Alternate home and away, and swap them in the second round.
3. Assign venue and time fairly.
4. Produce a **draft**: the board sees conflicts, moves games and publishes.

**Mid-tournament changes [P]:** regenerate only future games without a result; played games are never
touched. A joining team gets games proposed in future matchdays; a withdrawing team's pending games are
cancelled; a postponed game stays pending for rescheduling.

## Visible rules

- **[D]** Rules and their settings must be readable by everyone; managers do not edit them.
- [P] A "Tournament rules" page generated from the settings, so it always matches what the system applies:
  minimum appearances and what counts, roster deadline, rain minimum inning, forfeits, game and standings
  tie-breakers, schedule format and rounds, allowed team changes.
- [P] Below it, the league's written rulebook. Each change shows date, previous value and reason.

## CURP privacy

- **[D]** The system shows a statement: the CURP is used only to identify the player across tournaments.
- [P] It is part of the privacy notice and must be accepted before storing it, with date and notice
  version. Final text pending legal review. Draft (Spanish, as users will see it):

> Tu CURP se usa únicamente para identificarte como jugador y evitar registros duplicados entre torneos.
> No se publica, no se comparte con otros equipos y no se usa para ningún otro fin.
