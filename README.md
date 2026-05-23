# Monorepo Boilerplate

A pnpm + Turborepo workspace with:

- **`apps/nextjs`** — Next.js 16 (React 19) landing page + tRPC server. Deploy this to Vercel.
- **`apps/expo`** — Expo / React Native client.
- **`packages/api`** — tRPC routers, waitlist mutation, transactional email.
- **`packages/auth`** — Better Auth with the OAuth proxy plugin and the Expo adapter.
- **`packages/db`** — Drizzle ORM + Postgres (Supabase transaction pooler).
- **`packages/ui`** — shadcn-radix shared components.
- **`packages/validators`** — Zod schemas shared by client and server.

See [`AGENTS.md`](./AGENTS.md) for project conventions when working with AI agents.

## Quick start

```bash
pnpm install
cp .env.example .env       # fill in POSTGRES_URL + AUTH_SECRET at minimum
pnpm db:push               # apply Drizzle schema (creates `waitlist` + auth tables)
pnpm auth:generate         # regenerate packages/db/src/auth-schema.ts from Better Auth config
pnpm dev:next              # next dev on http://localhost:3000
```

> **Database connection.** `POSTGRES_URL` should use Supabase's transaction pooler (port `6543`), not the direct connection. This matches better-auth + drizzle's serverless usage on Vercel. The `?workaround=supabase-pooler.vercel` query string is required.

> **Adding a UI component.** `pnpm ui-add` (interactive shadcn CLI). Components land in `packages/ui/src/`.

> **Adding a package.** `pnpm turbo gen init` and follow the prompts.

> **Node version.** The workspace declares `node ^22.21.0`. `pnpm lint` uses `--flag unstable_native_nodejs_ts_config` which requires that or newer. `pnpm typecheck` works on earlier 22.x.

## Customize the boilerplate

Everything below is what you swap to take this from a generic template to your branded app. Most rows take under a minute.

| What                                | Where                                                                                                 | Notes                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App name, URL, description (web)    | `.env`: `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_DESCRIPTION`               | Used by `<title>`, OG metadata, Hero, Footer, welcome email.                                                                                                           |
| App name, slug, scheme (expo)       | `apps/expo/app.config.ts`                                                                             | `name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package`. Bundle id must be a real reverse-DNS like `com.yourcompany.yourapp`.                              |
| Color palette + radius              | `tooling/tailwind/theme.css`                                                                          | OKLCH tokens. `--background`, `--foreground`, `--primary`, etc. + dark-mode block. Both apps consume this through `@repo/tailwind-config/theme`.                       |
| Fonts (web)                         | `apps/nextjs/src/app/layout.tsx`                                                                      | Swap `Geist` / `Geist_Mono` for any `next/font/google`. Update CSS variable names if you rename.                                                                       |
| Favicons + PWA + Expo app icon      | `pnpm -F @repo/nextjs generate:favicon <source.png>`                                                  | Source: square PNG, ≥1024×1024, transparent background. Writes `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png`, and the Expo app icons. |
| OG + Twitter cards                  | `pnpm -F @repo/nextjs generate:og <source.png>`                                                       | Source: 1600×900 or larger. Writes `opengraph-image.png` (1280×832) and `twitter-image.png` (1200×675).                                                                |
| BIMI logo (email)                   | `pnpm -F @repo/nextjs generate:bimi <source.svg> "<Brand>"`                                           | Wraps your SVG in a BIMI-compliant root. You still need a VMC and a DNS TXT record (script prints the instructions).                                                   |
| Welcome email copy                  | `packages/api/src/emails/welcome.tsx`                                                                 | All visible copy is env-driven (`NEXT_PUBLIC_SITE_NAME`, `EMAIL_REPLY_TO`); only edit the file for layout/style changes.                                               |
| Email logo                          | `.env`: `EMAIL_LOGO_URL`                                                                              | Hosted absolute URL (e.g. `https://yourdomain.com/logo.png`).                                                                                                          |
| Resend (transactional email)        | `.env`: `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`, `EMAIL_SUBJECT`          | Leave `RESEND_API_KEY` blank to skip email sending. Verify your sending domain in [Resend](https://resend.com).                                                        |
| Upstash (waitlist rate limit)       | `.env`: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                                          | Sliding window: 2 requests / minute per IP. Skipped if either var is empty.                                                                                            |
| Google OAuth                        | `.env`: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`                                                    | Console → Credentials. Add `https://yourdomain.com/api/auth/callback/google` (prod) and `http://localhost:3000/api/auth/callback/google` (dev) as authorized URIs.     |
| OAuth proxy production URL         | `apps/nextjs/src/auth/server.ts`                                                                      | `productionUrl` passed to `initAuth`. Must match your deployed Vercel domain so the Expo app can OAuth in dev.                                                         |
| Trusted origins (expo deep links)   | `packages/auth/src/index.ts`                                                                          | `trustedOrigins: ['yourapp://']` → use your real expo `scheme` from `app.config.ts`.                                                                                   |
| Google sign-in on iOS               | `apps/expo/app.config.ts` `iosUrlScheme`                                                              | Reversed iOS client ID from GoogleService-Info.plist.                                                                                                                  |
| EAS project ID                      | `.env`: `EAS_PROJECT_ID` (consumed by `apps/expo/app.config.ts`)                                      | Get from EAS dashboard after `eas init`.                                                                                                                               |
| Package scope (`@repo/*`)           | Already set. To rename, sweep `@repo/` across the tree, then `pnpm install`.                          | Update `tooling/prettier/index.js` `importOrder` if you change the scope.                                                                                              |
| Social links (footer)               | Add `NEXT_PUBLIC_TWITTER_URL`, `NEXT_PUBLIC_GITHUB_URL` etc. to `.env` and read them in `Footer.tsx`. | Optional — the boilerplate footer is minimal; extend as needed.                                                                                                        |

After a customize pass, run `pnpm typecheck` to catch any breakage from renames.

## Deploying

### Web (Vercel)

1. New project → root directory `apps/nextjs`.
2. Add env vars from `.env.example` (at minimum `POSTGRES_URL`, `AUTH_SECRET`, `GOOGLE_CLIENT_*`).
3. Assign your domain.

### Auth proxy

The better-auth OAuth proxy is enabled out of the box. Your deployed Next.js URL is what the Expo app uses for OAuth in dev, preview, and TestFlight. Make sure `productionUrl` in `apps/nextjs/src/auth/server.ts` matches the prod domain.

### Mobile (EAS)

```bash
pnpm add -g eas-cli
eas login
cd apps/expo && eas build:configure
eas build --platform ios --profile production
eas submit --platform ios --latest
```

OTA updates: `eas update --auto` from `apps/expo`.

## Architecture notes

- The `api` package is a production dep of `apps/nextjs` and a **dev** dep of `apps/expo`. This keeps backend code out of the mobile bundle while preserving full type inference.
- The waitlist flow is a single `trpc.waitlist.join` mutation. It rate-limits via Upstash (if configured), inserts via Drizzle, then sends the welcome email via Resend (also if configured). Missing env vars don't crash — they skip steps.
- `packages/auth/script/auth-cli.ts` is a CLI-only Better Auth config used to generate the Drizzle schema (`packages/db/src/auth-schema.ts`). Don't import it at runtime; runtime uses `packages/auth/src/index.ts`.
