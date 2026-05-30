import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod/v4'

export function emailEnv() {
	return createEnv({
		server: {
			RESEND_API_KEY: z.string().min(1),
			RESEND_EMAIL_FROM: z.email().optional(),
		},
		runtimeEnv: process.env,
		skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
	})
}
