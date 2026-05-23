import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import { z } from 'zod/v4'

import { authEnv } from '@repo/auth/env'

export const env = createEnv({
	extends: [authEnv(), vercel()],
	shared: {
		NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	},
	/**
	 * Specify your server-side environment variables schema here.
	 * This way you can ensure the app isn't built with invalid env vars.
	 */
	server: {
		POSTGRES_URL: z.url(),
	},

	/**
	 * Specify your client-side environment variables schema here.
	 * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_SITE_NAME: z.string().optional(),
		NEXT_PUBLIC_SITE_URL: z.url().optional(),
		NEXT_PUBLIC_SITE_DESCRIPTION: z.string().optional(),
	},
	/**
	 * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
	 */
	experimental__runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
	},
	skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
})
