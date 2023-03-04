import { IUnauthUser } from './UserTypes'

export interface ISetPost {
	title: string
	tags: string[]
	image: string
	text: string
}

export interface comment {
	author: IUnauthUser
	text: string
	_id: string
}

export interface IFullPost extends ISetPost {
	_id: string
	user: IUnauthUser
	createdAt: string
	updatedAt: string
	views: number
	likes: string[]
	comments: comment[]
	__v: number
}
