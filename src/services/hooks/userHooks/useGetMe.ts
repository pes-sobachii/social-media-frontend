import { UsersService } from '../../users.service'
import { useQuery } from '@tanstack/react-query'
import { IAuthUser } from '../../../Types/UserTypes'

const useGetMe = (token: String | null, setAuth: (val: IAuthUser) => void) => {
	const { getMe } = UsersService

	return useQuery(['user', 'me'], getMe, {
		onSuccess: (data) => {
			setAuth(data)
		},
		onError: (res) => {
			console.log(res)
		},
		enabled: !!token,
	})
}

export default useGetMe
