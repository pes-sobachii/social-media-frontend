import {useQuery} from "@tanstack/react-query";
import {PostService} from "../../posts.service";

const useGetPost = (id: string) => {

    const {getPost} = PostService

    return useQuery(['post', 'one-post', id], async () => await getPost(id), {
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (res) => {
            console.log(res)
        }
    })

}

export default useGetPost