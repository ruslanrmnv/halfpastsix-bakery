# Project Context: bakery-portland (not started yet)
Updated: 2026-08-07 | Chat topic: handoff

## State

**This project has not been started.** No code, no repo, no package.json. This
folder holds only the handoff. Intake (phase 0 of the `site-start` skill) was
begun by mistake inside another session and stopped partway.

Intake answers already given — do not ask these again:

| Field | Answer |
|---|---|
| Niche | Food service — bakery |
| Type | Portfolio demo, all data invented |
| Market | USA, Portland |
| Character | Morning mixed: bread, pastry and coffee together |
| Target action | Takeaway order |
| Mechanics | "кафе + свежая выпечка + заказ" (user's words, needs unpacking) |
| Scope | Multiple pages |
| Stack | Next.js + Tailwind, same as STROP |

Derived, no need to ask: English UI, USD, 12-hour time, invented phone numbers
from the reserved `555-0100…0199` range.

**Prior work this builds on:**
- `C:\Users\User\projects\barbershop demo` — STROP, finished and published at
  https://github.com/ruslanrmnv/strop-barbershop. Next.js 16 + Tailwind 4,
  fully static, zero third-party scripts. Verified: 4.5:1 contrast on every
  text node, 44px tap targets, complete first screen at 375×670.
- `C:\Users\User\.claude\skills\site-start\` — the working method as a skill,
  source at https://github.com/ruslanrmnv/site-start-skill. Nine phases with
  gates. **Run `/site-start` at the beginning of this project.**

## Decisions

- **Separate project = separate session.** Do not start project work inside a
  session about something else.
- **Mockup before code.** Phase 2 produces a mockup and an acceptance gate;
  production code does not begin until the mockup is accepted.
- **Check palette and type against the three AI-default looks BEFORE building**,
  not after. STROP was built dark with one vermilion accent, which is default
  #2 verbatim, and had to be redone as a light enamel palette. Oswald + Inter is
  likewise the two most default faces.
- **Measure, do not eyeball.** Every finding carries an exact `file:line` and a
  specific replacement. Scripts are in the skill's `references/measure.md`.
- **One accent colour, one job — the CTA.** Nowhere else.
- **The conversion step lives inside the page**, never a redirect to a
  third-party platform. This was STROP's whole thesis and applies here too.
- **Invented data must not collide with reality:** reserved phone ranges,
  address checked by search, name and domain checked by search.
- `git init` and a first commit before any edits.

## Next steps

1. Open a new session in this folder, run `/site-start`, finish phase 0 using
   the open questions below. Intake resumes mid-way, not from the start.
2. Phase 1 — research 4–6 real Portland bakery sites, find the common weakness,
   write `research/ux-research.md`.
3. Phase 2 — tokens, defaults check, mockup, acceptance gate.
4. Only then `git init` and build.

## Open questions

- Unpack the mechanics: what is ordered ahead, what is taken on the spot, is
  there a live "what is still left today" list. This decides the whole page.
- Which pages, and what goes on each.
- Name, founding year, size, one sentence on what makes it different.
- Design constraints: references and what specifically is liked about them,
  what is forbidden, light or dark.
- US legal: consent banner, privacy policy — needed or not.
- Hosting, domain, deadline.
- Pending from the previous session: whether to add a guard line to the
  `site-start` skill so intake starts only on an explicit command to begin.
  This is a change to a public repo, waiting on the user.
