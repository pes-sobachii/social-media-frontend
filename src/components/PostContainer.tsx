import React from 'react';
import {Box} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const PostContainer:React.FC<{ avatar: string }> = ({avatar}) => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", overflow: 'hidden',
            margin: '10px auto',
            padding: '30px',
            width: '100%',
            borderRadius: '15px',
            border: '1px solid #dedddd',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}>
            <Avatar sx={{height: '45px', width: '45px'}}
                    src={`${process.env.REACT_APP_API_URL}${avatar}`}/>
            <Link to={'/add-post'}>
                <Button variant="contained">Write New Post</Button>
            </Link>

        </Box>
    );
};

export default PostContainer;