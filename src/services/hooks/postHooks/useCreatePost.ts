import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {PostService} from "../../posts.service";
import {ISetPost} from "../../../Types/PostsTypes";

const useCreatePost = () => {

    const navigate = useNavigate();
    const {createPost} = PostService

    return useMutation(async (post: ISetPost) => await createPost(post), {
        onSuccess: ({data}) => {
            navigate(`/post/${data._id}`)
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useCreatePost