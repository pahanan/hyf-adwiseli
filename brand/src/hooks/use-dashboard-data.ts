import { useState, useEffect } from 'react'
// import { fetchBrandData } from '../queries/brand/fetchBrandData'

interface DashboardCardData {
	label: string
	value: number | string
	extraInfo?: string
}

const useDashboardData = () => {
	const [cards, setCards] = useState<DashboardCardData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadData = async () => {
			try {
				// const data = await fetchBrandData()
				// setCards([...])
			} catch (err) {
				setError('Failed to load brand data')
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [])

	return { cards, loading, error }
}

export default useDashboardData
