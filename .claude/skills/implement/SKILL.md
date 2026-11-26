---
name: implement
description: Implements one already-approved task through the developer subagent and verifies it with the tester. Use when a single, clear task is ready and a full /iterate cycle is not needed.
argument-hint: <task description with acceptance criteria>
---

# /implement

Task: $ARGUMENTS

1. If the task has no acceptance criteria, write two or three verifiable ones and confirm them with the
   user before continuing.
2. Delegate to `developer` with the full task text.
3. Delegate to `tester` with the task text and the developer's report.
4. On **FALLA**, send the causes back to `developer`. After 3 failed rounds, ask the user.
5. Report in Spanish: verdict, files changed, and a **Para aprender** section. Do not commit.
