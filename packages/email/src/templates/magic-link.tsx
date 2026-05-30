import * as React from 'react'
import { Body, Button, Container, Head, Hr, Html, Img, Link, Preview, Text } from '@react-email/components'

export const MagicLinkEmail = ({ url, appName, logoUrl }: { url: string; appName: string; logoUrl?: string }) => (
	<Html>
		<Head />
		<Preview>{`Your sign-in link for ${appName}`}</Preview>
		<Body style={main}>
			<Container style={container}>
				{logoUrl && <Img src={logoUrl} width="220" height="100" alt={`${appName} Logo`} style={logo} />}
				<Text style={greeting}>Sign in to {appName}</Text>
				<Text style={paragraph}>Click the button below to sign in. This link will expire shortly and can only be used once.</Text>
				<Button href={url} style={button}>
					Sign in
				</Button>
				<Text style={paragraph}>
					Or paste this link into your browser:
					<br />
					<Link href={url} style={link}>
						{url}
					</Link>
				</Text>
				<Hr style={hr} />
				<Text style={footer}>If you didn't request this email, you can safely ignore it.</Text>
			</Container>
		</Body>
	</Html>
)

const main: React.CSSProperties = {
	backgroundColor: '#f6f9fc',
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
}
const container: React.CSSProperties = {
	margin: '0 auto',
	padding: '24px',
	maxWidth: '560px',
	backgroundColor: '#ffffff',
	borderRadius: '12px',
}
const logo: React.CSSProperties = {
	margin: '0 auto 24px',
	display: 'block',
}
const greeting: React.CSSProperties = {
	fontSize: '20px',
	lineHeight: 1.3,
	color: '#111',
	fontWeight: 600,
}
const paragraph: React.CSSProperties = {
	fontSize: '14px',
	lineHeight: 1.6,
	color: '#333',
}
const button: React.CSSProperties = {
	backgroundColor: '#111',
	color: '#fff',
	padding: '12px 20px',
	borderRadius: '8px',
	fontSize: '14px',
	fontWeight: 500,
	textDecoration: 'none',
	display: 'inline-block',
	margin: '16px 0',
}
const link: React.CSSProperties = {
	color: '#2563eb',
	textDecoration: 'underline',
	wordBreak: 'break-all',
}
const hr: React.CSSProperties = {
	borderColor: '#e5e7eb',
	margin: '32px 0',
}
const footer: React.CSSProperties = {
	fontSize: '12px',
	color: '#6b7280',
	lineHeight: 1.5,
}

export default MagicLinkEmail
