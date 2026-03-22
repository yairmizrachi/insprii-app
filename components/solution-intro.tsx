'use client';

import { motion } from 'framer-motion';
import { H2, Lead } from '@/components/ui/typography';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

export default function SolutionIntro() {
	return (
		<section className="bg-background px-6 py-24 text-center">
			<motion.div className="mx-auto max-w-3xl" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
				<motion.span variants={itemVariants} className="mb-4 block font-headline text-lg italic text-secondary">
					Introducing Insprii
				</motion.span>
				<H2 className="mb-6">Your inspo, finally working for you.</H2>
				<Lead>Save looks from anywhere. We figure out what they have in common. You finally understand your own style and shop with confidence.</Lead>
			</motion.div>
		</section>
	);
}
