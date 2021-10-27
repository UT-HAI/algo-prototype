import React from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material"
import { Link } from "react-router-dom"

const FinishDialog = ({open, setOpen}) => {
    const close = () => setOpen(false)
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Selections submitted!</DialogTitle>
            <DialogContent>
                <p>Your feature selections have been submitted. If you'd like, you can go back and change them (you must submit again).</p>
                <p>Otherwise, please wait to click Continue until the moderator asks you.</p>
            </DialogContent>
            <DialogActions >
                <Button onClick={close} variant='outlined'>I want to change my selections</Button>
                <Button component={Link} to="/steps/3" variant="contained" sx={{ml: 1}}>Continue</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FinishDialog