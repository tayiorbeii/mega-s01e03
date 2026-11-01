import test from 'node:test';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { uniqueById, groupByCause, causeOf, dayFirst, sameCause } from '../src/lib/kb/causes.ts';
import { deskRef } from '../src/lib/kb/desk-ref.ts';
import { groupFindings } from '../src/lib/kb/findings.ts';
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const reports = JSON.parse(read('src/lib/data/reports-4471.json'));
const directory = new URL('../src/lib/data/tenants/', import.meta.url);
const tenants = readdirSync(directory).map(f => JSON.parse(readFileSync(new URL(f, directory), 'utf8')));
const tenantOf = r => tenants.find(t => t.handle === r.tenant);
const groups = groupByCause(uniqueById(reports).filter(r => r.mergedInto === 4471), tenantOf);

test('unique report IDs partition into two cause assignments without double counting', () => {
  assert.equal(reports.length, 427);
  assert.equal(uniqueById(reports).length, 412);
  assert.deepEqual(groups.map(g => [g.cause, g.reports.length]), [['parser', 379], ['hint', 33]]);
  assert.deepEqual(groups.map(g => g.taggedAs), [{ parser: 356, hint: 23 }, { parser: 15, hint: 18 }]);
});

test('tenant locale, form and channel determine cause, not subject or browser tag', () => {
  const alder = tenantOf({ tenant: 'alder.physio' });
  assert.equal(dayFirst('de-DE'), true);
  assert.equal(dayFirst('en-US'), false);
  assert.equal(causeOf({ channel: 'form' }, alder), 'hint');
  assert.equal(causeOf({ channel: 'app' }, alder), 'parser');
  assert.equal(causeOf({ channel: 'form' }, undefined), null);
  assert.equal(sameCause({ channel: 'form' }, alder, { channel: 'app' }, alder), false);
  assert.equal(sameCause({ channel: 'email' }, alder, { channel: 'app' }, alder), true);
});

test('five anomalous reports remain visible within the parser assignment', () => {
  const ids = JSON.parse(read('src/lib/data/desk-notes.json')).oneDayMove;
  assert.equal(ids.length, 5);
  assert.equal(groups.find(g => g.cause === 'parser').reports.filter(r => ids.includes(r.id)).length, 5);
});

test('body evidence splits five one-day reports out of the coarse parser assignment', () => {
  const ids = JSON.parse(read('src/lib/data/desk-notes.json')).oneDayMove;
  const findings = groupFindings(reports, tenantOf, ids);
  assert.deepEqual(findings.map(g => [g.cause, g.reports.length]), [['parser', 374], ['hint', 33], ['one-day', 5]]);
  assert.equal(new Set(findings.flatMap(g => g.reports.map(r => r.id))).size, 412);
  assert.equal(findings.reduce((n, g) => n + g.reports.length, 0), 412);
  assert.deepEqual(findings.find(g => g.cause === 'one-day').reports.map(r => r.id).sort(), [...ids].sort());
});

test('rendered page executes the components and derives its signature stamp', () => {
  const html = read('rendered/kb/incidents/4471-split/index.html');
  for (const text of ['374', '33', '427', '412', '15', 'issues/3', deskRef('tayiorbeii — Pi harness'), 'R-41202', 'R-41620', '2026-10-04']) assert.ok(html.includes(text), text);
  assert.ok(html.includes('<svg'));
  assert.ok(html.includes('same subject, same tenant, different channel'));
  assert.ok(!html.includes('no desk ref:'));
  assert.ok(!html.includes('<CauseTable'));
  assert.ok(!html.includes('{signature}'));
});

test('accepted decision 0001 matches the original export', () => {
  const hash = createHash('sha256').update(read('src/routes/kb/decisions/0001-dedupe-by-subject/+page.svx')).digest('hex');
  assert.equal(hash, '41ac5460f198519b61b72c1a344a89fc3f9c26eda481ad85d710fa23f336a1c9');
});
