import {useMutation} from "@tanstack/react-query";
import {PostService} from "../../posts.service";
import {useQueryClient} from "@tanstack/react-query";
import {UsersService} from "../../users.service";

const useToggleFollow = () => {

    const {toggleFollow} = UsersService
    const queryClient = useQueryClient()

    return useMutation(async ({id, follow}:{id: string, follow: boolean}) => await toggleFollow({id, follow}), {
        onSuccess: (res) => {
            console.log('follow', res)
            queryClient.invalidateQueries(['user'])
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useToggleFollow