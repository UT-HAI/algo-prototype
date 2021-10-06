import { AppBar as MuiAppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    user: {
        marginLeft: 'auto' // pushes to right
    }
}))


const AppBar = () => {
    const styles = useStyles();
    return <MuiAppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Name TBD
            </Typography>
            <Typography className={styles.user}>
                Participant 0
            </Typography>
        </Toolbar>
    </MuiAppBar>
}

export default AppBar;