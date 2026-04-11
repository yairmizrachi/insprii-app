import { Body, Container, Head, Hr, Html, Img, Preview, Text } from '@react-email/components';
import * as React from 'react';

const appName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'My App';
const emailLogoUrl = process.env.EMAIL_LOGO_URL ?? '';
const replyTo = process.env.EMAIL_REPLY_TO ?? '';

export const WaitlistEmail = () => (
	<Html>
		<Head />
		<Preview>Thanks for joining the waitlist! 🎉</Preview>
		<Body style={main}>
			<Container style={container}>
				{emailLogoUrl && <Img src={emailLogoUrl} width="220" height="100" alt={`${appName} Logo`} style={logo} />}
				<Text style={greeting}>Hi there,</Text>
				<Text style={paragraph}>Thanks for joining the {appName} waitlist! We're excited to have you on board.</Text>
				<Text style={paragraph}>
					We'll keep you posted on our progress and let you know as soon as things are ready.
					{replyTo && (
						<>
							If you have any questions, feel free to reply directly to
							<a href={`mailto:${replyTo}`} style={link}>
								this email
							</a>
							.
						</>
					)}
				</Text>
				<Text style={signOff}>
					Best regards,
					<br />
					The {appName} Team
				</Text>
				<Hr style={hr} />
				<Text style={footer}>
					You received this email because you signed up for the {appName} waitlist. If you believe this is a mistake, feel free to ignore this email.
				</Text>
			</Container>
		</Body>
	</Html>
);

export default WaitlistEmail;

const main = {
	background: 'linear-gradient(-225deg, #667eea 0%, #764ba2 100%)',
	fontFamily: 'system-ui, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif',
	padding: '40px 0',
	color: '#cccccc',
};

const container = {
	margin: '0 auto',
	padding: '24px 32px 48px',
	backgroundColor: '#1a1a1a',
	borderRadius: '12px',
	boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
	maxWidth: '600px',
};

const logo = {
	margin: '0 auto',
	paddingBottom: '20px',
};

const greeting = {
	fontSize: '18px',
	lineHeight: '28px',
};

const paragraph = {
	fontSize: '16px',
	lineHeight: '26px',
	marginBottom: '20px',
};

const link = {
	color: '#a78bfa',
	textDecoration: 'underline',
};

const signOff = {
	fontSize: '16px',
	lineHeight: '26px',
	marginTop: '20px',
};

const hr = {
	borderColor: '#cccccc',
	margin: '20px 0',
};

const footer = {
	color: '#8c8c8c',
	fontSize: '12px',
};
