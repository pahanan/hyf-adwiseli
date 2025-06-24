export function isAdVideo(caption?: string) {
	if (!caption) return false
	const adWords: Set<string> = new Set([
		'reklame',
		'annonce',
		'sponsoreret',
		'rabatkode',
		'samarbejde',
		'gifted',
		'#ad',
		'promo',
		'min kode',
	])

	const captionText = caption.toLowerCase()

	// Helper function to check if a word appears as a complete word
	const isCompleteWord = (word: string, text: string): boolean => {
		// Handle special case for hashtags
		if (word.startsWith('#')) {
			const pattern = new RegExp(`${word}\\b`, 'i')
			return pattern.test(text)
		}

		// For regular words, check word boundaries on both sides
		const pattern = new RegExp(`\\b${word}\\b`, 'i')
		return pattern.test(text)
	}

	// Check for exact word matches
	for (const word of adWords) {
		if (isCompleteWord(word, captionText)) {
			return true
		}
	}

	// Check for hashtags without the # symbol
	const hashtagPattern = /#(\w+)/g
	const hashtags = captionText.match(hashtagPattern) || []
	for (const hashtag of hashtags) {
		const hashtagWithoutSymbol = hashtag.slice(1).toLowerCase()
		// Convert each ad word to lowercase and remove # if present for comparison
		for (const adWord of adWords) {
			const normalizedAdWord = adWord.startsWith('#')
				? adWord.slice(1).toLowerCase()
				: adWord.toLowerCase()
			if (hashtagWithoutSymbol === normalizedAdWord) {
				return true
			}
		}
	}

	return false
}
