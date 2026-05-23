import { env } from '~/env'

const siteName = env.NEXT_PUBLIC_SITE_NAME ?? 'Your App'

export function Footer() {
	return (
		<footer className="border-border/40 border-t px-6 py-10">
			<div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
				<span className="text-muted-foreground text-sm">
					&copy; {new Date().getFullYear()} {siteName}
				</span>
				<span className="text-muted-foreground text-xs">
					Built on the{' '}
					<a href="https://github.com" className="hover:text-foreground underline">
						monorepo boilerplate
					</a>
				</span>
			</div>
		</footer>
	)
}
