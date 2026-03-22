'use client';

import { motion } from 'framer-motion';
import { H2 } from '@/components/ui/typography';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

const steps = [
	{
		number: '1',
		title: 'Save your Inspo',
		description: 'Share any look from Instagram, Pinterest, or your camera roll.',
	},
	{
		number: '2',
		title: 'See your Style',
		description: 'We find the patterns across everything you save.',
	},
	{
		number: '3',
		title: 'Shop Smarter',
		description: "Every new purchase gets checked against your style — so you only buy things you'll actually wear.",
	},
];

function StepCard({ step }: { step: (typeof steps)[number] }) {
	return (
		<motion.div className="flex flex-col" variants={itemVariants}>
			<div className="relative mb-8 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-card bg-card p-6 shadow-ui-card">
				<span className="font-headline text-7xl text-tertiary/30">{step.number}</span>
			</div>
			<div className="space-y-3">
				<span className="font-headline text-4xl leading-none text-tertiary">{step.number}</span>
				<h4 className="text-sm font-bold uppercase tracking-widest text-primary">{step.title}</h4>
				<p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
			</div>
		</motion.div>
	);
}

export default function HowItWorks() {
	return (
		<section className="bg-muted py-24">
			<motion.div className="mx-auto max-w-6xl px-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
				<H2 className="mb-16 text-center">How it works</H2>
				<div className="grid gap-8 md:grid-cols-3">
					{steps.map((step) => (
						<StepCard key={step.number} step={step} />
					))}
				</div>
			</motion.div>
		</section>
	);
}
