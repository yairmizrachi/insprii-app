import type { CSSProperties, FC, ReactNode } from 'react'

import { cn } from '.'

interface ShimmerTextProps {
	children: ReactNode
	className?: string
	shimmerWidth?: number
}

export const ShimmerText: FC<ShimmerTextProps> = ({ children, className, shimmerWidth = 200 }) => {
	return (
		<p
			style={
				{
					'--shimmer-width': `${shimmerWidth}px`,
				} as CSSProperties
			}
			className={cn(
				'text-muted-foreground mx-auto max-w-md',
				'animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',
				'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80',
				className,
			)}
		>
			{children}
		</p>
	)
}
