---
name: adr
description: Writes an Architecture Decision Record in docs/decisions from the template, with context, decision, alternatives and consequences. Use when a significant technical decision was made or changed.
argument-hint: <decision to record>
---

# /adr

Decision: $ARGUMENTS

1. List `docs/decisions/` and take the next number (four digits). Read `template.md` and any ADR this one
   relates to or supersedes.
2. Gather the context from the conversation. If the alternatives or the reason are unclear, ask the user
   one short question before writing.
3. Write `docs/decisions/NNNN-short-title.md` in English, following the template. Title in imperative
   form. Status `accepted` if the user already decided, otherwise `proposed`. Today's date.
4. If it supersedes an ADR, change only the old one's status line to `superseded by NNNN`.
5. If the decision changes a rule in `CLAUDE.md`, a standard or `docs/architecture.md`, update it and
   link the ADR.
6. Tell the user in Spanish what was recorded, with a **Para aprender** section.
