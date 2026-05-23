import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { cn } from '@repo/ui'
import { ThemeProvider } from '@repo/ui/theme'
import { Toaster } from '@repo/ui/toast'

import { env } from '~/env'
import { TRPCReactProvider } from '~/trpc/react'

import '~/app/styles.css'

const siteName = env.NEXT_PUBLIC_SITE_NAME ?? 'Your App'
const siteDescription = env.NEXT_PUBLIC_SITE_DESCRIPTION ?? 'Build something great.'
const siteUrl = env.NEXT_PUBLIC_SITE_URL ?? (env.VERCEL_ENV === 'production' ? 'https://example.com' : 'http://localhost:3000')

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: siteName,
	description: siteDescription,
	openGraph: {
		title: siteName,
		description: siteDescription,
		url: siteUrl,
		siteName,
	},
	twitter: {
		card: 'summary_large_image',
	},
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
}

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono',
})

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('bg-background text-foreground min-h-screen font-sans antialiased', geistSans.variable, geistMono.variable)}>
				<ThemeProvider>
					<TRPCReactProvider>{props.children}</TRPCReactProvider>
					<Toaster richColors position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	)
}
