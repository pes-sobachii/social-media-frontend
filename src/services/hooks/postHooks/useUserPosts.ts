import {useQuery} from "@tanstack/react-query";
import {PostService} from "../../posts.service";

const useGetUserPosts = (id: string) => {

    const {getUserPosts} = PostService

    return useQuery(['post', 'user-posts', id], async () => await getUserPosts(id), {
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useGetUserPosts