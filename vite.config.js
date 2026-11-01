import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  resolve: { alias: { '#lib': fileURLToPath(new URL('./src/lib', import.meta.url)) } },
  plugins: [svelte({
    extensions: ['.svelte', '.svx'],
    compilerOptions: { css: 'injected' },
    preprocess: mdsvex({ extensions: ['.svx'], layout: { runbook: './src/lib/layouts/runbook.svelte' } }),
  })],
});
