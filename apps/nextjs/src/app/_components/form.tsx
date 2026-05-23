'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useMutation } from '@tanstack/react-query'

import { containerVariants, itemVariants } from '@repo/ui/animation-variants'
import { EnhancedButton } from '@repo/ui/enhanced-button'
import { toast } from '@repo/ui/toast'

import { useTRPC } from '~/trpc/react'

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export default function Form() {
	const trpc = useTRPC()
	const [email, setEmail] = useState('')

	const join = useMutation(
		trpc.waitlist.join.mutationOptions({
			onSuccess: () => {
				setEmail('')
				toast.success('Thank you for joining the waitlist! 🎉')
			},
			onError: (err) => {
				if (err.data?.code === 'TOO_MANY_REQUESTS') toast.error("You're doing that too much. Please try again later.")
				else if (err.data?.code === 'CONFLICT') toast.error("You're already on the waitlist!")
				else toast.error('Something went wrong. Please try again.')
			},
		}),
	)

	const submit = () => {
		if (!email) {
			toast.error('Please enter your email.')
			return
		}
		if (!isValidEmail(email)) {
			toast.error('Please enter a valid email address.')
			return
		}
		join.mutate({ email })
	}

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			submit()
		}
	}

	return (
		<motion.div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:flex-row" variants={containerVariants} initial="hidden" animate="visible">
			<motion.div variants={itemVariants} className="w-full">
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onKeyDown={onKeyDown}
					disabled={join.isPending}
					className="font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:border-secondary-container flex h-12 w-full rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</motion.div>
			<motion.div variants={itemVariants}>
				<EnhancedButton
					variant="expandIcon"
					Icon={FaArrowRightLong}
					iconPlacement="right"
					onClick={submit}
					disabled={join.isPending}
					className="bg-secondary-container text-primary hover:bg-secondary-container/80 h-12 w-full whitespace-nowrap text-[0.75rem] font-bold tracking-widest uppercase sm:w-[180px]"
				>
					{join.isPending ? 'Loading...' : 'Join Waitlist'}
				</EnhancedButton>
			</motion.div>
		</motion.div>
	)
}
