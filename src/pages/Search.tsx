import React, {ChangeEvent, useState} from 'react';
import Box from "@mui/material/Box";
import {List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {IAuthUser, IUnauthUser} from "../Types/UserTypes";
import useSearchUsers from "../services/hooks/userHooks/useSearchUsers";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import useToggleFollow from "../services/hooks/userHooks/useToggleFollow";
import {Puff} from 'react-loader-spinner'
import {Link, Navigate} from "react-router-dom";
import Loader from "../components/Loader";

const Search: React.FC<{ auth: IAuthUser }> = ({auth}) => {

    const [query, setQuery] = useState('')

    const {data: users, isLoading: usersGetting, refetch} = useSearchUsers(query)
    const {mutateAsync, isLoading: isFollowing} = useToggleFollow()

    if (!auth._id && !window.localStorage.getItem('token')){
        return <Navigate to={'/login'} />
    }

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await setQuery(e.target.value)
        await refetch()
    }

    const onFollow = async ({id, follow}: { id: string, follow: boolean }) => {
        await mutateAsync({id, follow})
        await refetch()
    }

    return (
        <Box marginY={3} sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '15px',
            padding: '15px',
            minHeight: '500px'
        }}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, width: {sm: '70%'}, m: '0 auto'}}>
                <TextField
                    onChange={onChange}
                    sx={{flex: '1 1 auto'}}
                    value={query}
                    label="query"
                    autoFocus/>
            </Box>
            {users?.length === 0
                ?
                <Box sx={{textAlign: 'center', pt: 10}}>
                    There are no matches or you didn't provide a query
                </Box>
                : usersGetting
                    ?
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 20}}><Puff
                        width={'100px'}
                        height={'100px'}
                        color={'lightblue'}/></Box>
                    : <List sx={{width: '100%', px: {xs: 1, sm: 5}}}>
                        {users?.map((user: IUnauthUser) => {

                            const follows = user.followers.some(follower => follower._id === auth._id)

                            return (
                                <ListItem key={user._id} sx={{
                                    alignItems: 'center',
                                    my: 3,
                                    px: 0,
                                    gap: {xs: 1, sm: 2}
                                }}>
                                    <ListItemAvatar>
                                        <Avatar alt={user.name + ''} sx={{width: {xs: '50px', sm:'100px'}, height: {xs: '50px', sm:'100px'}}}
                                                src={`http://localhost:5000${user.avatar}`}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{flex: '1 1 auto'}}
                                        disableTypography
                                        primary={
                                            <Link to={`/user/${user._id}`}>
                                                <Typography sx={{fontSize: {xs: 14, sm: 26}}}>{user.surname}</Typography>
                                            </Link>
                                        }
                                        secondary={user.name}/>
                                    <ListItemButton sx={{flex: {xs: '0 0 40%', sm:'0 0 20%'}, textAlign: 'center', display: 'block'}}
                                                    onClick={() => onFollow({id: user._id, follow: !follows})}>
                                        {auth._id !== user._id && (follows
                                            ? <Button variant={'contained'} color={'warning'}
                                                      disabled={isFollowing}>Unfollow</Button>
                                            : <Button variant={'contained'} disabled={isFollowing}>Follow</Button>)}
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>}
        </Box>
    );
};

export default Search;