import { useMutation } from '@tanstack/react-query'
import { UsersService } from '../../users.service'
import { useNavigate } from 'react-router-dom'
import { IAuthUser, IRegisterUser } from '../../../Types/UserTypes'

const useRegister = (setAuth: (val: IAuthUser) => void) => {
	const navigate = useNavigate()
	const { register } = UsersService

	return useMutation(
		async (userData: IRegisterUser) => await register(userData),
		{
			onSuccess: ({ data }) => {
				window.localStorage.setItem('token', data.token)
				setAuth(data)
				navigate('/')
			},
			onError: (res) => {
				console.log(res)
			},
		}
	)
}

export default useRegister
