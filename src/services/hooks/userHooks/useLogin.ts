import {useMutation} from "@tanstack/react-query";
import {UsersService} from "../../users.service";
import {useNavigate} from "react-router-dom";
import {IAuthUser, ILogin} from "../../../Types/UserTypes";

const useLogin = (setAuth: (val: IAuthUser) => void) => {

    const navigate = useNavigate();
    const {login} = UsersService

    return useMutation(async (userData: ILogin) => await login(userData), {
        onSuccess: ({data}) => {
            window.localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/')
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useLogin