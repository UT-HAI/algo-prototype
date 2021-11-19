import React from "react"
import { Drawer, IconButton, Stack, Typography, Tooltip, Button, List, ListItem, Divider, Box } from "@mui/material"
import { FlexBox } from "../util/components"
import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';
import { useNotebook } from "../util/hooks/contextHooks";
import content from "../content/exploreData"

// tab isn't displayed until notebook is loaded
export const NotebookTab = ({ onClick, bottomOffset }) => {
    const [notebook] = useNotebook()
    return (
        <Tooltip title='Open notebook'>
            <Button
                variant='contained'
                onClick={onClick} 
                sx={{
                    display: notebook.status !== 'full' ? 'none' : undefined,
                    position: 'absolute',
                    left: 0,
                    bottom: bottomOffset,
                    minWidth: 0,
                    padding: 1,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                }}
            >
                <BookIcon />
            </Button>
        </Tooltip>
    )
}

const Response = ({ question, response }) => (
    <Box>
        <Typography color='textSecondary' gutterBottom>{question}</Typography>
        <Typography>{response}</Typography>
    </Box>
)

const Notebook = ({ open, onClose }) => {
    const [notebook] = useNotebook()
    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={onClose}
            variant='persistent'
            PaperProps={{
                sx: {
                    position: 'absolute',
                    border: 'none',
                    width: '100%',
                    zIndex: 2000,
                }
            }}
        >
            <FlexBox sx={{px:2, py:3}}>
                <Stack direction="row" justifyContent='space-between' mb={4}>
                    <Typography variant='h4'>Notebook</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Stack>
                <Stack spacing={6}>
                    {/* Goals */}
                    <Stack spacing={2}>
                        <Typography variant='h5'>Goals</Typography>
                        <Response question={content.questions[0]} response={notebook.q1} />
                        <Response question={content.questions[1]} response={notebook.q2} />
                    </Stack>
                    {/* Rules */}
                    <Stack>
                        <Typography variant='h5' gutterBottom>Rules</Typography>
                        <List>
                            <Divider component='li' />
                            {notebook.rules.map(rule => (<>
                                <ListItem>{rule}</ListItem>
                                <Divider component='li' />
                            </>))}
                        </List>
                    </Stack>
                </Stack>
            </FlexBox>
        </Drawer>
    )
}

export default Notebook