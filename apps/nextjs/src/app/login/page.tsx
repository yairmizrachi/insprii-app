import { GoogleButton } from './_components/google-button'
import { MagicLinkForm } from './_components/magic-link-form'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ sent?: string }> }) {
	const { sent } = await searchParams

	return (
		<main className="bg-background flex min-h-screen items-center justify-center px-4">
			<div className="w-full max-w-sm space-y-6">
				<div className="space-y-1 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
					<p className="text-muted-foreground text-sm">Choose a method to continue</p>
				</div>

				<GoogleButton />

				<div className="text-muted-foreground flex items-center gap-3 text-xs">
					<div className="bg-border h-px flex-1" />
					or
					<div className="bg-border h-px flex-1" />
				</div>

				<MagicLinkForm sent={sent} />
			</div>
		</main>
	)
}
