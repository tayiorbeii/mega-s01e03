## Problem and scope

**374 unique reports** in #4471 concern the shared month-first **parser**, after separating five reports with one-day/timing symptoms into #3. All 11 tenants are represented; reports were received 2026-04-01 through 2026-10-04.

Day-first tenant input is parsed month first. Example: R-41200, harbour.dental (en-GB), app: “Our 7 April reminder went out on 4 July.” Expected 7 April; observed 4 July. This is separate from booking-v3's form hint problem (#2).

## How the count was obtained

Run groupFindings: uniqueById → filter mergedInto === 4471 → separate desk-notes.oneDayMove IDs → groupByCause with tenantOf for the remainder. The export has 427 rows, but 15 repeat IDs; there are 412 unique reports. Use tenant locale plus channel/form, not browserLocale or intakeTag. This group has 351 tagged parser and 23 tagged hint; intake guesses are not causes.

The original code, reports and tenant registry are in src/lib. Run npm ci, npm run build, npm test. The signed investigation source is src/routes/kb/incidents/4471-split/+page.svx; rendered HTML is rendered/kb/incidents/4471-split/index.html.

## Uncertainty that must not disappear

The original classifier assigns 379 reports to parser because it does not read bodies. Five describe a different problem: R-41202, R-41209, R-41236, R-41344, R-41620. Those are now counted only in #3, leaving 374 here. The original assignment is not proof that a parser fix covers one-day shifts. Total: 374 parser + 33 hint (#2) + 5 one-day (#3) = 412.

## Proposed bounded remedy and acceptance checks

- Make parsing agree with the tenant's documented date order; use an unambiguous internal date representation.
- Reproduce the 7 April/4 July case for a day-first tenant, test another day-first locale, an unambiguous day greater than 12, and a month-first control.
- Check app/email and the day-first booking-v2 path. Do not assume a parser change fixes booking-v3's hint (#2).
- Track the five one-day reports separately in #3; do not close that issue on the strength of a parser fix.

No production code or fix is supplied by the export. Status: open; fix not verified. Counts are the 2026-10-04 snapshot. The desk continues to work; refresh before using these as live totals. Reports begin in April; July merging is processing time, not incident onset.
