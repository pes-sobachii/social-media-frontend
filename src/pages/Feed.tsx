import React from 'react';
import Grid from '@mui/material/Grid';
import {Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {LocationOnOutlined, WorkOutlineOutlined,} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Post from "../components/Post";
import PostContainer from "../components/PostContainer";
import Loader from "../components/Loader";
import useGetAllPosts from "../services/hooks/postHooks/useGetAllPosts";
import {IFullPost} from "../Types/PostsTypes";
import {IAuthUser, IUnauthUser} from "../Types/UserTypes";
import {Link, Navigate} from "react-router-dom";


const Feed: React.FC<{ auth: IAuthUser }> = ({auth}) => {

    const {data: posts, isLoading} = useGetAllPosts()

    const flexStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }

    if (auth === undefined) {
        return <Navigate to={'/login'}/>
    }

    if (isLoading) {
        return <Loader/>
    }

    if (!posts) {
        return <>Error</>
    }

    console.log('login', auth)

    return (
        <div>
            {/*<Loader />*/}
            <Grid container spacing={2}>
                <Grid md={8} xs={12} order={{xs: 2, md: 1}} item>
                    {auth._id && <PostContainer avatar={auth.avatar}/>}
                    {posts.map((post: IFullPost, index: number) => (
                        <Post key={index} auth={auth} post={post}/>
                    )).reverse()}
                </Grid>
                <Grid md={4} xs={12} order={{xs: 1, md: 2}} item>
                    <Box sx={{
                        overflow: 'hidden',
                        margin: '10px auto',
                        padding: '15px',
                        width: '100%',
                        borderRadius: '15px',
                        border: '1px solid #dedddd',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)'
                    }}>
                        {!auth._id ?
                            <Typography component={'h4'} my={15}>
                                Please, log in to be able to interact with others
                            </Typography>
                            : <>
                                <Box
                                    gap="0.5rem"
                                    pb="1.1rem"
                                    sx={flexStyle}
                                >
                                    <Box gap="1rem" sx={flexStyle}>
                                        <Avatar sx={{height: '70px', width: '70px'}}
                                                src={`http://localhost:5000${auth.avatar}`}/>
                                        <Box>
                                            <Typography
                                                variant="h4"
                                                fontWeight="500"
                                            >
                                                {auth.name + ' ' + auth.surname}
                                            </Typography>
                                            <Typography>{auth.age + ' y. o.'}</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Divider/>

                                <Box p="1rem 0">
                                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                                        <LocationOnOutlined fontSize="large"/>
                                        <Typography>{auth.city}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap="1rem">
                                        <WorkOutlineOutlined fontSize="large"/>
                                        <Typography>{auth.profession}</Typography>
                                    </Box>
                                </Box>

                                <Divider/>

                                <Box p="1rem 0">
                                    <Box mb="0.5rem" sx={flexStyle}>
                                        <Typography>Followings</Typography>
                                        <Typography fontWeight="700">
                                            {auth.followings.length}
                                        </Typography>
                                    </Box>
                                    <Box sx={flexStyle}>
                                        <Typography>Followers</Typography>
                                        <Typography fontWeight="700">
                                            {auth.followers.length}
                                        </Typography>
                                    </Box>
                                </Box>
                            </>
                        }
                    </Box>
                    {(auth._id && auth.followings.length > 0) && <Box sx={{
                        overflow: 'hidden',
                        margin: '10px auto',
                        padding: '15px',
                        width: '100%',
                        borderRadius: '15px',
                        border: '1px solid #dedddd',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)'
                    }}>
                        <List sx={{width: '100%'}}>
                            <Typography textAlign={'center'} fontWeight={700}>Your Subscriptions</Typography>
                            {auth.followings.slice(0, 5).map( (user: IUnauthUser) => {
                                return(
                                    <ListItem key={user._id}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`${user.name}`}
                                                src={`http://localhost:5000${user.avatar}`}/>
                                        </ListItemAvatar>
                                        <Link to={`/user/${user._id}`}>
                                            <ListItemText primary={user.name + ' ' + user.surname} secondary={`${user?.followers.length} subscribers`}/>
                                        </Link>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>}
                </Grid>
            </Grid>
        </div>
    );
};

export default Feed;