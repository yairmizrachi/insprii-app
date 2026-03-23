'use client';

import { motion } from 'framer-motion';
import { H2 } from '@/components/ui/typography';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

const steps = [
	{
		number: '1',
		title: 'Save Your Inspo',
		description: 'Share any look from Instagram, Pinterest, or your camera roll.',
	},
	{
		number: '2',
		title: 'See Your Style',
		description: 'We find the patterns across everything you save.',
	},
	{
		number: '3',
		title: 'Shop Smarter',
		description: "Every new purchase gets checked against your style, so you only buy things you'll actually wear.",
	},
];

function StepCardSave() {
	return (
		<div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-card bg-card shadow-ui-card">
			<div className="pointer-events-none h-full w-full origin-top-left scale-50 p-4" style={{ width: '200%', height: '200%' }}>
				<div className="mb-4 flex items-center gap-2">
					<div className="h-8 w-8 rounded-full bg-surface-container-high" />
					<div className="h-4 w-32 rounded bg-muted" />
				</div>
				<div className="absolute inset-x-0 bottom-0 translate-y-4 rounded-t-3xl border-t border-foreground/5 bg-card/95 p-6 shadow-ambient backdrop-blur-xl">
					<div className="mx-auto mb-8 h-1 w-12 rounded-full bg-surface-container-high" />
					<div className="flex gap-6">
						<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
							<span className="text-3xl text-primary-foreground">↗</span>
						</div>
						<div className="h-14 w-14 rounded-2xl bg-surface-container-high" />
						<div className="h-14 w-14 rounded-2xl bg-surface-container-high" />
					</div>
				</div>
			</div>
		</div>
	);
}

function StepCardDiscover() {
	return (
		<div className="relative mb-8 flex aspect-[16/9] flex-col justify-center overflow-hidden rounded-card bg-card p-6 shadow-ui-card">
			<div className="mb-4 flex gap-2">
				<div className="h-8 w-8 rounded-lg bg-[#51452D]" />
				<div className="h-8 w-8 rounded-lg bg-secondary-container" />
				<div className="h-8 w-8 rounded-lg bg-muted" />
				<div className="h-8 w-8 rounded-lg bg-tertiary" />
			</div>
			<div className="flex gap-2">
				<div className="rounded-full bg-accent px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-muted-foreground">Linen</div>
				<div className="rounded-full bg-secondary-container px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-secondary-container-foreground">
					Muted Tones
				</div>
			</div>
		</div>
	);
}

function StepCardShop() {
	return (
		<div className="relative mb-8 flex aspect-[16/9] items-center gap-4 overflow-hidden rounded-card bg-card p-5 shadow-ui-card">
			<div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					alt="Product"
					className="warm-grade h-full w-full object-cover"
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuAocWJj6SogeBL6rLULto2zA1G7yKrgfWn03veo30EtZ3aPbB1iO-omoMKcZn0l25c-xUb73bmyuFB_srFwC9T1ThqtEACMeWYIILOAwhwwCTevD9I4z5T6VOWvtheWSRs2SfTUXBq78FH1Hkv51KQmZz7Cmj_GYIepNGNdSnQSlvX-1XCym6EZ5wwcZWwK5AEhQifRXW8Ml1Cx6AuRX01AdJ-TVc4zEkwEDRpuZhcQFHjl_IqecLl9yoN3K87IL3NgjkwXdZb60iO2"
				/>
			</div>
			<div className="flex-1 space-y-2">
				<p className="text-[10px] font-bold text-primary">94% Match</p>
				<div className="h-1.5 w-full overflow-hidden rounded-full bg-accent">
					<div className="h-full w-[94%] bg-secondary-container" />
				</div>
				<span className="inline-flex items-center gap-1 rounded-full border border-green-100 bg-green-50 px-2 py-1 text-[7px] font-bold uppercase text-green-800">
					✓ Verified DNA
				</span>
			</div>
		</div>
	);
}

const cardComponents = [StepCardSave, StepCardDiscover, StepCardShop];

export default function HowItWorks() {
	return (
		<section className="bg-muted py-24">
			<motion.div className="mx-auto max-w-6xl px-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
				<H2 className="mb-16 text-center">How it works</H2>
				<div className="grid gap-8 md:grid-cols-3">
					{steps.map((step, i) => {
						const CardPreview = cardComponents[i];
						return (
							<motion.div key={step.number} className="flex flex-col" variants={itemVariants}>
								<CardPreview />
								<div className="space-y-3">
									<span className="font-headline text-4xl leading-none text-tertiary">{step.number}</span>
									<h4 className="text-sm font-bold uppercase tracking-widest text-primary">{step.title}</h4>
									<p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>
		</section>
	);
}
