import React from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material"
import { Link } from "react-router-dom"

// Dialog rendered at the end of every section that generally asks users if they want to continue to the next section

const FinishDialog = ({open, setOpen, title, content, cancelText, continueTo}) => {
    const close = () => setOpen(false)
    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions >
                <Button onClick={close} variant='outlined'>{cancelText}</Button>
                <Button component={Link} to={continueTo} variant="contained" sx={{ml: 1}}>Continue</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FinishDialog