import React, {useEffect, useState} from 'react';
import { Menu as MenuIcon, LogoDevOutlined } from '@mui/icons-material';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ButtonGroup, Link, AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Button, MenuItem, Menu} from "@mui/material";
import {IAuthUser} from "../Types/UserTypes";

const Header: React.FC<{ auth: IAuthUser, setAuth: (val: IAuthUser) => void }> = ({auth, setAuth}) => {

    const [isAuth, setIsAuth] = useState(window.localStorage.getItem('token'))
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        setIsAuth(window.localStorage.getItem('token'))
    }, [window.localStorage.getItem('token')])

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logOut = async () => {
        navigate(`/login`)
        window.localStorage.setItem('token', '')
        setAuth({
            _id: '',
            name: '',
            surname: '',
            email: '',
            token: '',
            followings: [],
            followers: [],
            status: '',
            profession: '',
            age: 0,
            gender: '',
            avatar: '',
            city: '',
        })
    }



    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Link component={RouterLink} to={'/'}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            <LogoDevOutlined sx={{width: '50px', height: '50px'}}/>
                        </Typography>
                    </Link>


                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link component={RouterLink} to={`/`}
                                      sx={{textDecoration: 'none', color: 'inherit'}}>Main</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link component={RouterLink} to={auth._id ? `/user/${auth._id}` : `/login`}
                                      sx={{textDecoration: 'none', color: 'inherit'}}>Account</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link component={RouterLink} to={`/add-post`}
                                      sx={{textDecoration: 'none', color: 'inherit'}}>New Post</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Link component={RouterLink} to={`/search`}
                                      sx={{textDecoration: 'none', color: 'inherit'}}>Search</Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'right', pr: '3rem'}}>
                        <Link component={RouterLink} to={auth._id ? `/user/${auth._id}` : `/login`}
                              onClick={handleCloseNavMenu}
                              sx={{my: 2, mx: 3, fontSize: 18, color: 'white', display: 'block'}}
                        >
                            Account
                        </Link>
                        <Link component={RouterLink} to={`/add-post`}
                              onClick={handleCloseNavMenu}
                              sx={{my: 2, mx: 3, fontSize: 18, color: 'white', display: 'block'}}
                        >
                            New Post
                        </Link>
                        <Link component={RouterLink} to={`/search`}
                              onClick={handleCloseNavMenu}
                              sx={{my: 2, mx: 3, fontSize: 18, color: 'white', display: 'block'}}
                        >
                            Search
                        </Link>
                    </Box>

                    {isAuth ? <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center', gap: 3}}>
                        <Avatar alt={auth.name} src={`${process.env.REACT_APP_API_URL}${auth.avatar}`}/>
                        <Button color={'error'} variant={'contained'} sx={{fontSize: 11}} onClick={logOut}>Log out</Button>
                    </Box> : <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <RouterLink to={'/login'}>
                            <Button>Log in</Button>
                        </RouterLink>
                        <RouterLink to={'/register'}>
                            <Button>Sign on</Button>
                        </RouterLink>
                    </ButtonGroup>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;