import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, IconButton, Box } from '@mui/material'
import {
	ChatBubbleOutlineOutlined,
	DeleteForever,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	Visibility,
	Edit,
} from '@mui/icons-material'

import { IFullPost } from '../Types/PostsTypes'
import { IAuthUser } from '../Types/UserTypes'
import useToggleLike from '../services/hooks/postHooks/useToggleLike'
import useDeletePost from '../services/hooks/postHooks/useDeletePost'
import styles from '../styles/Post.module.scss'

const Post: React.FC<{ post: IFullPost; auth: IAuthUser }> = ({
	post,
	auth,
}) => {
	const { mutateAsync: likePost, isLoading: isLiking } = useToggleLike()
	const { mutateAsync: deletePost, isLoading: isDeleting } = useDeletePost()

	const onLike = async () => {
		if (post) {
			await likePost({ id: post._id, like: !post.likes.includes(auth._id) })
		}
	}

	const onDelete = async () => {
		await deletePost(post._id)
	}

	return (
		<div className={styles.post}>
			{post.image && (
				<div className={styles.poster}>
					<img src={`${process.env.REACT_APP_API_URL}${post.image}`} alt='' />
				</div>
			)}
			<div className={styles.data}>
				<div className={styles.author}>
					<Avatar
						sx={{ height: 40, width: 40 }}
						alt={post.user.name + ''}
						src={`${process.env.REACT_APP_API_URL}${post.user.avatar}`}
					/>
					<Link to={`/user/${post.user._id}`}>
						<h4>{post.user.name}</h4>
						<p>{post.user.surname}</p>
					</Link>
					<Box
						display={auth._id === post.user._id ? 'block' : 'none'}
						sx={{ flex: '1 1 auto', textAlign: 'right' }}
					>
						<Link to={`/edit-post/${post._id}`}>
							<IconButton>
								<Edit />
							</IconButton>
						</Link>
						<IconButton disabled={isDeleting} onClick={onDelete}>
							<DeleteForever />
						</IconButton>
					</Box>
				</div>
				<div className={styles.text}>
					<h3>
						<Link to={`/post/${post._id}`}>{post.title}</Link>
					</h3>
					{post.tags[0] !== '#' && <p>{post.tags.join(', ')}</p>}
				</div>
				<div className={styles.interactions}>
					<IconButton disabled={isLiking || !auth._id} onClick={onLike}>
						{post.likes.includes(auth?._id) ? (
							<FavoriteOutlined sx={{ color: 'red' }} />
						) : (
							<FavoriteBorderOutlined />
						)}
					</IconButton>
					<span>{post.likes.length}</span>
					<IconButton sx={{ marginLeft: 1 }} onClick={() => {}}>
						<ChatBubbleOutlineOutlined />
					</IconButton>
					<span>{post.comments.length}</span>
					<IconButton sx={{ marginLeft: 1 }} onClick={() => {}}>
						<Visibility />
					</IconButton>
					<span>{post.views}</span>
				</div>
			</div>
		</div>
	)
}

export default Post
