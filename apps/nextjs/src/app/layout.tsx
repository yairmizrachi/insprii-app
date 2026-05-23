import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Serif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { cn } from '@repo/ui'
import { ThemeProvider } from '@repo/ui/theme'
import { Toaster } from '@repo/ui/toast'

import { env } from '~/env'
import { TRPCReactProvider } from '~/trpc/react'

import '~/app/styles.css'

import FacebookPixel from './_components/facebook-pixel'
import Navbar from './_components/navbar'

const siteName = env.NEXT_PUBLIC_SITE_NAME ?? 'Insprii'
const siteDescription = env.NEXT_PUBLIC_SITE_DESCRIPTION ?? 'Stop buying clothes you never wear.'
const siteUrl = env.NEXT_PUBLIC_SITE_URL ?? (env.VERCEL_ENV === 'production' ? 'https://insprii.app' : 'http://localhost:3000')

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: siteName,
	description: siteDescription,
	openGraph: {
		title: siteName,
		description: siteDescription,
		url: siteUrl,
		siteName,
		images: [{ url: '/opengraph-image.png', width: 1280, height: 832, type: 'image/png' }],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteName,
		description: siteDescription,
		images: ['/twitter-image.png'],
	},
}

export const viewport: Viewport = {
	themeColor: [{ media: '(prefers-color-scheme: light)', color: 'white' }],
}

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const notoSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-serif' })

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<body
				className={cn(
					'bg-background text-foreground font-body selection:bg-secondary-container selection:text-secondary-container-foreground min-h-screen antialiased',
					inter.variable,
					notoSerif.variable,
				)}
			>
				<ThemeProvider>
					<TRPCReactProvider>
						<Navbar />
						{props.children}
					</TRPCReactProvider>
					<Toaster richColors position="top-center" />
				</ThemeProvider>
				<Analytics />
				<FacebookPixel />
			</body>
		</html>
	)
}
