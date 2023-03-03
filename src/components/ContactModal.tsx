import React from 'react';
import {Backdrop, Fade, List, ListItem, ListItemAvatar, ListItemText, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {IUnauthUser} from "../Types/UserTypes";
import {Link} from "react-router-dom";

const ContactModal:React.FC<{setOpen: (value: boolean) => void, open: boolean, data: IUnauthUser[]}> = ({setOpen, open, data}) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: 300, sm: 500},
        bgcolor: 'white',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Subscriptions of the user
                    </Typography>
                    <List sx={{width: '100%', maxHeight: '500px', overflowY: 'scroll'}}>
                        {data.length === 0 &&
                                <Typography textAlign={'center'} paddingY={10}>There are no users</Typography>
                        }
                        {data.map( (user: IUnauthUser) => {
                            return(
                                <ListItem key={user._id}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`${user.name}`}
                                            src={`${process.env.REACT_APP_API_URL}${user.avatar}`}/>
                                    </ListItemAvatar>
                                    <Link to={`/user/${user._id}`} onClick={() => setOpen(false)}>
                                        <ListItemText primary={user.name + ' ' + user.surname} secondary={`${user.followers.length} subscribers`}/>
                                    </Link>

                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ContactModal;