# Insprii

Live monorepo for **[insprii.app](https://insprii.app)** — the landing page (`apps/nextjs`), the iOS app (`apps/expo`), and the shared backend (`packages/*`).

The clean, white-labeled boilerplate this is built on is maintained on the [`boilerplate`](https://github.com/yairmizrachi/insprii-app/tree/boilerplate) branch. Periodically:

```bash
git checkout main
git merge boilerplate          # pull in upstream improvements
# resolve conflicts in: tooling/tailwind/theme.css, apps/nextjs/src/app/_components/*,
#                       apps/nextjs/src/app/page.tsx, apps/nextjs/src/app/layout.tsx,
#                       apps/nextjs/public/*, apps/expo/app.config.ts, .env.example, README.md
```

These are the only files expected to differ between branches.

The previous standalone Next 14 landing page is preserved as the [`landing-page-v1.5.0`](https://github.com/yairmizrachi/insprii-app/releases/tag/landing-page-v1.5.0) tag.

## Quick start

```bash
pnpm install
cp .env.example .env       # fill in POSTGRES_URL, AUTH_SECRET, GOOGLE_CLIENT_*
pnpm db:push
pnpm auth:generate
pnpm dev:next              # http://localhost:3000
```

See `AGENTS.md` for project conventions and the [boilerplate README](https://github.com/yairmizrachi/insprii-app/blob/boilerplate/README.md) for the full setup + customize guide.

## Insprii-specific

- **Deploy target:** Vercel project pointed at `apps/nextjs`, domain `insprii.app`. This is what the better-auth OAuth proxy uses for the Expo app in dev + TestFlight.
- **Expo app:** `slug: 'insprii'`, scheme `insprii://`, bundle id `app.insprii.app`, EAS project `2077f102-...`.
- **Trusted auth origins:** `insprii://` (in `packages/auth/src/index.ts`).
- **Fonts:** Inter (body) + Noto Serif (headlines), wired through `--font-sans` / `--font-serif` in `apps/nextjs/src/app/layout.tsx`.
- **Theme:** warm cream HSL palette in `tooling/tailwind/theme.css`.
- **Analytics:** Vercel Analytics + Facebook Pixel (set `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`).
- **Waitlist email:** Resend + Upstash rate-limit, wired through `trpc.waitlist.join`. Configure with `RESEND_API_KEY`, `EMAIL_*`, `UPSTASH_REDIS_REST_*`.
