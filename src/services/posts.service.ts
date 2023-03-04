import axios from './axios'
import { ISetPost } from '../Types/PostsTypes'

export const PostService = {
	async createPost(post: ISetPost) {
		return await axios.post(`/post`, post)
	},
	async updatePost(post: ISetPost, id: string) {
		return await axios.put(`/posts/${id}`, post)
	},
	async deletePost(id: string) {
		return await axios.delete(`/posts/${id}`)
	},
	async getPost(id: string) {
		const { data } = await axios.get(`/posts/${id}`)
		return data
	},
	async getAllPosts() {
		const { data } = await axios.get(`/posts`)
		return data
	},
	async getUserPosts(id: string) {
		const { data } = await axios.get(`/user/posts/${id}`)
		return data
	},
	async createComment(id: string, text: string) {
		return await axios.post(`/comment`, {
			id,
			text,
		})
	},
	async toggleLike(id: string, like: boolean) {
		return await axios.put(`/like`, {
			id,
			like,
		})
	},
}
