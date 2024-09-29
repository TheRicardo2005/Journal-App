import { DeleteOutlined, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeleatingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"


export const NotesViews = () => {
    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { title, body, date, onInputChange, formState } = useForm( note );
    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    },[date])

    useEffect(() => {
        dispatch(setActiveNote(formState))
    },[formState]);

    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    },[messageSaved])

    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    const onFileInputChange = ({target}) => {
        // console.log(target.files);
        console.log('subiendo archivos')
        dispatch( startUploadingFiles( target.files ) );
    }

    const fileInputRef = useRef();

    const onDelete = () => {
        dispatch( startDeleatingNote() );
    }

    return (
        <>
            <Grid container
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{ mb: 1 }}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid item>
                    <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
                </Grid>

                <Grid item>

                    <input 
                    type="file"
                    multiple 
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display: 'none'}}/>

                    <IconButton
                    onClick={() => fileInputRef.current.click()}
                    color="primary"
                    disabled={isSaving}
                    >
                        <UploadFileOutlined/>
                    </IconButton>

                    <Button 
                    disabled={ isSaving }
                    onClick={onSaveNote}
                    color="primary" 
                    sx={{ padding: 2 }}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                        Guardar
                    </Button>
                </Grid>

                <Grid container>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        placeholder="Ingrese Titulo"
                        label="Titulo"
                        sx={{ border: 'none', mb: 1 }}
                        name="title"
                        value={title}
                        onChange={onInputChange}
                    />

                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="¿Que secedió hoy"
                        minRows={5}
                        sx={{ border: 'none', mb: 1 }}
                        name="body"
                        value={body}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid container justifyContent={'end'}>
                    <Button
                    onClick={ onDelete }
                    sx={{mt: 2}}
                    color="error"
                    >
                        <DeleteOutlined/>
                        Borrar
                    </Button>
                </Grid>

                {/* Galeria de imagenes */}
                <ImageGallery images={note.imageUrls}/>

            </Grid>
        </>
    )
}
