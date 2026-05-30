import 'server-only'

import { cache } from 'react'
import { headers } from 'next/headers'
import { nextCookies } from 'better-auth/next-js'

import { initAuth } from '@repo/auth'
import { sendMagicLinkEmail } from '@repo/email'

import { env } from '~/env'

const baseUrl =
	env.VERCEL_ENV === 'production'
		? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
		: env.VERCEL_ENV === 'preview'
			? `https://${env.VERCEL_URL}`
			: 'http://localhost:3000'

console.log('Auth base URL:', baseUrl)
console.log('Auth production URL:', `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? 'insprii.app'}`)

//const productionUrl = `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? 'insprii.app'}`
const productionUrl = 'https://insprii-app-nextjs-git-boilerplate-aiotexs-projects.vercel.app'

export const auth = initAuth({
	baseUrl,
	productionUrl: productionUrl,
	secret: env.AUTH_SECRET,
	googleClientId: env.GOOGLE_CLIENT_ID,
	googleClientSecret: env.GOOGLE_CLIENT_SECRET,
	sendMagicLink: ({ email, url }) =>
		sendMagicLinkEmail({
			to: email,
			url,
			appName: env.NEXT_PUBLIC_SITE_NAME ?? 'Insprii',
		}),
	extraPlugins: [nextCookies()],
})

export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }))
