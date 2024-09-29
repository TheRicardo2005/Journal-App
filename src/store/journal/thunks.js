import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseBD } from '../../firebase/config';
import { addNewEmpityNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        // console.log('starnewNote');
        // console.log( getState() ); //Trae la informacion del estado global
        dispatch( savingNewNote() )

        const { uid } = getState().auth;

        const newNote = {
            title: "",
            body: "",
            imageUrls: [],
            date: new Date().getTime()
        };

        const newDoc = doc( collection( FirebaseBD, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmpityNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        // console.log({ uid })
        if(!uid) throw new Error('El UID no se encuentra');
        const notes = await loadNotes( uid );
        
        dispatch( setNotes( notes ) );
    }
}

export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = {...note};
        delete noteToFireStore.id; //Elimina el id
        // console.log(noteToFireStore);

        const docRef = doc(FirebaseBD, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch( updateNote( note ) );

    }
}

export const startUploadingFiles = (files = []) => {
    return async ( dispatch ) => {

        dispatch( setSaving() );
        // await fileUpload(files[0])
        const fileUploadPromise = [];
        for (const file of files) {
            fileUploadPromise.push( fileUpload(file) );
        }

        const photoURLs = await Promise.all( fileUploadPromise );
        console.log(photoURLs);
        dispatch( setPhotosToActiveNote(photoURLs) )

    }
} 

export const startDeleatingNote = () => {
    return async ( dispatch, getState) => {
        
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc(FirebaseBD, `${uid}/journal/notes/${note.id}`);
        const resp = await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );
    }
}

