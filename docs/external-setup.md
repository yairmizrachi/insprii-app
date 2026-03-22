# External Setup Guides

This file contains setup tasks outside the app codebase.

## Supabase Setup

- Create project: https://supabase.com/dashboard
- Go to SQL Editor and create a waitlist table (example):

```sql
CREATE TABLE waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON waitlist
    FOR INSERT TO anon WITH CHECK (true);
```

- In Project Settings -> API, copy:
    - Project URL -> `NEXT_PUBLIC_SUPABASE_URL`
    - Publishable key -> `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Set table name env var if different from default:
    - `SUPABASE_TABLE`

## Resend Setup (Optional)

- Create account: https://resend.com
- Verify your sending domain.
- Create API key and set `RESEND_API_KEY`.
- Configure:
    - `EMAIL_FROM`
    - `EMAIL_FROM_NAME`
    - `EMAIL_REPLY_TO`

## Upstash Setup (Required if Resend is enabled)

- Create Redis database: https://upstash.com
- Copy REST URL and token:
    - `UPSTASH_REDIS_REST_URL`
    - `UPSTASH_REDIS_REST_TOKEN`

## Social Card Design

## Social Links (Optional)

- Set `NEXT_PUBLIC_CONTACT_EMAIL` for email contact link.
- Set `NEXT_PUBLIC_TWITTER_URL` for Twitter/X link.
- Set `NEXT_PUBLIC_GITHUB_URL` for GitHub link.
- Set `NEXT_PUBLIC_REDDIT_URL` for Reddit link.
