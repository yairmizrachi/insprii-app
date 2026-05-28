import 'server-only'

import { cache } from 'react'
import { headers } from 'next/headers'
import { initAuth } from '@repo/auth'
import { nextCookies } from 'better-auth/next-js'

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
const productionUrl = `https://insprii-app-nextjs-git-boilerplate-aiotexs-projects.vercel.app`

export const auth = initAuth({
	baseUrl,
	productionUrl: `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? 'insprii.app'}`,
	secret: env.AUTH_SECRET,
	googleClientId: env.GOOGLE_CLIENT_ID,
	googleClientSecret: env.GOOGLE_CLIENT_SECRET,
	extraPlugins: [nextCookies()],
})

export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }))
