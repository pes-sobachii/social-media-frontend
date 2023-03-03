import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UsersService} from "../../users.service";
import {useNavigate} from "react-router-dom";
import {IAuthUser, ILogin} from "../../../Types/UserTypes";
import {PostService} from "../../posts.service";
import {ISetPost} from "../../../Types/PostsTypes";

const useDeletePost = () => {

    const {deletePost} = PostService
    const queryClient = useQueryClient()

    return useMutation(async (id: string) => await deletePost(id), {
        onSuccess: (res) => {
            console.log(res)
            queryClient.invalidateQueries(['post'])
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useDeletePost