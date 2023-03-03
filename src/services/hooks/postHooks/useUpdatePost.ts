import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UsersService} from "../../users.service";
import {useNavigate} from "react-router-dom";
import {IAuthUser, ILogin} from "../../../Types/UserTypes";
import {PostService} from "../../posts.service";
import {ISetPost} from "../../../Types/PostsTypes";

const useUpdatePost = (postId: string | undefined) => {

    const navigate = useNavigate();
    const {updatePost} = PostService
    // const queryClient = useQueryClient()

    return useMutation(async ({post, id}:{post: ISetPost, id: string}) => await updatePost(post, id), {
        onSuccess: ({data}) => {
            console.log(data)
            // queryClient.invalidateQueries(['post'])
            // queryClient.resetQueries(['post'])
            navigate(`/post/${postId}`)
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useUpdatePost