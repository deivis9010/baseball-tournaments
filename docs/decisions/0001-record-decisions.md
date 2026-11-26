# 0001 — Record architecture decisions

- Status: accepted
- Date: 2026-11-26

## Context

Decisions in this project are made in conversation, often with an AI assistant. Months later neither
the developer nor an agent can tell why something is the way it is without rebuilding that conversation.

## Decision

Every significant technical decision is recorded as an ADR (Architecture Decision Record) in
`docs/decisions/`, using [template.md](template.md).

- File name: `NNNN-short-title.md`, numbered in order, never renumbered.
- An ADR is not edited once accepted, except for its status. A changed decision gets a new ADR that
  supersedes the old one (`Status: superseded by 0012`).
- The `adr` skill writes them; `/iterate` proposes one when an iteration made a decision.

A decision is significant when it is hard to reverse, affects several modules, or picks one option
over reasonable alternatives.

## Alternatives considered

- **Decisions only in commit messages or PRs:** hard to find and to read as a whole.
- **One large decisions document:** grows without structure and mixes current and outdated decisions.

## Consequences

- Agents and people can read the reason behind a choice before changing it.
- Writing an ADR takes a few minutes per decision.
