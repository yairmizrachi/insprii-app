'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

const stats = [
	{ value: '100+', label: 'on the waitlist' },
	{ value: '70%', label: 'of closet is unworn' },
	{ value: '$200+', label: 'wasted annually' },
];

export default function SocialProof() {
	return (
		<section className="overflow-hidden bg-secondary-container py-6">
			<motion.div
				className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 text-center md:flex-row md:gap-4 md:text-left"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}>
				<motion.span
					variants={itemVariants}
					className="text-[0.625rem] font-bold uppercase tracking-[0.15em] text-secondary-container-foreground/70 md:text-[0.6875rem]">
					As seen by people tired of wasting money
				</motion.span>
				<div className="flex gap-12 md:gap-20">
					{stats.map((stat) => (
						<motion.div key={stat.label} variants={itemVariants}>
							<span className="block font-headline text-3xl leading-none text-primary">{stat.value}</span>
							<span className="text-[10px] font-bold uppercase tracking-widest text-secondary-container-foreground/60">{stat.label}</span>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}
