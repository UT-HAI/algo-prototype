import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography, Tooltip } from "@mui/material";
import { useId } from "../util/hooks/contextHooks"

// top bar with title and participant name
const AppBar = () => {
    const [id, setId] = useId()
    return (
    <MuiAppBar position="static" sx={{zIndex: 0}}>
        <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Name TBD
            </Typography>
            {id ? 
            <Tooltip title='Change ID'>
                <Typography sx={{marginLeft: 'auto'/*floats to right*/, cursor: 'pointer'}} onClick={()=>setId(undefined)}>
                    Participant {id}
                </Typography>
            </Tooltip>
             : null}
        </Toolbar>
    </MuiAppBar>)
}

export default AppBar;