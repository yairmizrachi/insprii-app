'use client';

import { motion } from 'framer-motion';
import { Small, Muted } from '@/components/ui/typography';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'My App';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '';
const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL ?? '';
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? '';
const redditUrl = process.env.NEXT_PUBLIC_REDDIT_URL ?? '';

export default function Footer() {
	const links = [
		...(twitterUrl ? [{ label: 'Twitter', href: twitterUrl }] : []),
		...(githubUrl ? [{ label: 'GitHub', href: githubUrl }] : []),
		...(redditUrl ? [{ label: 'Reddit', href: redditUrl }] : []),
		...(contactEmail ? [{ label: 'Contact', href: `mailto:${contactEmail}` }] : []),
	];

	return (
		<motion.footer variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-background py-12">
			<div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 sm:px-8 md:flex-row md:justify-between">
				<div>
					<span className="font-headline text-lg font-bold text-primary">{siteName}</span>
				</div>

				{links.length > 0 && (
					<div className="flex flex-wrap justify-center gap-8">
						{links.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target={link.href.startsWith('mailto:') ? undefined : '_blank'}
								rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
								className="transition-colors hover:text-primary">
								<Small className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">{link.label}</Small>
							</a>
						))}
					</div>
				)}

				<div>
					<Muted className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground/60">
						&copy; {new Date().getFullYear()} {siteName}
					</Muted>
				</div>
			</div>
		</motion.footer>
	);
}
