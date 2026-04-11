import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				headline: ['var(--font-serif)', 'serif'],
				body: ['var(--font-sans)', 'sans-serif'],
				label: ['var(--font-sans)', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					container: 'hsl(var(--secondary-container))',
					'container-foreground': 'hsl(var(--secondary-container-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				surface: {
					dim: 'hsl(var(--surface-dim))',
					container: 'hsl(var(--surface-container))',
					'container-high': 'hsl(var(--surface-container-high))',
					'container-lowest': 'hsl(var(--surface-container-lowest))',
				},
				tertiary: 'hsl(var(--tertiary))',
			},
			borderRadius: {
				DEFAULT: '0.125rem',
				lg: '0.25rem',
				xl: '0.5rem',
				'2xl': '1rem',
				full: '9999px',
				card: '1rem',
			},
			boxShadow: {
				'ui-card': '0 4px 24px rgba(0,0,0,0.08)',
				ambient: '0 20px 60px rgba(26,28,27,0.04)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				shimmer: {
					'0%, 90%, 100%': {
						'background-position': 'calc(-100% - var(--shimmer-width)) 0',
					},
					'30%, 60%': {
						'background-position': 'calc(100% + var(--shimmer-width)) 0',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				shimmer: 'shimmer 8s infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
