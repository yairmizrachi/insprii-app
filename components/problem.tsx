'use client';

import { motion } from 'framer-motion';
import { H2, Label } from '@/components/ui/typography';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

const painPoints = [
	"The $80 dress you've worn exactly once.",
	"That top that only works with jeans you don't own.",
	'The "I\'ll style it later" purchase sitting for 8 months.',
];

export default function Problem() {
	return (
		<section className="overflow-hidden bg-primary py-24 md:py-32">
			<motion.div
				className="mx-auto grid max-w-7xl items-center gap-16 px-8 md:grid-cols-2 md:gap-20"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}>
				<div>
					<Label className="mb-4 block text-secondary-container">Sound familiar?</Label>

					<H2 className="mb-8 text-primary-foreground">You save hundreds of outfits, But still have nothing to wear.</H2>

					<motion.p variants={itemVariants} className="mb-12 text-lg leading-relaxed text-[#8A8A8A]">
						You spend hours on Pinterest. You screenshot looks on Instagram. But when it's time to actually shop you're overwelmed with options,
						buying things that dont fit you astectic and get worn once
					</motion.p>

					<ul className="space-y-6">
						{painPoints.map((point) => (
							<motion.li key={point} variants={itemVariants} className="flex items-center gap-4">
								<span className="text-lg text-secondary-container">✕</span>
								<span className="text-sm text-primary-foreground/80">{point}</span>
							</motion.li>
						))}
					</ul>
				</div>

				<motion.div variants={itemVariants} className="relative">
					<div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#2A2A2A] p-8">
						<div className="group relative h-full w-full overflow-hidden rounded-xl">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								alt="Chaotic messy closet"
								className="h-full w-full object-cover brightness-75 grayscale transition-transform duration-1000 group-hover:scale-105"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjtJIiN57zZXt_b5fZdvrz4y8LbTC09uGwisflzOzEfWw2crYg4NdyIsjKeRUG0_3ooHZOPj2A4DWCqKp63fqAwafd0JpZxB-oNXo8N5wKNY2f1mdoMiEqQTPDf0IJ7lGSdGw7U6FPhYXCcnmDjr_ew5tDIFjCqzA0Y-4RNx42oP1pRZDo4Y5WvABD67qe_HTRT_KxwO1neOAtVnDUTIDX4ygcPpClFORnZXzipTlMgwED0D8WBaK0P0wS83Y68Y3g9fopP8ENNfO6"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
