## Problem and scope

**5 unique reports** in #4471 describe one-day/date-boundary or other timing shifts rather than month/day swaps. They require a separate investigation, not inclusion in the parser fix's report count. Received 2026-04-02 through 2026-10-04.

## Evidence

The desk-notes.json oneDayMove list names these exact reports; their bodies are in reports-4471.json:

- R-41202, kettle.books, email: “Invite says Tuesday 12 May. Calendar says Monday 11 May. My client turned up on the Monday. We had coffee.”
- R-41209, alder.physio, app: “Every booking in June is one day off. Only June. Why only June.”
- R-41236, nine.lanterns, app: “The invite arrived before I made the booking. I would like to know how.”
- R-41344, pale.harbour, email: “Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting. We held it twice.”
- R-41620, lantern.row, email: “Tuesday 6 October showed as Monday. I moved it myself. I have stopped reporting these but my colleague says it helps you.”

Expected: the intended booking/reminder date is retained consistently across views, clients and locations. Observed: different day or timing, without evidence of a month/day reversal. Timezone/date-boundary conversion is a hypothesis worth checking, not a root cause established by this export. Some reports may need further separation once investigated.

## Count and distinction

Deduplicate by report ID and filter mergedInto === 4471, then take the five IDs in desk-notes.oneDayMove. These reports are all tagged parser by intake; the supplied classifier also files them under parser because it sees only channel and tenant, not the body's symptoms. Do not use that model as proof of root cause.

The corrected disjoint partition is **374 parser (#1) + 33 hint (#2) + 5 one-day/timing (#3) = 412**. These five are excluded from #1's count. groupFindings in src/lib/kb/findings.ts computes the partition from the original data; no report is counted twice.

## Investigation and acceptance checks

- Obtain original local input, stored date/timestamp, timezone, generated invite and displayed result for each case. No production service is included in the export.
- Reproduce the May 12 → May 11 case and the Lisbon/Toronto same-meeting discrepancy. Check local midnight/date-only conversion, offsets and DST boundaries as hypotheses; compare with a timezone-neutral control.
- Check the June-only and October examples and investigate the before-booking timing report rather than assuming all five share a fix.
- Keep this issue open until each report has an explained, tested disposition. A parser or hint fix alone does not establish that these symptoms are resolved.

See src/routes/kb/incidents/4471-split/+page.svx and rendered/kb/incidents/4471-split/index.html. Run npm ci; npm run build; npm test. Status: open; root cause and fix unverified. Counts describe the export snapshot, not today's live desk.
