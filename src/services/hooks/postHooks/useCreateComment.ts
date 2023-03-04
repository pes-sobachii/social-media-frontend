import {useMutation} from "@tanstack/react-query";
import {PostService} from "../../posts.service";
import {useQueryClient} from "@tanstack/react-query";

const useCreateComment = () => {

    const {createComment} = PostService
    const queryClient = useQueryClient()

    return useMutation(async ({id, text}:{id: string, text: string}) => await createComment(id, text), {
        onSuccess: (res) => {
            queryClient.invalidateQueries(['post'])
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useCreateComment