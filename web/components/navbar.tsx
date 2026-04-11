'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants } from '@/lib/animation-variants';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'My App';

export default function Navbar() {
	const scrollToWaitlist = () => {
		document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<motion.header variants={containerVariants} initial="hidden" animate="visible" className="glass fixed left-0 right-0 top-0 z-50">
			<nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				<Link href="/" className="text-foreground no-underline">
					<span className="font-headline text-2xl font-bold tracking-tighter">{siteName}</span>
				</Link>

				<motion.div variants={itemVariants}>
					<Button onClick={scrollToWaitlist}>Get Early Access</Button>
				</motion.div>
			</nav>
		</motion.header>
	);
}
