import * as React from 'react';
import {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {SubmitHandler, useForm} from "react-hook-form";
import {Link as RouterLink} from "react-router-dom";
import {Alert} from "@mui/material";
import {IAuthUser, IRegisterUser} from "../Types/UserTypes";
import useRegister from "../services/hooks/userHooks/useRegister";
import Loader from "../components/Loader";
import handleChangeFile from "../utils/handleChangeFile";

const Register: React.FC<{ setAuth: (value: IAuthUser) => void }> = ({setAuth}) => {

    const [imageUrl, setImageUrl] = useState('')
    const inputRef = useRef<null | HTMLInputElement>(null)
    const formDefaultValues = {
        name: '',
        surname: '',
        email: '',
        password: '',
        status: '',
        profession: '',
        age: 0,
        city: '',
        gender: '',
        avatar: ''
    }

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<IRegisterUser>({
        defaultValues: formDefaultValues,
        mode: 'onChange'
    })

    const {
        mutateAsync,
        isLoading,
        isError,
    } = useRegister(setAuth)

    const onSubmit: SubmitHandler<IRegisterUser> = async (val) => {
        await mutateAsync({...val, avatar: imageUrl})
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Container component="main" maxWidth="sm">
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
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                error={Boolean(errors.name?.message)}
                                helperText={errors.name?.message}
                                {...register('name', {
                                    required: 'Enter a name', minLength: {
                                        value: 3,
                                        message: "Too Short Name"
                                    }
                                })}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                error={Boolean(errors.surname?.message)}
                                helperText={errors.surname?.message}
                                {...register('surname', {
                                    required: 'Enter a surname', minLength: {
                                        value: 3,
                                        message: "Too Short Surname"
                                    }
                                })}
                            />
                        </Grid>
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
                                {...register('password', {
                                    required: 'Create a password', minLength: {
                                        value: 6,
                                        message: "Too Short Password"
                                    }
                                })}
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                error={Boolean(errors.status?.message)}
                                helperText={errors.status?.message}
                                {...register('status', {required: 'Create a status',})}
                                label="Status"
                                type="text"
                                id="status"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(errors.age?.message)}
                                helperText={errors.age?.message}
                                {...register('age', {required: 'Enter an age'})}
                                label="Age"
                                type="number"
                                id="age"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(errors.city?.message)}
                                helperText={errors.city?.message}
                                {...register('city', {required: 'Enter your city'})}
                                label="City"
                                type="text"
                                id="city"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(errors.gender?.message)}
                                helperText={errors.gender?.message}
                                {...register('gender', {required: 'Enter a gender'})}
                                label="Gender"
                                type="text"
                                id="gender"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                error={Boolean(errors.profession?.message)}
                                helperText={errors.profession?.message}
                                {...register('profession', {required: 'Enter your profession'})}
                                label="Profession"
                                type="text"
                                id="profession"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant={'contained'} onClick={() => inputRef.current && inputRef.current.click()}>Add
                                Image</Button>
                            <input ref={inputRef} type="file" onChange={(e) => handleChangeFile(e, setImageUrl)} hidden/>
                        </Grid>
                    </Grid>
                    {isError && <Alert severity="error">Incorrect data</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={!isValid}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to={'/login'} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;