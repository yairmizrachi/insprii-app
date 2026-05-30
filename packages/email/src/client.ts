import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY!)

export function fromAddress(appName: string): string {
	const from = process.env.RESEND_EMAIL_FROM ?? 'noreply@example.com'
	return `${appName} <${from}>`
}
