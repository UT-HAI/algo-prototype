import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import { useId } from "../util/hooks/contextHooks"

// top bar with title and participant name
const AppBar = () => {
    const [id] = useId()
    return (
    <MuiAppBar position="static" sx={{zIndex: 0}}>
        <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Name TBD
            </Typography>
            {id ? <Typography sx={{marginLeft: 'auto'}/*floats to right*/}>
                Participant {id}
            </Typography> : null}
        </Toolbar>
    </MuiAppBar>)
}

export default AppBar;