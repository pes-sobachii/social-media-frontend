import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {ISetPost} from "../Types/PostsTypes";
import useCreatePost from "../services/hooks/postHooks/useCreatePost";
import Loader from "./Loader";
import {IAuthUser} from "../Types/UserTypes";
import {PostService} from "../services/posts.service";
import useUpdatePost from "../services/hooks/postHooks/useUpdatePost";
import handleChangeFile from "../utils/handleChangeFile";

const PostConstructor: React.FC<{ auth: IAuthUser }> = ({auth}) => {

    // const {id} = useParams() as { id: string | undefined }
    const [imageUrl, setImageUrl] = useState('')
    const [titleValue, setTitleValue] = useState('')
    const [tagsValue, setTagsValue] = useState('')
    const [textValue, setTextValue] = useState('')
    const inputRef = useRef<null | HTMLInputElement>(null)
    const {mutateAsync: createPost, isLoading: isCreating} = useCreatePost()
    // const {mutateAsync: updatePost, isLoading: isUpdating} = useUpdatePost(id)

    // useEffect(() => {
    //     if (id) {
    //         PostService.getPost(id).then((data) => {
    //             console.log(data)
    //             setImageUrl(data.image)
    //             setTitleValue(data.title)
    //             setTextValue(data.text)
    //             const tags = data.tags.map((tag:string) => tag.substring(1)).join(' ')
    //             setTagsValue(tags)
    //         }).catch((err) => console.warn(err))
    //     }
    // }, [])


    const inputStyles = {
        width: '100%',
        display: 'block',
        margin: '10px 0'
    }



    const onSubmit = async (e:FormEvent) => {
        e.preventDefault()
        try {
            const tags = tagsValue.split(' ').map(tag => '#' + tag)
            const post:ISetPost = {
                title: titleValue,
                image: imageUrl,
                text: textValue,
                tags
            }
            // if (id) {
            //     await updatePost({post, id})
            // } else {
            //     await createPost(post)
            // }

                await createPost(post)



        } catch (err) {
            console.warn(err)
        }
    }

    if (!auth._id && !window.localStorage.getItem('token')){
        return <Navigate to={'/login'} />
    }

    return (
        <Box component={'form'}
             onSubmit={onSubmit}
             sx={{
                 overflow: 'hidden',
                 margin: '10px auto',
                 padding: '30px',
                 width: '100%',
                 borderRadius: '15px',
                 border: '1px solid #dedddd',
                 backgroundColor: 'rgba(255, 255, 255, 0.6)',
             }}>
            {isCreating && <Loader/>}
            <Typography variant={"h4"} textAlign={'center'}>
                Create New Post
            </Typography>
            <Box>
                <Button variant={'contained'} onClick={() => inputRef.current && inputRef.current.click()}>Add
                    Image</Button>
                <input ref={inputRef} type="file" onChange={(e) => handleChangeFile(e, setImageUrl)} hidden/>
                {imageUrl && <Box>
                    <img src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="poster"/>
                </Box>}
            </Box>
            <TextField label="Title" value={titleValue} onChange={e => setTitleValue(e.target.value)} fullWidth={true}
                       variant="outlined" sx={inputStyles}/>
            <TextField label="Tags (separate them only by space)" value={tagsValue}
                       onChange={e => setTagsValue(e.target.value)} fullWidth={true} variant="outlined"
                       sx={inputStyles}/>
            <TextField
                value={textValue} onChange={e => setTextValue(e.target.value)}
                sx={inputStyles}
                label="Text"
                multiline
                rows={11}
                fullWidth={true}
                variant="outlined"
            />
            <Button type='submit' variant="contained">Post</Button>
        </Box>
    );
};

export default PostConstructor;