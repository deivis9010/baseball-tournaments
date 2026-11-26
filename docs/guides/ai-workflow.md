# Working with the AI agents

This project is built with Claude Code in VS Code. The main conversation is the **orchestrator**; it
delegates to three subagents that work in their own context and return a result.

## Agents (`.claude/agents/`)

| Agent       | Tools                               | Delivers                                                         |
| ----------- | ----------------------------------- | ---------------------------------------------------------------- |
| `planner`   | Read only                           | A plan: tasks with acceptance criteria and affected files        |
| `developer` | Read and edit                       | The change for one task, plus a short explanation                |
| `tester`    | Read, run commands, edit tests only | A pass/fail report: tests, coverage, lint and OWASP, with causes |

All of them reply in Spanish, with the `educational` output style and a "Para aprender" section.

## The `/iterate` cycle

1. Read `docs/status.md` and the request.
2. `planner` writes the plan. The orchestrator shows it and **waits for approval**.
3. For each task: `developer` implements, then `tester` verifies.
4. If the tester reports a failure, the report goes back to `developer`. After 3 rounds, the orchestrator asks the user.
5. At the end: definition of done, update `docs/status.md`, propose an ADR if something was decided.
6. Nothing is committed unless the user asks.

## Skills (`.claude/skills/`)

| Skill           | Use                                                          |
| --------------- | ------------------------------------------------------------ |
| `/iterate`      | Run the full cycle for a request                             |
| `/plan-task`    | Only plan, without implementing                              |
| `/implement`    | Implement one approved task                                  |
| `/test`         | Write and run tests for a change and report                  |
| `/owasp-review` | Walk the OWASP checklist over a change                       |
| `/new-module`   | Scaffold a layered module in the API (and its web feature)   |
| `/adr`          | Write a decision record                                      |
| `/commit`       | Check the definition of done and write a Conventional Commit |

## Rules by folder (`.claude/rules/`)

Loaded automatically when Claude works on matching files: `api.md` (`apps/api/**`), `web.md`
(`apps/web/**`), `tests.md` (test files) and `contracts.md` (`packages/contracts/**`).

## Hooks (`.claude/settings.json`)

- After an edit, Prettier formats the edited file.
- Reading or editing `.env` files and keys is blocked (`.env.example` is allowed), also through shell commands.

## Output style

`.claude/output-styles/educational.md` is selected in `.claude/settings.json`: Spanish replies of 10–15
lines that end with "Para aprender". It applies to new sessions; change it with `/config`.

## Naming note

`/plan-task` and `/owasp-review` are named so they do not clash with Claude Code's built-in `/plan` and
`/security-review`.

## Tips

- Ask for one thing at a time; small iterations are easier to review.
- If an agent goes the wrong way, stop it and say why; fix the instruction in its file if it repeats.
- Ask for longer explanations when a concept is new; replies are 10–15 lines by default.
