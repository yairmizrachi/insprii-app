import { render } from '@react-email/render';
import WelcomeTemplate from '../../../emails';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	// If no Resend API key is configured, skip email silently
	if (!process.env.RESEND_API_KEY) {
		return NextResponse.json({ message: 'Email confirmation skipped' });
	}

	if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
		return NextResponse.json(
			{ error: 'Upstash is required when Resend is enabled. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.' },
			{ status: 500 },
		);
	}

	// Dynamic imports so the app doesn't crash when packages aren't configured
	const { Resend } = await import('resend');

	const { Redis } = await import('@upstash/redis');
	const { Ratelimit } = await import('@upstash/ratelimit');

	const redis = new Redis({
		url: process.env.UPSTASH_REDIS_REST_URL,
		token: process.env.UPSTASH_REDIS_REST_TOKEN,
	});

	const ratelimit = new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(2, '1 m'),
	});

	const ip = request.ip ?? '127.0.0.1';
	const result = await ratelimit.limit(ip);

	if (!result.success) {
		return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
	}

	const { email } = await request.json();

	const from = process.env.EMAIL_FROM ?? 'noreply@example.com';
	const fromName = process.env.EMAIL_FROM_NAME ?? process.env.NEXT_PUBLIC_SITE_NAME ?? 'My App';
	const replyTo = process.env.EMAIL_REPLY_TO ?? '';
	const subject = process.env.EMAIL_SUBJECT ?? 'Thanks for joining our waitlist!';

	const resend = new Resend(process.env.RESEND_API_KEY);

	const { data, error } = await resend.emails.send({
		from: `${fromName}<${from}>`,
		to: [email],
		subject,
		...(replyTo ? { reply_to: replyTo } : {}),
		html: await render(WelcomeTemplate()),
	});

	if (error) {
		return NextResponse.json(error, { status: 500 });
	}

	if (!data) {
		return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
	}

	return NextResponse.json({ message: 'Email sent successfully' });
}
