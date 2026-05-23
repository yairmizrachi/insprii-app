'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@repo/ui/button'
import { Field, FieldContent, FieldLabel } from '@repo/ui/field'
import { Input } from '@repo/ui/input'
import { toast } from '@repo/ui/toast'

import { useTRPC } from '~/trpc/react'

export function WaitlistSection() {
	const trpc = useTRPC()
	const [email, setEmail] = useState('')

	const join = useMutation(
		trpc.waitlist.join.mutationOptions({
			onSuccess: () => {
				setEmail('')
				toast.success('You are on the list. Check your inbox.')
			},
			onError: (err) => {
				if (err.data?.code === 'TOO_MANY_REQUESTS') toast.error('Too many requests. Try again in a minute.')
				else if (err.data?.code === 'CONFLICT') toast.info("You're already on the list.")
				else toast.error('Something went wrong. Please try again.')
			},
		}),
	)

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		if (!email || join.isPending) return
		join.mutate({ email })
	}

	return (
		<section id="waitlist" className="bg-muted/40 px-6 py-24">
			<div className="mx-auto max-w-md text-center">
				<h2 className="text-foreground text-3xl font-semibold tracking-tight">Get early access</h2>
				<p className="text-muted-foreground mt-3 text-sm">Drop your email and we'll let you know when we launch.</p>
				<form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
					<Field className="flex-1">
						<FieldContent>
							<FieldLabel htmlFor="waitlist-email" className="sr-only">
								Email
							</FieldLabel>
						</FieldContent>
						<Input
							id="waitlist-email"
							type="email"
							required
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={join.isPending}
						/>
					</Field>
					<Button type="submit" disabled={join.isPending}>
						{join.isPending ? 'Joining…' : 'Join'}
					</Button>
				</form>
			</div>
		</section>
	)
}
