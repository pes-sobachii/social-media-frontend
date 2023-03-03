import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {Divider, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {comment} from "../Types/PostsTypes";
import useCreateComment from "../services/hooks/postHooks/useCreateComment";
import Loader from "./Loader";

const CommentSection: React.FC<{ data: comment[], id: string }> = ({data, id}) => {

    const [value, setValue] = useState('')
    const {mutateAsync, isLoading} = useCreateComment()

    const onClick = async () => {
        await mutateAsync({id, text: value})
        console.log({id, text: value})
        setValue('')
    }

    return (
        <Box>
            {isLoading && <Loader/>}
            {data.map(comment => {
                return (
                    <div key={comment._id}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, py: 2}}>
                            <Avatar src={`http://localhost:5000${comment.author.avatar}`} sx={{
                                height: {xs: '30px', md: '50px'},
                                width: {xs: '30px', md: '50px'}
                            }}/>
                            <Box>
                                <Typography fontWeight={700}>{comment.author.name + ' ' + comment.author.surname}</Typography>
                                <Typography>{comment.text}</Typography>
                            </Box>
                        </Box>
                        <Divider/>
                    </div>

                )
            })}
            <Box>
                <Typography marginTop={1} fontWeight={700}>Add comment</Typography>
                <TextField placeholder={'Write something...'} value={value} onChange={(e) => setValue(e.target.value)}
                           multiline sx={{width: '100%', my: 1}}>

                </TextField>
                <Button variant={'contained'} onClick={onClick}>Submit</Button>
            </Box>
        </Box>
    );
};

export default CommentSection;