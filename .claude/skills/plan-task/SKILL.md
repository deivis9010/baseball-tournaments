---
name: plan-task
description: Produces a plan (tasks, acceptance criteria, affected files) for a request without implementing anything. Use when the user wants to see how something would be built before deciding.
argument-hint: <what to plan>
---

# /plan-task

Delegate to the `planner` subagent with this request and any context from the conversation:

$ARGUMENTS

Show the plan to the user as it came back. Add at most two lines with your own opinion if you see a
risk or a simpler option. Do not implement anything. Offer `/iterate` to build it.
