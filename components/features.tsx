'use client';

import { motion } from 'framer-motion';
import { H3, Label, P } from '@/components/ui/typography';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

function FeatureSave() {
	return (
		<div className="mx-auto grid max-w-7xl items-center gap-16 px-8 md:grid-cols-2 md:gap-20">
			{/* UI Card: Instagram post + share sheet */}
			<motion.div className="relative flex h-[480px] flex-col overflow-hidden rounded-card bg-card shadow-ui-card" variants={itemVariants}>
				{/* Simulated Instagram Post */}
				<div className="flex items-center gap-3 p-4">
					<div className="h-8 w-8 rounded-full bg-surface-container-high" />
					<p className="font-body text-[12px] font-bold text-primary">minimal.wardrobe</p>
					<span className="ml-auto text-lg text-muted-foreground">···</span>
				</div>
				<div className="aspect-square overflow-hidden bg-muted">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						alt="Camel blazer editorial"
						className="warm-grade h-full w-full object-cover"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQx6nWf63_dMKUH31pXnOUSvVtJVYSavEh9VRrBrGgEFjkVg2ascuf44seP9NVZ_XbjfkXBV6GkXrUKBKRRbnAkrMelvQKSqVpqxp_g2Z7WcO3yWAMU457RK8hDZJ87uxC04zcemvY-SieS8hCrwe8JOK9SCIsi1BxzIoCV7FaqXAy0Qr8uu04WpoA1TpF5eEoqoHr7CdnCWpw0AL6fSDXArSYmMgwwEvvZ4vkvr7sKCsRyjuRaJmh9K5IwIMFc_vr_wBKBeA-rh-K"
					/>
				</div>
				<div className="flex gap-4 p-4 text-xl text-primary">♡ 💬 ↗</div>

				{/* iOS Share Sheet Overlay */}
				<div className="glass absolute inset-x-0 bottom-0 translate-y-4 rounded-t-2xl p-5 shadow-ambient">
					<div className="mx-auto mb-6 h-1 w-9 rounded-full bg-surface-container-high" />
					<span className="mb-4 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Share to...</span>
					<div className="mb-6 flex gap-5">
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00D261] text-white shadow-sm">💬</div>
							<span className="text-[10px] font-medium text-muted-foreground">Messages</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg">↗</div>
							<span className="text-[10px] font-bold text-primary">Insprii</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D9BF0] text-white shadow-sm">@</div>
							<span className="text-[10px] font-medium text-muted-foreground">Mail</span>
						</div>
					</div>
					<div className="divide-y divide-foreground/5 overflow-hidden rounded-xl bg-muted/50">
						<div className="flex items-center justify-between px-4 py-3 text-sm text-primary">
							<span>Copy Link</span>
							<span className="text-muted-foreground">🔗</span>
						</div>
						<div className="flex items-center justify-between px-4 py-3 text-sm text-primary">
							<span>Save Image</span>
							<span className="text-muted-foreground">⬇</span>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
				<Label className="mb-4 block text-secondary">01 - Save</Label>
				<H3 className="mb-6">Share anything, from anywhere.</H3>
				<P className="!mt-0 text-muted-foreground">
					Send images straight from Instagram, Pinterest, or your camera roll. Any look you love, saved in seconds in one place. No more screenshots
					buried in your camera roll.
				</P>
			</motion.div>
		</div>
	);
}

function FeatureDiscover() {
	return (
		<div className="mx-auto grid max-w-7xl items-center gap-16 px-8 md:grid-cols-2 md:gap-20">
			<motion.div className="order-2 md:order-1" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
				<Label className="mb-4 block text-secondary">02 - Discover</Label>
				<H3 className="mb-6">Find out what your style actually is.</H3>
				<P className="!mt-0 text-muted-foreground">
					We analyze everything you save: colors, items, and silhouettes, and show you the recurring patterns in your mood board
				</P>
			</motion.div>

			<motion.div className="relative order-1 overflow-hidden rounded-card bg-card p-8 shadow-ui-card md:order-2" variants={itemVariants}>
				<div className="space-y-8">
					<div>
						<span className="mb-4 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Color DNA</span>
						<div className="flex gap-3">
							<div className="h-14 w-14 rounded-xl bg-[#51452D] shadow-sm" />
							<div className="h-14 w-14 rounded-xl bg-secondary-container shadow-sm" />
							<div className="h-14 w-14 rounded-xl bg-muted shadow-sm" />
							<div className="h-14 w-14 rounded-xl bg-tertiary shadow-sm" />
						</div>
					</div>
					<div>
						<span className="mb-4 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Frequent Tags</span>
						<div className="flex flex-wrap gap-2">
							<span className="rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
								Linen (14)
							</span>
							<span className="rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
								High-Waist (8)
							</span>
							<span className="rounded-full bg-secondary-container px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-secondary-container-foreground">
								Muted Tones
							</span>
							<span className="rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
								Structured (11)
							</span>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

function FeatureShop() {
	return (
		<div className="mx-auto grid max-w-7xl items-center gap-16 px-8 md:grid-cols-2 md:gap-20">
			<motion.div className="rounded-card bg-card p-8 shadow-ui-card" variants={itemVariants}>
				<div className="flex flex-col gap-6">
					<div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							alt="Structured Blazer"
							className="warm-grade h-full w-full object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAocWJj6SogeBL6rLULto2zA1G7yKrgfWn03veo30EtZ3aPbB1iO-omoMKcZn0l25c-xUb73bmyuFB_srFwC9T1ThqtEACMeWYIILOAwhwwCTevD9I4z5T6VOWvtheWSRs2SfTUXBq78FH1Hkv51KQmZz7Cmj_GYIepNGNdSnQSlvX-1XCym6EZ5wwcZWwK5AEhQifRXW8Ml1Cx6AuRX01AdJ-TVc4zEkwEDRpuZhcQFHjl_IqecLl9yoN3K87IL3NgjkwXdZb60iO2"
						/>
						<div className="absolute right-4 top-4 rounded-full bg-card/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm">
							New Item
						</div>
					</div>
					<div className="space-y-4">
						<div className="flex items-end justify-between">
							<div>
								<h4 className="font-headline text-xl font-bold">Structured Camel Blazer</h4>
								<p className="text-sm text-muted-foreground">$189.00</p>
							</div>
							<div className="text-right">
								<span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Confidence Score</span>
								<p className="font-headline text-lg font-bold text-primary">94% Match</p>
							</div>
						</div>
						<div className="h-2 w-full overflow-hidden rounded-full bg-accent">
							<div className="h-full w-[94%] bg-secondary-container" />
						</div>
						<div className="flex flex-wrap gap-2 pt-2">
							<span className="flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-secondary-container-foreground">
								✓ Featured in 5 looks
							</span>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
				<Label className="mb-4 block text-secondary">03 - Shop Smarter</Label>
				<H3 className="mb-6">Buy things you&apos;ll actually wear.</H3>
				<P className="!mt-0 text-muted-foreground">
					Insprii finds the common threads across all your saved inspiration. By identifying recurring items and styles, we ensure you get the most
					value out of every new purchase.
				</P>
			</motion.div>
		</div>
	);
}

export default function Features() {
	return (
		<motion.section
			className="space-y-24 pb-24 md:space-y-32 md:pb-32"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}>
			<FeatureSave />
			<FeatureDiscover />
			<FeatureShop />
		</motion.section>
	);
}
