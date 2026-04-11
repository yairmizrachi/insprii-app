# Guidelines for working on the project

- Create mobile first pages
- Devide designs into dumb components for easier readabilty and a single source of truth

# Before You Go To Production

Reference for external services and tutorials: [docs/external-setup.md](docs/external-setup.md)

## Production Checklist

- [ ] Set required env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- [ ] Set waitlist table env var (or keep default): `SUPABASE_TABLE`
- [ ] Set SEO env vars: `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_DESCRIPTION`, `NEXT_PUBLIC_SITE_URL`
- [ ] Add social images to `public/opengraph-image.png` and `public/twitter-image.png`
- [ ] Replace `public/logo.png` with your logo (1:1 ratio, at least 512x512)
- [ ] Generate logo SVG + favicons: `npm run generate:favicon`
- [ ] (Optional) Enable welcome emails by setting `RESEND_API_KEY`
- [ ] (Optional) Configure email sender vars: `EMAIL_FROM`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`, `EMAIL_SUBJECT`, `EMAIL_LOGO_URL`
- [ ] (Required when Resend is enabled) Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- [ ] (Optional) Configure social links: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_TWITTER_URL`, `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_REDDIT_URL`
- [ ] Install dependencies: `npm install`
- [ ] Run local checks: `npm run build`
- [ ] Deploy to hosting provider

## Template todo:

- [ ] create prompts for easy setup
- [ ] finish styling basic sections
