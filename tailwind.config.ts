
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Neo-brutalism colors
				'neo-blue': '#3333ff',
				'neo-pink': '#ff2d55',
				'neo-green': '#33cc33',
				'neo-yellow': '#ffcc00',
				'neo-red': '#ff3b30',
				'neo-purple': '#cc66ff',
				'neo-orange': '#ff9500',
				'neo-black': '#111111',
				// College subject colors
				'math': '#3333ff',      // Blue for math/science
				'literature': '#cc66ff', // Purple for literature/arts
				'science': '#33cc33',    // Green for natural sciences
				'history': '#ff9500',    // Orange for history/social sciences
				'cs': '#ff2d55',         // Pink for computer science
				'psychology': '#ffcc00',  // Yellow for psychology
				'highlight': '#fff5b8',   // Highlight color for important notes
				'formula-bg': '#f0f7ff',  // Background for formulas
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-1deg)' },
					'50%': { transform: 'rotate(1deg)' },
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'highlight-pulse': {
					'0%, 100%': { backgroundColor: 'rgba(255, 204, 0, 0.2)' },
					'50%': { backgroundColor: 'rgba(255, 204, 0, 0.5)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'wiggle': 'wiggle 0.3s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'highlight-pulse': 'highlight-pulse 2s ease-in-out infinite'
			},
			boxShadow: {
				'neo': '5px 5px 0px rgba(0, 0, 0, 0.9)',
				'neo-sm': '3px 3px 0px rgba(0, 0, 0, 0.9)',
				'neo-lg': '8px 8px 0px rgba(0, 0, 0, 0.9)',
				'neo-hover': '7px 7px 0px rgba(0, 0, 0, 0.9)',
				'neo-inner': 'inset 3px 3px 0px rgba(0, 0, 0, 0.2)',
			},
			typography: {
				DEFAULT: {
					css: {
						h1: {
							fontWeight: '700',
						},
						h2: {
							fontWeight: '700',
						},
						h3: {
							fontWeight: '600',
						},
						'blockquote': {
							borderLeftWidth: '4px',
							borderLeftColor: '#3333ff',
							fontStyle: 'normal',
							padding: '1rem 0 1rem 1.5rem',
							backgroundColor: '#f9f9f9',
						},
						'code': {
							fontFamily: 'Space Mono, monospace',
							backgroundColor: '#f3f3f3',
							padding: '0.2em 0.4em',
							borderRadius: '0.25rem',
						},
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
