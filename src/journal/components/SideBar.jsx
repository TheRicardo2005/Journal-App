import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { siderBarItem } from "./siderBarItem";


export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
    // ['Enero', 'Febrero', 'Marzo', 'Abril']

  return (
    <>
        <Box
        component={'nav'}
        sx={{width: {sm: drawerWidth}, flexShrink:{ sm: 0}}}
        >
            <Drawer 
            variant="permanent"
            open
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
            }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        { displayName }
                    </Typography>
                </Toolbar>
                <Divider/>

                <List>
                    {
                        notes.map(note => (
                            <siderBarItem key={note.id} {...note}/>
                        ))
                    }
                </List>

            </Drawer>


        </Box>
    </>
  ) 
}
