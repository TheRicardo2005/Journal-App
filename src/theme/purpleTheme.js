import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const pupleTheme = createTheme({
    palette:{
        primary:{
            main: '#1a2434'
        },
        secondary:{
            main: '#543884'
        },
        error:{
            main: red.A400
        }
    }
})