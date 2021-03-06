import React, { useState } from "react"
import { Dialog, DialogContent, Typography, Box, TextField, Button } from "@mui/material"
import { useId } from "../util/hooks/contextHooks"

// Dialog that prompts users for a particpant ID

export const IdForm = () => {
    const [id,setId] = useId()
    const [text, setText] = useState('')
    return (
        <Dialog open={!id}>
            <DialogContent>
                <Typography gutterBottom>Enter participant ID</Typography>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="id"
                        label="Participant ID"
                        variant="outlined"
                        value={text}
                        onChange={(e)=>setText(e.target.value)}
                        sx={{flexGrow: 1, mr: 2}}
                    />
                    <Button variant="contained" onClick={()=>setId(text)} sx={{flexGrow: 1}}>OK</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )

}

export default IdForm