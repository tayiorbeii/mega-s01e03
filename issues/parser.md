## Problem

**374 unique reports** concern the shared date parser reading day-first tenant input as month first. The affected tenants write dates in day/month order. The parser must preserve their intended date.

## Evidence

R-41200, harbour.dental (en-GB), app: “Our 7 April reminder went out on 4 July.” Expected 7 April; observed 4 July.

## Count

The parser group in groupFindings contains 374 distinct report IDs in the 2026-10-04 export snapshot. The count uses the tenant directory and report channel, not the reporter's browser settings. Repeated export rows are removed by ID. Source: src/lib/kb/findings.ts and src/lib/data/reports-4471.json.

## Remedy and acceptance

Make the shared parser read the tenant's documented date order and use an unambiguous internal date representation. Test intended 7 April versus 4 July for en-GB, another day-first locale, a day greater than 12, and a month-first control. Exercise app/email and the day-first booking-v2 path.

Status: open; no production fix has been supplied or verified. Refresh the export before treating this count as live. Investigation: src/routes/kb/incidents/4471-split/+page.svx. Rendered page: rendered/kb/incidents/4471-split/index.html. Reproduce the evidence with npm ci, npm run build, npm test.
