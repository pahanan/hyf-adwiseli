import { useState, useEffect } from 'react'
//import { fetchBrandData } from '../utils/fetchBrandData'
//import type { BrandData } from '../utils/fetchBrandData'
import type { DashboardCardData } from '../types/dashboardCardData'

type UserType = 'brand' | 'influencer'

// Custom hook to load and structure dashboard data for brand/influencer users
const useDashBoardData = (userType: UserType) => {
	const [cards, setCards] = useState<DashboardCardData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>()

	useEffect(() => {
		const loadData = async () => {
			try {
				// Fetch data if the user is a brand
				/*
                if (userType === 'brand') {
					const data = await fetchBrandData()

					// Format the fetched data into a card-friendly array - data model not finalized yet
					setCards([
						{ label: 'Creator Amount', value: data.creatorAmount },
						{ label: 'Audience Age', value: data.audienceAge },
						{
							label: 'Audience Gender',
							value: data.audienceGender,
						},
					])
				}
                */
				/* will add influencer data when ready 
                
                if (userType === "influencer") {
                    const data = await fetchInfluencerData()
                    setCards([
                      {},
                    ])
                  }
                */
			} catch (err) {
				setError('Failed to load data')
			} finally {
				setLoading(false)
			}
		}
		loadData()
	}, [userType])

	// Return card data and loading state to the component
	return { cards, loading, error }
}

export default useDashBoardData
