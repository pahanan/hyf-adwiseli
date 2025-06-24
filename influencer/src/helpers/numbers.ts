export const formatNumber = (num: number) => {
	if (num >= 1000000) {
		return `${(num / 1000000).toFixed(1)}m`
	} else if (num >= 1000) {
		return `${(num / 1000).toFixed(1)}k`
	} else {
		return `${num}`
	}
}

export function thousands(num: number) {
	const [integerPart, decimalPart] = num.toString().split('.')

	const formattedIntegerPart = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		'.'
	)

	if (decimalPart) {
		return `${formattedIntegerPart},${decimalPart}`
	} else {
		return formattedIntegerPart
	}
}

export function twoDecimalFormatting(num: number) {
	if (!num || num === 0) {
		return '0'
	}
	return thousands(parseFloat(num.toFixed(2)))
}
