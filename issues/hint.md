## Problem

**33 unique reports** concern the booking-v3 date-field hint. It displays MM/DD/YYYY to day-first tenants while the form reads their tenant's day/month order. The displayed instruction and the input reader disagree.

## Evidence

Affected tenants: alder.physio (de-DE), copper.studio (es-ES), pale.harbour (pt-PT), via the form channel.

R-41230, copper.studio: “My client came on 1 June instead of 6 January.” R-41241, alder.physio: “We had two people show up on 8 June. They were booked for 6 August.”

For intended 6 January, following the displayed MM/DD/YYYY instruction produces 01/06/YYYY. A day/month reader interprets this as 1 June. This reproduction is derived from the supplied form description; the export includes no running production form.

## Count

The hint group in groupFindings contains 33 distinct report IDs. The group uses tenant locale, booking-v3 and the form channel; browser settings are not authoritative. Repeated export rows are removed by ID. Source: src/lib/kb/findings.ts and src/lib/data/reports-4471.json. Snapshot received range: 2026-04-17 through 2026-09-22.

## Remedy and acceptance

Make the displayed hint and actual form reader agree with the tenant's date order, preferably through an unambiguous date control. For each affected tenant, assert the displayed format and saved date for intended 6 January versus 1 June. Include booking-v2 and month-first controls.

Status: open; no fix verified. Refresh the export before treating this count as live. Investigation: src/routes/kb/incidents/4471-split/+page.svx. Rendered page: rendered/kb/incidents/4471-split/index.html. Reproduce the evidence with npm ci, npm run build, npm test.
