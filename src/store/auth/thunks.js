import { loginWithEmailPassword, logoutFireBase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        // console.log('Dispatching checkingCredentials');
        dispatch( checkingCredentials() );

    }
}

export const starGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        // console.log({result})
        if(!result.ok) {
            return dispatch( logout( result.errorMessage ) );
        } 
        

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) =>{
    return async( dispatch ) =>  {

        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        // console.log(resp);
        if(!ok) {
            return dispatch( logout({errorMessage}) );
        }

        dispatch( login({ uid, displayName, email, photoURL }) );

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });
        // console.log({ email, password })
        if(!result.ok){
            return dispatch( logout( result ) );
        }

        dispatch( login( result ) );
        
    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        await logoutFireBase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}