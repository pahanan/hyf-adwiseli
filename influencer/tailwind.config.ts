import type { Config } from 'tailwindcss'

const svgToDataUri = require('mini-svg-data-uri')

const colors = require('tailwindcss/colors')
const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: '#FF5500',
				secondary: 'black',
				black: '#0D0E0F',
				dimmed: '#E1E4E7',
				error: '#FF0000',
				border: '#D0D5DD',
				paragraph: '#4b5563',
				errorbg: '#fce7e6',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			boxShadow: {
				clean: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
				naviga: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
				small: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
				message:
					'rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.01) 0px 2px 6px 2px',
			},
			animation: {
				scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
				hide: 'hide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideDownAndFade:
					'slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideLeftAndFade:
					'slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideUpAndFade:
					'slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideRightAndFade:
					'slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				// Accordion
				accordionOpen:
					'accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)',
				accordionClose:
					'accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)',
				// Dialog
				dialogOverlayShow:
					'dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				dialogContentShow:
					'dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				// Drawer
				drawerSlideLeftAndFade:
					'drawerSlideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				drawerSlideRightAndFade:
					'drawerSlideRightAndFade 150ms ease-in',
			},
			keyframes: {
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))',
					},
				},
				hide: {
					from: { opacity: '1' },
					to: { opacity: '0' },
				},
				slideDownAndFade: {
					from: { opacity: '0', transform: 'translateY(-6px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				slideLeftAndFade: {
					from: { opacity: '0', transform: 'translateX(6px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				slideUpAndFade: {
					from: { opacity: '0', transform: 'translateY(6px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				slideRightAndFade: {
					from: { opacity: '0', transform: 'translateX(-6px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				accordionOpen: {
					from: { height: '0px' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				accordionClose: {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: { height: '0px' },
				},
				dialogOverlayShow: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				dialogContentShow: {
					from: {
						opacity: '0',
						transform: 'translate(-50%, -45%) scale(0.95)',
					},
					to: {
						opacity: '1',
						transform: 'translate(-50%, -50%) scale(1)',
					},
				},
				drawerSlideLeftAndFade: {
					from: { opacity: '0', transform: 'translateX(100%)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				drawerSlideRightAndFade: {
					from: { opacity: '1', transform: 'translateX(0)' },
					to: { opacity: '0', transform: 'translateX(100%)' },
				},
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/forms'),
		addVariablesForColors,
		function ({ matchUtilities, theme }: any) {
			matchUtilities(
				{
					'bg-grid': (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					'bg-grid-small': (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					'bg-dot': (value: any) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
						)}")`,
					}),
				},
				{
					values: flattenColorPalette(theme('backgroundColor')),
					type: 'color',
				}
			)
		},
	],
}

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)

	addBase({
		':root': newVars,
	})
}

export default config
