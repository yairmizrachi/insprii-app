'use client';

import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Form from '@/components/form';
import { H1, Lead } from '@/components/ui/typography';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

interface CTAProps {
	email: string;
	handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	loading: boolean;
}

export default function CTA({ email, handleEmailChange, handleSubmit, loading }: CTAProps) {
	return (
		<section id="waitlist" className="relative overflow-hidden bg-primary px-6 py-24 sm:px-8 md:py-32">
			<div className="pointer-events-none absolute inset-0 opacity-10">
				<div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,hsl(var(--secondary-container))_0%,transparent_70%)]" />
			</div>
			<motion.div
				className="relative z-10 mx-auto max-w-4xl text-center"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}>
				<H1 className="mb-8 text-primary-foreground">
					Stop guessing.
					<br />
					Start actually dressing.
				</H1>
				<Lead className="mx-auto mb-12 max-w-xl text-[#8A8A8A]">
					Join the waitlist for the iOS beta. Get notified when we launch, and receive early access to new features.
				</Lead>
				<motion.div variants={itemVariants}>
					<Form email={email} handleEmailChange={handleEmailChange} handleSubmit={handleSubmit} loading={loading} />
				</motion.div>
			</motion.div>
		</section>
	);
}
