## Problem and scope

**379 unique reports** in #4471 are assigned to the shared month-first **parser** by the supplied classifier. All 11 tenants are represented; reports were received 2026-04-01 through 2026-10-04.

Day-first tenant input is parsed month first. Example: R-41200, harbour.dental (en-GB), app: “Our 7 April reminder went out on 4 July.” Expected 7 April; observed 4 July. This is separate from booking-v3's form hint problem (#2).

## How the count was obtained

Run the original uniqueById → filter mergedInto === 4471 → groupByCause with tenantOf. The export has 427 rows, but 15 repeat IDs; there are 412 unique reports. Use tenant locale plus channel/form, not browserLocale or intakeTag. This group has 356 tagged parser and 23 tagged hint; intake guesses are not causes.

The original code, reports and tenant registry are in src/lib. Run npm ci, npm run build, npm test. The signed investigation source is src/routes/kb/incidents/4471-split/+page.svx; rendered HTML is rendered/kb/incidents/4471-split/index.html.

## Uncertainty that must not disappear

The count is the export model's assignment, not proof of one root cause for every row. Five reports are filed here but describe one-day shifts or otherwise incompatible timing: R-41202, R-41209, R-41236, R-41344, R-41620. They are included in 379, not added again. Preserve their bodies and investigate; do not declare a timezone cause from this export alone or claim the parser fix covers them.

## Proposed bounded remedy and acceptance checks

- Make parsing agree with the tenant's documented date order; use an unambiguous internal date representation.
- Reproduce the 7 April/4 July case for a day-first tenant, test another day-first locale, an unambiguous day greater than 12, and a month-first control.
- Check app/email and the day-first booking-v2 path. Do not assume a parser change fixes booking-v3's hint (#2).
- Resolve or explicitly retain the five anomalous reports before closing all 379 as fixed.

No production code or fix is supplied by the export. Status: open; fix not verified. Counts are the 2026-10-04 snapshot. The desk continues to work; refresh before using these as live totals. Reports begin in April; July merging is processing time, not incident onset.
