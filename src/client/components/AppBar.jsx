import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import React from "react";


// top bar with title and participant name
const AppBar = () => {
    return (
    <MuiAppBar position="static" sx={{zIndex: 0}}>
        <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Name TBD
            </Typography>
            <Typography sx={{marginLeft: 'auto'}/*floats to right*/}>
                Participant 0
            </Typography>
        </Toolbar>
    </MuiAppBar>)
}

export default AppBar;