import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({ credentials });
        // const user = result.user;
        // console.log({ user })
        const { displayName, email, photoURL, uid } = result.user;
        return{
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
        
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        
        return{
            ok: false,
            errorCode,
            errorMessage,
        }

    }

}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        // console.log(resp);
        // * Para actulizar displayName en FireBase
        await updateProfile( FirebaseAuth.currentUser,{
            displayName
        });

        return{
            ok: true,
            uid,
            photoURL,
            email,
            password,
            displayName
        }
        
    } catch (error) {
        // console.log(error);
        return { 
            ok: false, 
            errorMessage: error.message,
        }
    }

}

export const loginWithEmailPassword = async({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, photoURL, uid } = resp.user;
        // console.log(resp)
        
        return{
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        } 
    }

}

export const logoutFireBase = async() => {

    return await FirebaseAuth.signOut();

}