---
name: test
description: Writes missing tests for the current changes and runs lint, typecheck, tests and coverage, returning a pass/fail report. Use to verify work in progress or after a manual change.
argument-hint: [what to focus on]
---

# /test

Delegate to the `tester` subagent. Tell it:

- What changed: the output of `git status` and a summary of `git diff`.
- The focus, if the user gave one: $ARGUMENTS
- The acceptance criteria, if the change came from a plan in this conversation.

Show the tester's report to the user as it came back. If the verdict is **FALLA**, offer to send the
causes to the `developer`.
