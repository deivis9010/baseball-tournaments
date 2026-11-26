# Glossary

The conversation happens in Spanish; code always uses the English name in this table.

| Term (es)             | Code name        | Meaning                                              | Example                       |
| --------------------- | ---------------- | ---------------------------------------------------- | ----------------------------- |
| Liga                  | `League`         | The organization that runs tournaments; has a board  | A neighborhood league         |
| Temporada             | `Season`         | The year or edition                                  | 2026                          |
| Categoría             | `category`       | The kind of competition                              | Aluminum, Wood (second tier)  |
| Torneo                | `Tournament`     | One category in one season                           | Aluminum 2026                 |
| Equipo                | `Team`           | The club; can play several tournaments               | Tigers                        |
| Inscripción de equipo | `TeamEntry`      | A team inside a tournament                           | Tigers in Aluminum 2026       |
| Nómina (cada jugador) | `RosterEntry`    | A player on a team's roster for a tournament         | —                             |
| Jugador (ficha)       | `Player`         | The person, recognized across the league             | —                             |
| Identidad (CURP)      | `PlayerIdentity` | Encrypted CURP and its HMAC fingerprint              | —                             |
| Calendario            | `Schedule`       | Format and draft of games                            | Round robin, one round        |
| Partido               | `Game`           | A scheduled or played game                           | Tigers vs Hawks               |
| Captura               | `GameReport`     | One version of what was entered for a game           | Version 1, manual             |
| Línea del jugador     | `BoxScoreLine`   | A player's stats in one game                         | 4 AB, 2 H                     |
| Participación         | `Appearance`     | An appearance that counts toward playoff eligibility | Score sheet, lineup or credit |
| Estadio               | `Venue`          | Field where games are played                         | —                             |
| Árbitro               | `Umpire`         | —                                                    | —                             |
| Reglamento            | `Rulebook`       | The league's written rules                           | 2026 version                  |
| Reporte de error      | `GameIssue`      | A report of a mistake in a game's data               | —                             |
| Bitácora              | `AuditLog`       | Who changed what, when and why                       | —                             |
| Aviso de privacidad   | `PrivacyNotice`  | Text accepted before giving a CURP                   | Version 1                     |
| Hoja de anotación     | score sheet      | The paper sheet scorers fill in during a game        | —                             |
| Forfeit / confiscado  | `forfeit`        | A game awarded 9-0                                   | —                             |

## Roles

| Term (es)   | Code name    | Who                                               |
| ----------- | ------------ | ------------------------------------------------- |
| Super admin | `superAdmin` | Platform owner, global                            |
| Directivo   | `board`      | League board member; approves and publishes       |
| Anotador    | `scorer`     | Enters game data                                  |
| Manager     | `manager`    | Manages one team (membership `scope` = the team)  |
| Visitante   | `visitor`    | Anyone without an account; sees the public portal |

## Two different controls

1. **Where a CURP must be unique to register:** the **tournament**. In Aluminum 2026 a CURP can be on only one team.
2. **Where the person is recognized:** the **league**. The player profile shows their history split by tournament.

Stats are computed per tournament: what happens in Aluminum 2026 stays in Aluminum 2026.
