import {useMutation} from "@tanstack/react-query";
import {PostService} from "../../posts.service";
import {useQueryClient} from "@tanstack/react-query";

const useToggleLike = () => {

    const {toggleLike} = PostService
    const queryClient = useQueryClient()

    return useMutation(async ({id, like}:{id: string, like: boolean}) => await toggleLike(id, like), {
        onSuccess: (res) => {
            queryClient.invalidateQueries(['post'])
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useToggleLike