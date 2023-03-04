import { useQuery } from '@tanstack/react-query'
import { PostService } from '../../posts.service'

const useGetAllPosts = () => {
	const { getAllPosts } = PostService

	return useQuery(['post', 'all'], async () => await getAllPosts(), {
		onSuccess: (res) => {
			console.log(res)
		},
		onError: (res) => {
			console.log(res)
		},
	})
}

export default useGetAllPosts
