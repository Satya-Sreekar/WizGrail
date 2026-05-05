# WizGrail — site

Marketing site for WizGrail, an AI Enabler for SMEs.

Built with Vite + React + Framer Motion.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve the production build locally
```

## Deployment

This repo is set up to deploy to GitHub Pages via the workflow at
[.github/workflows/deploy.yml](.github/workflows/deploy.yml).

**One-time setup on GitHub**

1. Push this repo to GitHub.
2. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Add the custom domain in **Settings → Pages → Custom domain**: `wizgrail.com`.
   The `public/CNAME` file is already in place; the build copies it to `dist/CNAME`.
4. At the DNS provider for `wizgrail.com`, point either:
   - an apex `A` record to GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`), or
   - a `CNAME` from `www` to `<github-username>.github.io` and set `wizgrail.com` to redirect to `www`.
5. Push to `main` — the workflow runs automatically.

**If deploying to project pages instead** (e.g. `https://<user>.github.io/<repo>/`)

- Delete `public/CNAME`.
- In the workflow, change `VITE_BASE: '/'` to `VITE_BASE: /WizGrail/`.
