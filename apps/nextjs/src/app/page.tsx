import { Footer } from './_components/footer'
import { Hero } from './_components/hero'
import { WaitlistSection } from './_components/waitlist-section'

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col">
			<Hero />
			<WaitlistSection />
			<Footer />
		</main>
	)
}
