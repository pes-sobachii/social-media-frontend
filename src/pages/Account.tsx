import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
	Room,
	Wc,
	DateRange,
	PostAdd,
	AccountBox,
	SupervisedUserCircle,
} from '@mui/icons-material'
import { Avatar, Box, Typography, Divider, Button } from '@mui/material'

import noAvatar from '../assets/no-avatar.webp'
import Post from '../components/Post'
import NewPost from '../components/NewPost'
import ContactModal from '../components/ContactModal'
import useOneUser from '../services/hooks/userHooks/useOneUser'
import Loader from '../components/Loader'
import { IAuthUser, IUnauthUser } from '../Types/UserTypes'
import useGetUserPosts from '../services/hooks/postHooks/useUserPosts'
import { IFullPost } from '../Types/PostsTypes'
import useToggleFollow from '../services/hooks/userHooks/useToggleFollow'
import styles from '../styles/Account.module.scss'

const Account: React.FC<{ auth: IAuthUser }> = ({ auth }) => {
	const [openFollowings, setOpenFollowings] = useState<boolean>(false)
	const [openFollowers, setOpenFollowers] = useState<boolean>(false)

	const { id } = useParams() as { id: string }
	const {
		data: userData,
		isLoading,
	}: { data: IUnauthUser | undefined; isLoading: boolean } = useOneUser(id)
	const { data: posts } = useGetUserPosts(id)
	const { mutateAsync, isLoading: isFollowing } = useToggleFollow()

	if (!auth._id && !window.localStorage.getItem('token')) {
		return <Navigate to={'/login'} />
	}

	if (isLoading) {
		return <Loader />
	}

	if (!userData || id === undefined) {
		return (
			<Box textAlign={'center'} py={10}>
				User not found
			</Box>
		)
	}

	const onFollow = async (follow: boolean) => {
		await mutateAsync({ id: userData._id, follow })
	}

	return (
		<Box paddingY={3}>
			<Box
				sx={{
					backgroundColor: 'rgba(255, 255, 255, 0.6)',
					borderRadius: '15px',
					padding: '0 15px',
					marginBottom: '20px',
				}}
			>
				<Typography
					component={'h2'}
					sx={{
						textAlign: 'center',
						fontWeight: 700,
						pt: '15px',
						fontSize: 30,
					}}
				>
					{userData.name + ' ' + userData.surname}
				</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						textAlign: { xs: 'center', sm: 'left' },
						flexDirection: { xs: 'column', sm: 'row' },
					}}
				>
					<div className={styles.bio}>
						<ul>
							<li>
								<DateRange />
								Age: {String(userData.age)}
							</li>
							<Divider />
							<li>
								<Wc />
								Gender: {userData.gender}
							</li>
							<Divider />
							<li>
								<Room />
								Location: {userData.city}
							</li>
						</ul>
					</div>
					<div className={styles.avatar}>
						<Avatar
							alt={userData.name + ''}
							sx={{
								height: { xs: '140px', md: '190px' },
								width: { xs: '140px', md: '190px' },
								display: 'inline-block',
							}}
							src={
								userData.avatar
									? `${process.env.REACT_APP_API_URL}${userData.avatar}`
									: noAvatar
							}
						/>
					</div>
					<div className={styles.activity}>
						<ul>
							<li>
								<button
									onClick={() => setOpenFollowings(true)}
									style={{ cursor: 'pointer' }}
								>
									{userData.followings.length} subscriptions
								</button>
								<SupervisedUserCircle />
							</li>
							<Divider />
							<li>
								<button
									onClick={() => setOpenFollowers(true)}
									style={{ cursor: 'pointer' }}
								>
									{userData.followers.length} subscribers
								</button>
								<AccountBox />
							</li>
							<Divider />
							<li>
								141 posts
								<PostAdd />
							</li>
						</ul>
					</div>
				</Box>
			</Box>
			<Box sx={{ mb: 3, textAlign: 'center' }}>
				{auth._id !== userData._id &&
					(userData.followers.some(
						(follower: IUnauthUser) => follower._id === auth._id
					) ? (
						<Button
							variant={'contained'}
							color={'warning'}
							onClick={() => onFollow(false)}
							disabled={isFollowing}
						>
							Unfollow
						</Button>
					) : (
						<Button
							variant={'contained'}
							onClick={() => onFollow(true)}
							disabled={isFollowing}
						>
							Follow
						</Button>
					))}
			</Box>
			<Divider />
			<Box
				component={'section'}
				sx={{
					fontStyle: 'italic',
					px: '40px',
					py: '20px',
					textAlign: 'center',
				}}
			>
				<Typography variant={'subtitle1'}>{userData.status}</Typography>
			</Box>
			<Divider />
			<Box component={'section'} className={styles.posts}>
				{id === auth._id && <NewPost avatar={auth.avatar} />}
				{posts
					?.map((post: IFullPost, index: number) => (
						<Post auth={auth} key={index} post={post} />
					))
					.reverse()}
			</Box>
			<ContactModal
				setOpen={setOpenFollowers}
				data={userData.followers}
				open={openFollowers}
			/>
			<ContactModal
				setOpen={setOpenFollowings}
				data={userData.followings}
				open={openFollowings}
			/>
		</Box>
	)
}

export default Account
