'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import CTA from '@/components/cta';
import Hero from '@/components/hero';
import SocialProof from '@/components/social-proof';
import Problem from '@/components/problem';
import SolutionIntro from '@/components/solution-intro';
import Features from '@/components/features';
import HowItWorks from '@/components/how-it-works';
import Footer from '@/components/footer';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export default function Home() {
	const [email, setEmail] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async () => {
		if (!email) {
			toast.error('Please enter your email.');
			return;
		}

		if (!isValidEmail(email)) {
			toast.error('Please enter a valid email address.');
			return;
		}

		setLoading(true);

		const promise = new Promise<{ email: string }>((resolve, reject) => {
			void (async () => {
				try {
					const mailResponse = await fetch('/api/mail', {
						cache: 'no-store',
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email }),
					});

					if (!mailResponse.ok) {
						reject(mailResponse.status === 429 ? 'Rate limited' : 'Email sending failed');
						return;
					}

					const { error } = await supabase.from('waitlist').insert({ email });

					if (error) {
						reject(error.code === '23505' ? 'Already joined' : 'Save failed');
						return;
					}

					resolve({ email });
				} catch {
					reject('Save failed');
				}
			})();
		});

		toast.promise(promise, {
			loading: 'Getting you on the waitlist...',
			success: () => {
				setEmail('');
				return 'Thank you for joining the waitlist! 🎉';
			},
			error: (error: unknown) => {
				if (error === 'Rate limited') return "You're doing that too much. Please try again later.";
				if (error === 'Email sending failed') return 'Failed to send email. Please try again.';
				if (error === 'Already joined') return "You're already on the waitlist!";
				return 'Something went wrong. Please try again.';
			},
		});

		promise.finally(() => {
			setLoading(false);
		});
	};

	return (
		<main className="flex min-h-screen flex-col overflow-x-clip">
			<Hero />

			<SocialProof />

			<Problem />

			<SolutionIntro />

			<Features />

			<HowItWorks />

			<CTA email={email} handleEmailChange={handleEmailChange} handleSubmit={handleSubmit} loading={loading} />

			<Footer />
		</main>
	);
}
