import { pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod/v4'

export const Waitlist = pgTable('waitlist', (t) => ({
	id: t.uuid().notNull().primaryKey().defaultRandom(),
	email: t.varchar({ length: 320 }).notNull().unique(),
	createdAt: t.timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
}))

export const JoinWaitlistSchema = createInsertSchema(Waitlist, {
	email: z.email().max(320),
}).pick({ email: true })

export * from './auth-schema'
