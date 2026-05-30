import type { BetterAuthOptions, BetterAuthPlugin } from 'better-auth'
import { expo } from '@better-auth/expo'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink, oAuthProxy } from 'better-auth/plugins'

import { db } from '@repo/db/client'

export interface SendMagicLinkArgs {
	email: string
	url: string
	token: string
}

export function initAuth<TExtraPlugins extends BetterAuthPlugin[] = []>(options: {
	baseUrl: string
	productionUrl: string
	secret: string | undefined

	googleClientId: string
	googleClientSecret: string

	sendMagicLink: (args: SendMagicLinkArgs) => Promise<void>

	extraPlugins?: TExtraPlugins
}) {
	const config = {
		database: drizzleAdapter(db, {
			provider: 'pg',
		}),
		baseURL: options.baseUrl,
		secret: options.secret,
		plugins: [
			oAuthProxy({
				currentURL: options.baseUrl,
				productionURL: options.productionUrl,
			}),
			magicLink({
				sendMagicLink: async ({ email, token, url }) => {
					await options.sendMagicLink({ email, token, url })
				},
			}),
			expo(),
			...(options.extraPlugins ?? []),
		],
		socialProviders: {
			google: {
				clientId: options.googleClientId,
				clientSecret: options.googleClientSecret,
			},
		},
		trustedOrigins: ['expo://', 'http://localhost:3000', 'https://insprii-app-nextjs-*-aiotexs-projects.vercel.app'], // TODO: check if we ned all values here
		onAPIError: {
			onError(error, ctx) {
				console.error('BETTER AUTH API ERROR', error, ctx)
			},
		},
	} satisfies BetterAuthOptions

	return betterAuth(config)
}

export type Auth = ReturnType<typeof initAuth>
export type Session = Auth['$Infer']['Session']
