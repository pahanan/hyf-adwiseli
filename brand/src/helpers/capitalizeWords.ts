export default function capitalizeWords(input: string): string {
	const stringWithSpaces = input.replace(/-/g, ' ')
	const words = stringWithSpaces.split(' ')
	const capitalizedWords = words.map((word) => {
		if (word.length === 0) return ''
		return word[0].toUpperCase() + word.slice(1)
	})
	return capitalizedWords.join(' ')
}
