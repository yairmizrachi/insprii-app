export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

type FbqEvent = (action: 'track', name: string, options?: Record<string, unknown>) => void

declare global {
	interface Window {
		fbq?: FbqEvent
	}
}

export const pageview = () => {
	window.fbq?.('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options: Record<string, unknown> = {}) => {
	window.fbq?.('track', name, options)
}
