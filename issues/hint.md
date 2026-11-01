## Problem and scope

**33 unique reports** in #4471 are assigned to the booking-v3 date **hint** problem. They span three day-first tenants: alder.physio (de-DE), copper.studio (es-ES), pale.harbour (pt-PT), received 2026-04-17 through 2026-09-22.

booking-v3 prints MM/DD/YYYY, but its form reads dates in the tenant's day-first order. Following the printed hint can therefore swap the intended month and day. This requires its own fix, separate from the shared parser (#1).

## Evidence and reproduction

R-41230: copper.studio, form, reports “My client came on 1 June instead of 6 January.” Browser en-GB caused intake to guess parser, but tenant es-ES + booking-v3 + form selects hint. R-41241: alder.physio, form, reports 8 June versus 6 August, another swapped date.

For a day-first booking-v3 tenant, follow the printed MM/DD/YYYY hint for an ambiguous date such as intended 6 January: enter 01/06/YYYY. Expected 6 January; the tenant-order reader instead interprets 1 June. This reproducer is derived from the supplied form description/classifier; the export has no running production form.

## Count and distinction

Deduplicate by report ID, filter mergedInto === 4471, and call groupByCause with tenantOf. The hint group contains 15 reports tagged parser and 18 tagged hint. Counting intake tags would incorrectly give 41 instead of 33. Together with #1's 379 assignments this accounts for all 412 unique reports without double counting.

Use the original src/lib/kb/causes.ts, locales.ts and tenant files. Build/test commands: npm ci; npm run build; npm test. See src/routes/kb/incidents/4471-split/+page.svx and rendered/kb/incidents/4471-split/index.html for the signed, computed investigation.

## Proposed bounded remedy and acceptance checks

- Make the printed hint and actual form reader agree for the tenant's locale, preferably using an unambiguous date control.
- Check intended 6 January versus 1 June for each affected tenant; assert both the displayed format and saved date.
- Keep a booking-v2 day-first control and a month-first control. Check the parser path independently (#1).

Status: open; fix not verified. These are export assignments, not proof of a shipped fix. The desk continues working; refresh the snapshot before claiming live counts.
