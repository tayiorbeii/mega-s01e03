<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { uniqueById, groupByCause, readAs, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  const unique = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
  const groups = groupByCause(unique, tenantOf);
  const months = [...new Set(unique.map(r => r.receivedAt.slice(0, 7)))].sort();
  const anomalies = unique.filter(r => notes.oneDayMove.includes(r.id));
</script>
<p>Export rows: <strong>{reports.length}</strong>; repeated IDs removed: <strong>{reports.length - unique.length}</strong>; unique reports in #4471: <strong>{unique.length}</strong>.</p>
<table>
  <thead><tr><th>Month</th><th>Received</th><th>Merged</th></tr></thead>
  <tbody>{#each months as month}<tr><td>{month}</td><td>{unique.filter(r => r.receivedAt.startsWith(month)).length}</td><td>{unique.filter(r => r.mergedAt?.startsWith(month)).length}</td></tr>{/each}</tbody>
</table>
<p>The export ends on {unique.map(r => r.receivedAt.slice(0, 10)).sort().at(-1)}. These counts describe that snapshot, not today's live desk.</p>
<h3>One-day shifts: unresolved evidence, not a proven third cause</h3>
<p>{anomalies.length} reports are flagged by desk notes. The current classifier files {groups.reduce((n, g) => n + (g.cause === 'parser' ? readAs(g, notes.oneDayMove) : 0), 0)} under parser. Their wording is not explained by a month/day swap; preserve and investigate them rather than silently declaring a timezone bug or a fix.</p>
<ul>{#each anomalies as report}<li><code>{report.id}</code> — {report.tenant}, {report.channel}: {report.body}</li>{/each}</ul>
