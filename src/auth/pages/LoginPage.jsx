import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { starGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

const formData = {
    email: '',
    password: ''
}

export const LoginPage = () => {
    const dispatch = useDispatch()
    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const { email, password, onInputChange, formState } = useForm(formData);

    const onSubmit = (event) => {
        event.preventDefault();
        // console.log({ email, password })
        dispatch(startLoginWithEmailPassword({ email, password }));
    }

    // console.log('Current status:', status);

    const onGoogleSignIn = () => {
        // console.log('google')
        dispatch(starGoogleSignIn())
    }

    return (

        <AuthLayout title="Login">

            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@gmail.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                        {
                            errorMessage ?
                                <Grid item xs={12}>
                                    <Alert severity='error'>
                                        {errorMessage}
                                    </Alert>
                                </Grid>
                                : ''
                        }
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isCheckingAuthentication}
                                type='submit'
                                variant="contained"
                                fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isCheckingAuthentication}
                                onClick={onGoogleSignIn}
                                variant="contained"
                                fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color='inherit' to="/auth/register">
                            Crear Cuenta
                        </Link>
                    </Grid>

                </Grid>

            </form>

        </AuthLayout>

    )
}
