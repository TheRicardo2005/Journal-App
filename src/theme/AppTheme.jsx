import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { pupleTheme } from "./"


export const AppTheme = ({ children }) => {
  return (
    <>

        <ThemeProvider theme={ pupleTheme}>
            <CssBaseline/>
            { children }
        </ThemeProvider>

    </>
  )
}
