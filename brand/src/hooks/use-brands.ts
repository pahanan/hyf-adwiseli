import useUser from './use-user'

export default function useBrands() {
	const { user, isError, isLoading, error } = useUser()

	return {
		isLoading,
		isError,
		brands: user?.brands || [],
		error,
	}
}
