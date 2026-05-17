import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://scripts-and-tables.github.io',
  base: '/daa',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-default' },
      wrap: true,
    },
  },
});
