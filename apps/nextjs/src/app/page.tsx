import CTA from './_components/cta'
import Features from './_components/features'
import Footer from './_components/footer'
import Hero from './_components/hero'
import HowItWorks from './_components/how-it-works'
import Problem from './_components/problem'
import SocialProof from './_components/social-proof'
import SolutionIntro from './_components/solution-intro'

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col overflow-x-clip">
			<Hero />
			<SocialProof />
			<Problem />
			<SolutionIntro />
			<Features />
			<HowItWorks />
			<CTA />
			<Footer />
		</main>
	)
}
