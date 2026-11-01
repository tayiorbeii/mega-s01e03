## Problem

**5 unique reports** concern one-day/date-boundary or other timing shifts. Expected: the intended booking or reminder date remains consistent across views, clients and locations. Observed: a previous day, differing day by location, or unexpected timing.

## Evidence

The desk-notes.json oneDayMove list names these exact reports; their bodies are in reports-4471.json:

- R-41202, kettle.books, email: “Invite says Tuesday 12 May. Calendar says Monday 11 May. My client turned up on the Monday. We had coffee.”
- R-41209, alder.physio, app: “Every booking in June is one day off. Only June. Why only June.”
- R-41236, nine.lanterns, app: “The invite arrived before I made the booking. I would like to know how.”
- R-41344, pale.harbour, email: “Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting. We held it twice.”
- R-41620, lantern.row, email: “Tuesday 6 October showed as Monday. I moved it myself. I have stopped reporting these but my colleague says it helps you.”

## Count

The one-day group in groupFindings contains exactly these five distinct report IDs from desk-notes.oneDayMove. Repeated export rows are removed by ID. Source: src/lib/kb/findings.ts and src/lib/data/reports-4471.json. Received range: 2026-04-02 through 2026-10-04.

## Investigation and acceptance

Obtain original local input, stored timestamp or date, timezone, generated invite and displayed result for each case. Reproduce May 12 → May 11 and the Lisbon/Toronto discrepancy. Check local-midnight conversion, offsets and DST boundaries against a timezone-neutral control. Investigate the June-only and before-booking reports; do not assume all five share one fix.

Timezone conversion is a hypothesis, not an established root cause. Keep the issue open until each report has an explained and tested disposition. No production service is included in the export.

Status: open; root cause and fix unverified. Refresh the export before treating this count as live. Investigation: src/routes/kb/incidents/4471-split/+page.svx. Rendered page: rendered/kb/incidents/4471-split/index.html. Reproduce the evidence with npm ci, npm run build, npm test.
