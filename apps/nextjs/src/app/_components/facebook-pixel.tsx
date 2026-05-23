'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

import * as pixel from '~/lib/fbpixel'

interface FBProps {
	eventId?: string
}

const FacebookPixel = ({ eventId }: FBProps) => {
	const [loaded, setLoaded] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		if (!loaded) return
		pixel.pageview()
	}, [pathname, loaded])

	const pixelId = eventId ?? pixel.FB_PIXEL_ID
	if (!pixelId) return null

	return (
		<Script
			id="fb-pixel"
			src="/scripts/pixel.js"
			strategy="afterInteractive"
			onLoad={() => setLoaded(true)}
			data-pixel-id={pixelId}
		/>
	)
}

export default FacebookPixel
