import { uniqueById, groupByCause, type Report, type Tenant } from './causes.ts';

// Preserve the desk's as-exported cause counts. The one-day symptom list is
// an overlapping investigation view, not a subtraction from the parser count.
export function groupFindings(reports: Report[], tenantOf: (r: Report) => Tenant | undefined, oneDayIds: readonly string[]) {
  const merged = uniqueById(reports).filter(r => r.mergedInto === 4471);
  const flagged = new Set(oneDayIds);
  const groups = groupByCause(merged, tenantOf);
  return [
    ...groups.map(g => ({ cause: g.cause as string, reports: g.reports })),
    { cause: 'one-day', reports: merged.filter(r => flagged.has(r.id)) },
  ].filter(g => g.reports.length > 0);
}
