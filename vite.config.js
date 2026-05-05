import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Base path:
//   - Custom domain (wizgrail.com via CNAME): leave as '/'
//   - Project pages (https://<user>.github.io/<repo>/): set VITE_BASE=/<repo>/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
