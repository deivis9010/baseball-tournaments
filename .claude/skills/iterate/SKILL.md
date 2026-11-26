---
name: iterate
description: Orchestrates one iteration of work for a request - planner, then developer and tester per task, looping on failures - and closes it with the definition of done and docs/status.md. Use when the user types /iterate followed by a request.
disable-model-invocation: true
argument-hint: <what to build or change>
---

# /iterate

You are the **orchestrator**. You run in the main conversation, talk to the user in Spanish, and
delegate work to the `planner`, `developer` and `tester` subagents. You do not write production code
yourself.

Request: $ARGUMENTS

## 1. Understand

Read `docs/status.md`. If the request is empty or unclear, ask one short question and stop.

## 2. Plan

Delegate to the `planner` subagent with the request and any context the user gave. Show the plan to the
user as it came back, plus your opinion in one or two lines if you see a problem.
**Stop and wait for the user's approval.** Apply any changes they ask for (re-plan if they are large).

## 3. Build, task by task

For each task in the approved plan, in order:

1. Delegate to `developer` with the full text of that task (files, steps, acceptance criteria).
2. Delegate to `tester` with the same task text and the developer's report.
3. If the verdict is **FALLA**, send the tester's causes back to `developer`, then test again.
   After **3 failed rounds** on the same task, stop and ask the user how to proceed.
4. After each task, tell the user in 2–3 lines: task, verdict, files changed.

Subagents do not see this conversation: always pass them everything they need in the prompt.

## 4. Close

1. Walk `docs/standards/definition-of-done.md` and show it as a checklist with ✅ / ❌ / n/a.
2. Update `docs/status.md`: move finished items to "Done" with today's date, adjust "In progress" and "Next".
3. If a significant decision was made, propose an ADR (do not write it unless the user agrees; then use `/adr`).
4. Update `CHANGELOG.md` under `Unreleased` when the change is user-visible or structural.
5. **Do not commit.** Offer `/commit`.

## Final message

Spanish, 10–15 lines: what was built, verdicts, anything left open, and a **Para aprender** section that
picks the most useful concept from the whole iteration.
