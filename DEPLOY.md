# whoax.com — GitHub Pages Deploy

## Build locally

```bash
cd whoax-portfolio
npm ci
npm run build
```

Static output is in `out/`.

## GitHub Pages

1. Push `whoax-portfolio` repo to GitHub (`master` branch).
2. Repo **Settings → Pages → Build and deployment**: Source = **GitHub Actions**.
3. Workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) runs on push to `master`.

## Custom domain (whoax.com)

`public/CNAME` contains `whoax.com` and is copied to `out/` on build.

**DNS (Hostinger — retire WordPress):**

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<your-github-username>.github.io` |

Enable **Enforce HTTPS** in GitHub Pages settings after DNS propagates.

## Dev preview

```bash
npm run dev
```

Open http://localhost:3000