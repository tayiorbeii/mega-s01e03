import { uniqueById, groupByCause, type Report, type Tenant } from './causes.ts';

// The original classifier cannot inspect the body. Desk-note IDs preserve the
// contradicting evidence as a separate problem without asserting its root cause.
export function groupFindings(reports: Report[], tenantOf: (r: Report) => Tenant | undefined, oneDayIds: readonly string[]) {
  const merged = uniqueById(reports).filter(r => r.mergedInto === 4471);
  const flagged = new Set(oneDayIds);
  const groups = groupByCause(merged.filter(r => !flagged.has(r.id)), tenantOf);
  return [
    ...groups.map(g => ({ cause: g.cause as string, reports: g.reports })),
    { cause: 'one-day', reports: merged.filter(r => flagged.has(r.id)) },
  ].filter(g => g.reports.length > 0);
}
