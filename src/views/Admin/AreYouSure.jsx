import React from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material"


const AreYouSure = ({open, close, text, confirmButton}) => (
    <Dialog open={open} onClose={close}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
            {text}
        </DialogContent>
        <DialogActions >
            <Button onClick={close}>Cancel</Button>
            {confirmButton}
        </DialogActions>
    </Dialog>
)

export default AreYouSure