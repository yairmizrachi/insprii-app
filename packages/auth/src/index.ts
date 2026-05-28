import type { BetterAuthOptions, BetterAuthPlugin } from 'better-auth'
import { expo } from '@better-auth/expo'
import { db } from '@repo/db/client'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { createAuthMiddleware } from 'better-auth/api'
import { oAuthProxy } from 'better-auth/plugins'

// Works around better-auth #5073: on the production proxy instance, oAuthProxy fails to set
// skipStateCookieCheck for proxied callbacks (because productionURL === baseURL there), so the
// callback requires a state cookie that only ever existed on the originating localhost/preview
// domain -> state_mismatch. The state is still validated against the shared DB record + PKCE
// code_verifier, so we drop only the cookie cross-check, and only for callbacks that arrive
// without a state cookie (i.e. proxied ones). Direct production logins keep the CSRF check.
const oAuthProxyStateFix = {
	id: 'oauth-proxy-state-fix',
	hooks: {
		before: [
			{
				matcher(context) {
					return context.path?.startsWith('/callback') || context.path?.startsWith('/oauth2/callback')
				},
				handler: createAuthMiddleware(async (ctx) => {
					const stateCookie = ctx.context.createAuthCookie('state')
					const stateCookieValue = await ctx.getSignedCookie(stateCookie.name, ctx.context.secret)
					if (stateCookieValue) return
					return {
						context: {
							context: {
								oauthConfig: { skipStateCookieCheck: true },
							},
						},
					}
				}),
			},
		],
	},
} satisfies BetterAuthPlugin

export function initAuth<TExtraPlugins extends BetterAuthPlugin[] = []>(options: {
	baseUrl: string
	productionUrl: string
	secret: string | undefined

	googleClientId: string
	googleClientSecret: string

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
				productionURL: options.productionUrl,
			}),
			oAuthProxyStateFix,
			expo(),
			...(options.extraPlugins ?? []),
		],
		socialProviders: {
			google: {
				clientId: options.googleClientId,
				clientSecret: options.googleClientSecret,
				redirectURI: `${options.productionUrl}/api/auth/callback/google`,
			},
		},
		trustedOrigins: ['myapp://', 'http://localhost:3000'],
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
