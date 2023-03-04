import React from 'react';
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    Visibility
} from "@mui/icons-material";
import {Divider, Box, Typography, Avatar, IconButton} from "@mui/material";
import {Link, useParams} from "react-router-dom";

import {IAuthUser} from "../Types/UserTypes";
import useGetPost from "../services/hooks/postHooks/useGetPost";
import {IFullPost} from "../Types/PostsTypes";
import Loader from "../components/Loader";
import CommentSection from "../components/CommentSection";
import useToggleLike from "../services/hooks/postHooks/useToggleLike";

const FullPost: React.FC<{ auth: IAuthUser }> = ({auth}) => {

    const {id} = useParams() as { id: string }
    const {
        data,
        isLoading,
        isError
    }: { data: IFullPost | undefined, isLoading: boolean, isError: boolean } = useGetPost(id)
    const {mutateAsync, isLoading: isLiking} = useToggleLike()

    const onLike = async () => {
        if (data) {
            await mutateAsync({id, like: !data.likes.includes(auth._id)})
        }
    }

    if (isLoading) {
        return <Loader/>
    }
    if (isError || !data) {
        return <>'An error'</>
    }

    return (
        <Box sx={{
            my: '10px',
            py: '30px',
            px: {md:'60px', xs: '20px'},
            borderRadius: '15px',
            border: '1px solid #dedddd',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}>
            <Typography component={'h2'} textAlign={'center'} fontSize={36} fontWeight={700}>{data.title}</Typography>
            {data.image && <Box textAlign={'center'}><img src={`${process.env.REACT_APP_API_URL}${data.image}`}
                                            style={{width: 'auto', maxHeight: '400px', margin: '0 auto'}} alt="poster"/></Box>}
            <Box display={'flex'} alignItems={'center'} mt={{xs: 2, md: 0}} gap={2}>
                <Avatar src={`${process.env.REACT_APP_API_URL}${data.user.avatar}`} sx={{
                    height: {xs: '50px', md: '80px'},
                    width: {xs: '50px', md: '80px'}
                }}/>
                <Link to={`/user/${data.user._id}`}>
                    <Box>
                        <Typography component={'h4'} fontSize={{md: 25, xs: 16}} fontWeight={700}>
                            {data.user.name + ' ' + data.user.surname}
                        </Typography>
                        <Typography component={'h6'} fontSize={{md: 22, xs: 14}}>
                            {data.user.city}
                        </Typography>
                    </Box>
                </Link>

            </Box>
            <Typography component={'p'} paddingY={1} fontSize={{md:22, xs:16}} color={'grey'}>
                {data.tags[0] !== '#' && data.tags.join(', ')}
            </Typography>
            <Typography component={'article'} fontSize={{sm:22, xs:16}} paddingY={2}>{data.text}</Typography>
            <Divider/>
            <Box>
                <IconButton disabled={isLiking} onClick={onLike}>
                    {data.likes.includes(auth._id) ? (
                        <FavoriteOutlined sx={{ color: 'red' }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                </IconButton>
                <span>{data.likes.length}</span>
                <IconButton sx={{ marginLeft: 1 }} onClick={() => {}}>
                    <ChatBubbleOutlineOutlined  />
                </IconButton>
                <span>{data.comments.length}</span>
                <IconButton sx={{ marginLeft: 1 }} onClick={() => {}}>
                    <Visibility  />
                </IconButton>
                <span>{data.views}</span>
            </Box>
            <Divider/>
            {auth._id ? <CommentSection data={data.comments} id={data._id}/> : <Box sx={{py: 5, textAlign: 'center'}}><Typography fontSize={20}>Log in to comment</Typography></Box>}
        </Box>
    );
};

export default FullPost;