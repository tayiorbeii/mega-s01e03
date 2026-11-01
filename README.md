# S01E03 — what it shows

Course challenge investigation of the fictional support desk's #4471 export.

## Deliverables

- [Parser issue](https://github.com/tayiorbeii/mega-s01e03/issues/1): 379 reports in the exported desk view, including the five one-day reports.
- [Form-hint issue](https://github.com/tayiorbeii/mega-s01e03/issues/2): 33 reports.
- [One-day/date-boundary issue](https://github.com/tayiorbeii/mega-s01e03/issues/3): 5 reports; root cause unconfirmed.
- [Signed investigation source](src/routes/kb/incidents/4471-split/+page.svx).
- [Rendered investigation HTML](rendered/kb/incidents/4471-split/index.html).
- [Replacement decision](src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx); accepted decision 0001 is preserved byte for byte.

427 export rows → 412 unique report IDs. The desk counts 379 parser and 33 hint reports. Its five one-day reports are a subset of parser, also requiring a separate investigation ticket. Preserve that overlap: 379 + 33 + 5 are ticket-view counts, not 417 unique reports. Deduplicate IDs for the overall total. The supplied classifier does not inspect bodies; the symptom list does not establish a root cause.

## Subsequent engineering update

The course reports #4471 closed on 2026-10-05: parser fixed (“fix(dates): parse dd/mm for eu locales”), hint won't fix (“booking-v3 form retired”). Close #1 as completed and #2 as not planned; these are different outcomes. The five-report timing investigation remains open because the update gives it no verified disposition. Source and observation date are recorded in src/lib/data/engineering-4471.json and rendered on the investigation page. These are course-reported outcomes, not production tests run by this harness.

## Reusable workflow

Before creating, editing or closing tickets, follow the [GitHub ticket workflow](docs/github-ticket-workflow.md). It covers approval, source-backed drafts and counts, CLI commands, live-state checks, closure reasons and verification. It runs nothing automatically.

## Reproduce

Requires Node.js 24 and npm.

1. npm ci
2. npm run build
3. npm test
4. python3 -m http.server 8765 --directory rendered
5. Open http://localhost:8765/kb/incidents/4471-split/

The build uses mdsvex and Svelte server rendering through Vite, including the original cause table, queue chart, dedupe examples and derived signature stamp. Rendered files are checked in because the course requests both the .svx and what the desk sees. They are static snapshots, not a hydrated interactive app. Rebuild after changing data. The source export contains no production service; no production fix has been made or tested.

Original export conventions: [EXPORT-README.md](EXPORT-README.md). Original data/components and all original .svx pages are unchanged. Added: build tooling, tests, audit component, investigation and replacement decision. Only fictional course data is published; browser state and private course logs are excluded.

## Validation limits

The 2026-10-04 snapshot does not expose today's live desk. Received dates and merged dates measure different events. Known ticket status does not establish a fixed bug. npm audit reports three low-severity development-tool findings through deepmerge; npm audit --omit=dev reports zero production dependencies with vulnerabilities. No public dev server is needed.
