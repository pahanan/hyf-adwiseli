// Tremor Raw chartColors [v0.0.0]

export type ColorUtility = 'bg' | 'stroke' | 'fill' | 'text'

export const chartColors = {
	purple: {
		bg: 'bg-purple-500',
		stroke: 'stroke-purple-500',
		fill: 'fill-purple-500',
		text: 'text-purple-500',
	},
	blue: {
		bg: 'bg-blue-500',
		stroke: 'stroke-blue-500',
		fill: 'fill-blue-500',
		text: 'text-blue-500',
	},
	emerald: {
		bg: 'bg-emerald-500',
		stroke: 'stroke-emerald-500',
		fill: 'fill-emerald-500',
		text: 'text-emerald-500',
	},
	violet: {
		bg: 'bg-violet-500',
		stroke: 'stroke-violet-500',
		fill: 'fill-violet-500',
		text: 'text-violet-500',
	},
	amber: {
		bg: 'bg-amber-500',
		stroke: 'stroke-amber-500',
		fill: 'fill-amber-500',
		text: 'text-amber-500',
	},
	gray: {
		bg: 'bg-gray-500',
		stroke: 'stroke-gray-500',
		fill: 'fill-gray-500',
		text: 'text-gray-500',
	},
	cyan: {
		bg: 'bg-cyan-500',
		stroke: 'stroke-cyan-500',
		fill: 'fill-cyan-500',
		text: 'text-cyan-500',
	},
	pink: {
		bg: 'bg-pink-500',
		stroke: 'stroke-pink-500',
		fill: 'fill-pink-500',
		text: 'text-pink-500',
	},
	primaryFilled: {
		bg: 'bg-primary',
		stroke: 'stroke-primary',
		fill: 'fill-primary',
		text: 'text-primary',
	},
	primaryLight: {
		bg: 'bg-cyan-500',
		stroke: 'stroke-cyan-500',
		fill: 'fill-cyan-500',
		text: 'text-cyan-500',
	},
	primaryMedium: {
		bg: 'bg-primary/70',
		stroke: 'stroke-primary/70',
		fill: 'fill-primary/70',
		text: 'text-primary/70',
	},
} as const satisfies {
	[color: string]: {
		[key in ColorUtility]: string
	}
}

export type AvailableChartColorsKeys = keyof typeof chartColors

export const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
	chartColors
) as Array<AvailableChartColorsKeys>

export const constructCategoryColors = (
	categories: string[],
	colors: AvailableChartColorsKeys[]
): Map<string, AvailableChartColorsKeys> => {
	const categoryColors = new Map<string, AvailableChartColorsKeys>()
	categories.forEach((category, index) => {
		categoryColors.set(category, colors[index % colors.length])
	})
	return categoryColors
}

export const getColorClassName = (
	color: AvailableChartColorsKeys,
	type: ColorUtility
): string => {
	const fallbackColor = {
		bg: 'bg-main',
		stroke: 'stroke-main',
		fill: 'fill-main',
		text: 'text-main',
	}
	return chartColors[color]?.[type] ?? fallbackColor[type]
}

// Tremor Raw getYAxisDomain [v0.0.0]

export const getYAxisDomain = (
	autoMinValue: boolean,
	minValue: number | undefined,
	maxValue: number | undefined
) => {
	const minDomain = autoMinValue ? 'auto' : (minValue ?? 0)
	const maxDomain = maxValue ?? 'auto'
	return [minDomain, maxDomain]
}

// Tremor Raw hasOnlyOneValueForKey [v0.0.0]

export function hasOnlyOneValueForKey(
	array: any[],
	keyToCheck: string
): boolean {
	let value: any = undefined
	for (const obj of array) {
		if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
			if (value === undefined) {
				value = obj[keyToCheck]
			} else if (value !== obj[keyToCheck]) {
				return false
			}
		}
	}
	return true
}
