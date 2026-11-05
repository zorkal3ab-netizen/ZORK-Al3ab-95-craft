import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const getBase = () => {
  // 1. Explicit BASE_PATH (e.g. from GitHub Actions configure-pages or CLI)
  if (process.env.BASE_PATH !== undefined) {
    const raw = process.env.BASE_PATH.trim();
    if (raw === '' || raw === '/') return '/';
    return raw.endsWith('/') ? raw : `${raw}/`;
  }

  // 2. Deployment-aware detection for GitHub Actions / GitHub Pages
  const repoFull = process.env.GITHUB_REPOSITORY;
  if (repoFull) {
    const parts = repoFull.split('/');
    const owner = parts[0] || '';
    const repository = parts[1] || '';
    const isUserSite = repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
    // If it's a user or organization site (e.g. https://haider699-hue.github.io/), base is "/"
    if (isUserSite) {
      return '/';
    }
    // If it's a project site (e.g. https://haider699-hue.github.io/zorkcraft/), base is "/zorkcraft/"
    return `/${repository}/`;
  }

  // 3. Fallback for static hosting, docs directory, or local preview
  return './';
};

export default defineConfig(() => {
  return {
    base: getBase(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
