import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'

import { auth } from '~/auth/server'

export function MagicLinkForm({ sent }: { sent?: string }) {
	if (sent) {
		return (
			<div className="bg-muted rounded-md px-4 py-3 text-center text-sm">
				Check your inbox, we sent a sign-in link to <strong>{sent}</strong>.
			</div>
		)
	}

	return (
		<form className="space-y-3">
			<Input name="email" type="email" placeholder="Email address" required />
			<Button
				type="submit"
				size="lg"
				className="w-full"
				formAction={async (formData) => {
					'use server'
					const email = formData.get('email') as string
					await auth.api.signInMagicLink({
						body: { email, callbackURL: '/' },
						headers: await headers(),
					})
					redirect(`/login?sent=${encodeURIComponent(email)}`)
				}}
			>
				Send magic link
			</Button>
		</form>
	)
}
