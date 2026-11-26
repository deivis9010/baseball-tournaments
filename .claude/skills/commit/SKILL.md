---
name: commit
description: Checks the definition of done, then writes and creates a Conventional Commit on a feature branch. Use only when the user asks to commit.
disable-model-invocation: true
argument-hint: [extra context for the message]
---

# /commit

1. Run `git status` and `git diff` (staged and unstaged). Read the change.
2. Refuse and explain if the change includes `.env` files, keys, or real personal data.
3. Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run format:check`. If any fails, stop and report.
4. Walk `docs/standards/definition-of-done.md` and show the checklist. Ask before going on if an item is ❌.
5. If the current branch is `main`, propose a branch name (`type/short-description`) and create it.
6. Write the message in English, Conventional Commits: `type(scope): summary` in the imperative, under
   72 characters, a blank line, then a body explaining why. Types: `feat`, `fix`, `docs`, `test`,
   `refactor`, `chore`, `ci`, `build`, `perf`. Scopes: `api`, `web`, `contracts`, `rules`, `docs`, `ai`, `ci`.
   Extra context from the user: $ARGUMENTS
7. Show the message, stage the relevant files by name (never `git add -A` blindly), and commit.
   Never use `--no-verify`. If a hook fails, fix the cause and create a new commit.
8. Do not push unless the user asks.
