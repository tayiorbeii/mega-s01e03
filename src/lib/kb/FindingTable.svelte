<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupFindings } from '#lib/kb/findings';
  import { tenantOf } from '#lib/kb/locales';
  import type { Report } from '#lib/kb/causes';
  const findings = groupFindings(reports as Report[], tenantOf, notes.oneDayMove);
  const tickets: Record<string, { number: number; name: string }> = {
    parser: { number: 1, name: 'Month-first parser' },
    hint: { number: 2, name: 'booking-v3 date hint' },
    'one-day': { number: 3, name: 'One-day/date-boundary shifts; root cause unconfirmed' },
  };
</script>
<p><strong>{findings.reduce((n, g) => n + g.reports.length, 0)}</strong> unique reports · <strong>{findings.length}</strong> independently tracked problems</p>
<table>
  <thead><tr><th>Problem</th><th>Reports</th><th>Ticket</th></tr></thead>
  <tbody>{#each findings as g}<tr><td>{tickets[g.cause]?.name ?? g.cause}</td><td>{g.reports.length}</td><td>{#if tickets[g.cause]}<a href={'https://github.com/tayiorbeii/mega-s01e03/issues/' + tickets[g.cause].number}>#{tickets[g.cause].number}</a>{:else}Investigate separately{/if}</td></tr>{/each}</tbody>
</table>
