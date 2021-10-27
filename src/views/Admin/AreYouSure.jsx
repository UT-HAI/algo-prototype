import React from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';


const AreYouSure = ({open, setOpen, onConfirm}) => (
    <Dialog open={open} onClose={close}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
            You're about to clear all participant selections from the database. This action is not reversible!
        </DialogContent>
        <DialogActions >
            <Button onClick={()=>setOpen(false)}>Cancel</Button>
            <Button onClick={onConfirm} startIcon={<DeleteIcon />} color='error' variant='contained'>Confirm (delete all)</Button>
        </DialogActions>
    </Dialog>
)

export default AreYouSure