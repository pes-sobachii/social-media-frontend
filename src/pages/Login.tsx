import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {SubmitHandler, useForm} from "react-hook-form";
import {Link as RouterLink} from "react-router-dom";
import {IAuthUser, ILogin} from "../Types/UserTypes";
import Loader from "../components/Loader";
import {Alert} from "@mui/material";
import useLogin from "../services/hooks/userHooks/useLogin";


const Login:React.FC<{ setAuth: (value: IAuthUser) => void }> = ({setAuth}) => {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<ILogin>({
        defaultValues: {email: '', password: ''},
        mode: 'onChange'
    })

    const { mutateAsync, isLoading, isError} = useLogin(setAuth)

    const onSubmit: SubmitHandler<ILogin> = async (val) => {
        await mutateAsync(val)
    }

    return (
        <Container component="main" maxWidth="sm">
            {isLoading && (<Loader />)}
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    padding: 4,
                    borderRadius: '15px',
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email Address"
                                error={Boolean(errors.email?.message)}
                                helperText={errors.email?.message}
                                {...register('email', {
                                    required: 'Provide an email', pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                {...register('password', {required: 'Create a password'})}
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                    </Grid>
                    {isError && <Alert variant={'filled'} severity={'error'} sx={{
                        mt: 3
                    }}>Incorrect data</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={!isValid}
                    >
                        Log In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to={'/register'} variant="body2">
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;