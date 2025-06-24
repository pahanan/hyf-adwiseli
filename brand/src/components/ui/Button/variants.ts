import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
	'group inline-flex shrink-0 select-none items-center justify-center font-medium leading-6 transition-colors duration-100 antialiased focus:outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none',
	{
		variants: {
			size: {
				'xs-icon': 'gap-0 px-2 py-1 text-xs',
				sm: 'gap-0 px-2 py-2 text-sm',
				md: 'gap-1 px-3 py-2 text-base',
			},
			shape: {
				rounded: 'rounded-lg',
				pill: 'rounded-full',
			},
			variant: {
				primary:
					'bg-primary font-semibold text-white outline-primary hover:bg-primary/80 disabled:opacity-50 transition-all',
				secondary:
					'bg-black text-white outline-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 transition-all',
				tertiary: 'bg-gray-50 hover:bg-gray-100',
				outline:
					'border border-gray-200 shadow-xs [--border-width:1px] hover:bg-neutral-50 disabled:border-gray-50',

				transparent: 'bg-transparent hover:bg-gray-50',
				link: 'p-0 underline underline-offset-3 hover:opacity-80 focus-visible:text-primary',
			},

			destructive: {
				true: [],
				false: [],
			},
		},
		compoundVariants: [
			{
				variant: 'outline',
				size: 'md',
				class: 'py-8px',
			},
			{
				variant: 'outline',
				size: 'sm',
				class: 'py-4px',
			},
			{
				variant: ['primary', 'secondary'],
				destructive: true,
				class: 'bg-rose-500 text-white outline-rose-500 hover:bg-rose-600 disabled:bg-rose-500 disabled:opacity-50',
			},
			{
				variant: 'tertiary',
				destructive: true,
				class: 'bg-rose-50 border border-gray-600/10 hover:bg-rose-100 disabled:bg-rose-50',
			},
			{
				variant: 'transparent',
				destructive: true,
				class: 'hover:bg-rose-50',
			},
			{
				variant: 'outline',
				destructive: true,
				class: 'border-rose-500 hover:bg-rose-50 disabled:border-rose-100',
			},
			{
				variant: 'link',
				destructive: true,
				class: 'hover:text-rose-800 focus-visible:text-rose-800',
			},

			{
				variant: ['outline', 'tertiary', 'transparent', 'link'],
				class: 'text-gray-900 outline-primary disabled:text-gray-300',
			},
			{
				variant: ['outline', 'tertiary', 'transparent', 'link'],
				destructive: true,
				class: 'text-rose-700 outline-rose-500 disabled:text-rose-300',
			},
		],
		defaultVariants: {
			shape: 'rounded',
			size: 'md',
			variant: 'primary',
		},
	}
)

export const iconVariants = cva('text-current', {
	variants: {
		variant: {
			primary: '',
			secondary: '',
			tertiary: '',
			outline: '',
			transparent: '',
			link: '',
		},
		destructive: {
			true: 'text-current',
		},
		size: {
			'xs-icon': 'size-5',
			sm: 'size-5',
			md: 'size-6',
		},
	},
	compoundVariants: [
		{
			variant: ['tertiary', 'outline', 'transparent', 'link'],
			class: 'opacity-50',
		},
	],
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
})
