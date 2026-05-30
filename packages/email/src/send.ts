import { render } from '@react-email/render'

import { fromAddress, resend } from './client'
import { MagicLinkEmail } from './templates/magic-link'

export async function sendMagicLinkEmail({ to, url, appName, logoUrl }: { to: string; url: string; appName: string; logoUrl?: string }) {
	const { error } = await resend.emails.send({
		from: fromAddress(appName),
		to: [to],
		subject: `Sign in to ${appName}`,
		html: await render(MagicLinkEmail({ url, appName, logoUrl })),
	})

	if (error) {
		throw new Error(`Failed to send magic link email: ${error.name} - ${error.message}`)
	}
}
