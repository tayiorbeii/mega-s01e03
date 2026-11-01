import { createServer } from 'vite';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
async function pages(dir) {
  const found = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, e.name);
    if (e.isDirectory()) found.push(...await pages(path));
    else if (e.name === '+page.svx') found.push(path);
  }
  return found;
}
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('svelte/server');
  for (const path of await pages('src/routes/kb')) {
    const mod = await server.ssrLoadModule('/' + path);
    const rendered = render(mod.default);
    const directory = path.replace('src/routes', 'rendered').replace('/+page.svx', '');
    await mkdir(directory, { recursive: true });
    const html = '<!doctype html><html lang="en"><head><meta charset="utf-8">' + rendered.head + '</head><body>' + rendered.body + '</body></html>\n';
    await writeFile(join(directory, 'index.html'), html);
    console.log('Rendered', directory);
  }
} finally { await server.close(); }
