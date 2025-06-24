export default function toPascalCase(str: string): string {
	return str
		.toLowerCase()
		.split(/[\s-_]+/) // Split by spaces, dashes, or underscores
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
		.join('')
}
