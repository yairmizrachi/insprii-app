'use client'

import { motion } from 'framer-motion'

import { containerVariants, itemVariants } from '@repo/ui/animation-variants'
import { H1, Lead } from '@repo/ui/typography'

import Form from './form'

export default function CTA() {
	return (
		<section id="waitlist" className="bg-primary relative overflow-hidden px-6 py-24 sm:px-8 md:py-32">
			<div className="pointer-events-none absolute inset-0 opacity-10">
				<div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_center,var(--secondary-container)_0%,transparent_70%)]" />
			</div>
			<motion.div
				className="relative z-10 mx-auto max-w-4xl text-center"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<H1 className="text-primary-foreground mb-8">
					Stop guessing.
					<br />
					Start actually dressing.
				</H1>
				<Lead className="mx-auto mb-12 max-w-xl text-[#8A8A8A]">
					Join the waitlist for the iOS beta. Get notified when we launch, and receive early access to new features.
				</Lead>
				<motion.div variants={itemVariants}>
					<Form />
				</motion.div>
			</motion.div>
		</section>
	)
}
