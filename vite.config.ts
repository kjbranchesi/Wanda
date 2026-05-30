import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Multi-page: the landing page (index.html) and the brand system
// (brand-system.html) are separate entry points.
export default defineConfig({
  // '/' for root deploys (Netlify, Vercel, custom domain). Set VITE_BASE to a
  // subpath (e.g. '/wanda/') for GitHub project-page deploys — the CI workflow
  // does this automatically. Relative in-app links work under either base.
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        brandSystem: resolve(import.meta.dirname, 'brand-system.html'),
      },
    },
  },
})
