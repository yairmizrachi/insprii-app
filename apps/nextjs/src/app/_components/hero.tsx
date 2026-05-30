import { Button } from '@repo/ui/button'

import { env } from '~/env'

const siteName = env.NEXT_PUBLIC_SITE_NAME ?? 'Your App'
const siteDescription = env.NEXT_PUBLIC_SITE_DESCRIPTION ?? 'A short, compelling description of what you are building.'

export function Hero() {
	return (
		<section className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-32 pb-24 text-center">
			<h1 className="text-foreground text-5xl font-bold tracking-tight sm:text-6xl">{siteName}</h1>
			<p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">{siteDescription}</p>
			<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
				<Button size="lg" asChild>
					<a href="#waitlist">Join the waitlist</a>
				</Button>
				<Button size="lg" variant="outline" asChild>
					<a href="/login">Sign in</a>
				</Button>
			</div>
		</section>
	)
}
