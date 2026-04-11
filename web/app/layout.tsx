import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import FacebookPixel from '@/components/FacebookPixel';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const notoSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-serif' });
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'My App';
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? 'Join our waitlist to get early access and receive updates on our progress.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: siteName,
	description: siteDescription,
	openGraph: {
		title: siteName,
		description: siteDescription,
		url: siteUrl,
		siteName: siteName,
		images: [
			{
				url: '/opengraph-image.png',
				width: 1280,
				height: 832,
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteName,
		description: siteDescription,
		images: ['/twitter-image.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${notoSerif.variable} font-body selection:bg-secondary-container selection:text-secondary-container-foreground`}>
				<Navbar />
				{children}
				<Toaster richColors position="top-center" />
				<Analytics />
				<FacebookPixel />
			</body>
		</html>
	);
}
