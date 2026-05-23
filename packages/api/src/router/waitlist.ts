import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { JoinWaitlistSchema, Waitlist } from '@repo/db/schema'

import { publicProcedure } from '../trpc'

export const waitlistRouter = {
	join: publicProcedure.input(JoinWaitlistSchema).mutation(async ({ ctx, input }) => {
		const ip = ctx.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ctx.headers.get('x-real-ip') || '127.0.0.1'

		if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
			const { Redis } = await import('@upstash/redis')
			const { Ratelimit } = await import('@upstash/ratelimit')
			const ratelimit = new Ratelimit({
				redis: new Redis({
					url: process.env.UPSTASH_REDIS_REST_URL,
					token: process.env.UPSTASH_REDIS_REST_TOKEN,
				}),
				limiter: Ratelimit.slidingWindow(2, '1 m'),
			})
			const { success } = await ratelimit.limit(`waitlist:${ip}`)
			if (!success) {
				throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'Too many requests' })
			}
		}

		const inserted = await ctx.db.insert(Waitlist).values({ email: input.email }).onConflictDoNothing({ target: Waitlist.email }).returning({ id: Waitlist.id })

		if (inserted.length === 0) {
			throw new TRPCError({ code: 'CONFLICT', message: 'Already joined' })
		}

		if (process.env.RESEND_API_KEY) {
			try {
				const { Resend } = await import('resend')
				const { render } = await import('@react-email/render')
				const { WelcomeEmail } = await import('../emails/welcome')

				const resend = new Resend(process.env.RESEND_API_KEY)
				const from = process.env.EMAIL_FROM ?? 'noreply@example.com'
				const fromName = process.env.EMAIL_FROM_NAME ?? process.env.NEXT_PUBLIC_SITE_NAME ?? 'Your App'
				const subject = process.env.EMAIL_SUBJECT ?? 'Thanks for joining the waitlist!'
				const replyTo = process.env.EMAIL_REPLY_TO

				await resend.emails.send({
					from: `${fromName} <${from}>`,
					to: [input.email],
					subject,
					...(replyTo ? { replyTo } : {}),
					html: await render(WelcomeEmail()),
				})
			} catch (err) {
				console.error('Failed to send welcome email', err)
			}
		}

		return { ok: true as const }
	}),
} satisfies TRPCRouterRecord
