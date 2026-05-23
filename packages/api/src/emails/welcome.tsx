import * as React from 'react'
import { Body, Container, Head, Hr, Html, Img, Preview, Text } from '@react-email/components'

const appName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Your App'
const emailLogoUrl = process.env.EMAIL_LOGO_URL ?? ''
const replyTo = process.env.EMAIL_REPLY_TO ?? ''

export const WelcomeEmail = () => (
	<Html>
		<Head />
		<Preview>{`Thanks for joining the ${appName} waitlist!`}</Preview>
		<Body style={main}>
			<Container style={container}>
				{emailLogoUrl && <Img src={emailLogoUrl} width="220" height="100" alt={`${appName} Logo`} style={logo} />}
				<Text style={greeting}>Hi there,</Text>
				<Text style={paragraph}>{`Thanks for joining the ${appName} waitlist! We're excited to have you on board.`}</Text>
				<Text style={paragraph}>
					We'll keep you posted on our progress and let you know as soon as things are ready.
					{replyTo ? (
						<>
							{' '}If you have any questions, feel free to reply directly to{' '}
							<a href={`mailto:${replyTo}`} style={link}>
								this email
							</a>
							.
						</>
					) : null}
				</Text>
				<Text style={signOff}>
					Best regards,
					<br />
					{`The ${appName} Team`}
				</Text>
				<Hr style={hr} />
				<Text style={footer}>
					{`You received this email because you signed up for the ${appName} waitlist. If you believe this is a mistake, feel free to ignore this email.`}
				</Text>
			</Container>
		</Body>
	</Html>
)

const main: React.CSSProperties = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
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
	fontSize: '18px',
	lineHeight: 1.4,
	color: '#111',
}
const paragraph: React.CSSProperties = {
	fontSize: '14px',
	lineHeight: 1.6,
	color: '#333',
}
const signOff: React.CSSProperties = {
	fontSize: '14px',
	lineHeight: 1.6,
	color: '#333',
	marginTop: '32px',
}
const link: React.CSSProperties = {
	color: '#2563eb',
	textDecoration: 'underline',
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

export default WelcomeEmail
