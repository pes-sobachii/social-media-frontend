import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostService } from '../../posts.service'

const useDeletePost = () => {
	const { deletePost } = PostService
	const queryClient = useQueryClient()

	return useMutation(async (id: string) => await deletePost(id), {
		onSuccess: (res) => {
			queryClient.invalidateQueries(['post'])
		},
		onError: (res) => {
			console.log(res)
		},
	})
}

export default useDeletePost
