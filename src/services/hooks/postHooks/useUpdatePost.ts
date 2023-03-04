import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {PostService} from "../../posts.service";
import {ISetPost} from "../../../Types/PostsTypes";

const useUpdatePost = (postId: string | undefined) => {

    const navigate = useNavigate();
    const {updatePost} = PostService

    return useMutation(async ({post, id}:{post: ISetPost, id: string}) => await updatePost(post, id), {
        onSuccess: ({data}) => {
            navigate(`/post/${postId}`)
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useUpdatePost