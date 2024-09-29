import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'


const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'La contraseña debe más de 6 letras.'],
    displayName: [(value) => value.length >= 6, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    // console.log(displayNameValid)

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;
        // console.log( formState );
        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    return (

        <AuthLayout title="Register">
            {/* <h1>FormValid: { isFormValid ? 'Valido' : 'Incorrecto' }</h1> */}
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre Completo"
                            type="text"
                            placeholder="Jhon Doe"
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            placeholder="correo@gmail.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={emailValid && formSubmitted}
                            helperText={emailValid}
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
                            error={passwordValid && formSubmitted}
                            helperText={passwordValid}
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

                        <Grid item xs={12}>
                            <Button
                                disabled={isCheckingAuthentication}
                                type='submit'
                                variant="contained"
                                fullWidth
                                sx={{ textAlign: 'center' }}
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>

            </form>

        </AuthLayout>
    )
}
