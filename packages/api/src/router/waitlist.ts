import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { JoinWaitlistSchema, Waitlist } from '@repo/db/schema'

import { publicProcedure } from '../trpc'

export const waitlistRouter = {
	join: publicProcedure.input(JoinWaitlistSchema).mutation(async ({ ctx, input }) => {
		const inserted = await ctx.db
			.insert(Waitlist)
			.values({ email: input.email })
			.onConflictDoNothing({ target: Waitlist.email })
			.returning({ id: Waitlist.id })

		if (inserted.length === 0) {
			throw new TRPCError({ code: 'CONFLICT', message: 'Already joined' })
		}

		return { ok: true as const }
	}),
} satisfies TRPCRouterRecord
