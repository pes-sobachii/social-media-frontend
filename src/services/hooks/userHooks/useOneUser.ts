import { UsersService } from '../../users.service'
import { useQuery } from '@tanstack/react-query'

const useOneUser = (id: String) => {
	const { getUser } = UsersService

	return useQuery(['user', 'one user', id], async () => await getUser(id), {
		onError: (res) => {
			console.log(res)
		},
	})
}

export default useOneUser
