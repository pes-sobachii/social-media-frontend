import { UsersService } from '../../users.service'
import { useQuery } from '@tanstack/react-query'

const useSearchUsers = (query: String) => {
	const { searchUsers } = UsersService

	return useQuery(
		['user', 'search user', query],
		async () => await searchUsers(query),
		{
			onError: (res) => {
				console.log(res)
			},
		}
	)
}

export default useSearchUsers
