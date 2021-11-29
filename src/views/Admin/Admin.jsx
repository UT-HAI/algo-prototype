import React, { useState, useEffect } from "react"
import { FlexContainer, FlexBox } from "../../util/components"
import AppBar from "../../components/AppBar"
import { Typography, Divider, Grid, Card, Button, Stack, Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { Link } from "react-router-dom";
import { useSelectionsUsers, useFeatures, useNotebookUsers } from "../../util/hooks/contextHooks";
import { deleteAllSelections } from "../../api/selections"
import AreYouSure from "./AreYouSure"
import { deleteAllNotebooks } from "../../api/notebook";


const ControlCard = ({ title, content, buttons }) =>
    <Card variant='outlined' sx={{px:3, py:2}}>
        <FlexBox sx={{alignItems: 'flex-start'}}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            {content}
            <Stack direction='row' mt={3} spacing={1}>
                {buttons}
            </Stack>
        </FlexBox>
    </Card>

const Admin = () => {
    const selectionUsers = useSelectionsUsers()
    const notebookUsers = useNotebookUsers()
    const [areYouSure,setAreYouSure] = useState(undefined) // controls Are You Sure dialog?
    const deleteSelections = () => deleteAllSelections().then(() => window.location.reload(false))
    const deleteNotebooks = () => deleteAllNotebooks().then(() => window.location.reload(false))
    const deleteAll = () => Promise.all([deleteAllSelections(), deleteAllNotebooks()]).then(() => window.location.reload(false))
    const features = useFeatures()
    const [groupSelection, setGroupSelection] = useState({})
    useEffect(() => {
        setGroupSelection(Object.fromEntries(features.map(f => [f, false])))
    }, features.length)
    const handleGroupChange = (e) => {
        setGroupSelection({
          ...groupSelection,
          [e.target.name]: e.target.checked,
        });
      };
    const confirmDialogs = {
        'deleteFeatureSelection': {
            text: 'You\'re about to clear all participant selections from the database. This action is not reversible!',
            button: <Button onClick={deleteSelections} startIcon={<DeleteIcon />} color='error' variant='contained'>Confirm (delete all)</Button>
        },
        'deleteNotebooks': {
            text: 'You\'re about to clear all participant notebooks from the database. This action is not reversible!',
            button: <Button onClick={deleteNotebooks} startIcon={<DeleteIcon />} color='error' variant='contained'>Confirm (delete all)</Button>
        },
        'train': {
            text: 'Train model? (not sure yet if this will overwrite existing models)',
            button: <Button variant='contained' startIcon={<ModelTrainingIcon/>} onClick={()=>console.log('training!')}>Train {selectionUsers.length + 1} models</Button>
        },
        'deleteAll': {
            text: 'You\'re about to delete EVERYTHING (models, notebooks, participant selections) from the database. This action is not reversible',
            button: <Button onClick={deleteAll} startIcon={<DeleteForeverIcon />} variant='contained' color='error'>Delete ALL data</Button>
        },
    }
    return (<>
        <AppBar />
        <FlexContainer maxidth="lg" sx={{pt: 4}}>
            <Typography variant="h3" gutterBottom>Admin</Typography>
            <Divider sx={{width: '100%'}}/>
            <Button onClick={()=>setAreYouSure('deleteAll')} startIcon={<DeleteForeverIcon />} variant='contained' color='error' sx={{mt: 3}} >Delete all data</Button>
            <Box mt={2} display='flex' flexWrap='wrap' alignItems='flex-start' sx={{'& > *': { marginRight: '16px', marginBottom: '16px' }}}>
                <ControlCard
                    title='Feature Selections'
                    content={
                        <Stack>
                            <Typography gutterBottom>The following {selectionUsers.length} user(s) have submitted selections:</Typography>
                            {selectionUsers.map(id => (
                                <Typography color='textSecondary' key={id}>{id}</Typography>
                            ))}
                        </Stack>
                    }
                    buttons={[
                        <Button
                            variant='contained'
                            startIcon={<DownloadIcon/>}
                            component={Link}
                            to={'/api/selections/selections.csv'}
                            target="_blank"
                            download
                        >
                            Download (csv)
                        </Button>,
                        <Button
                            startIcon={<DeleteIcon/>}
                            color='error'
                            onClick={()=>setAreYouSure('deleteFeatureSelection')}
                            variant='outlined'
                        >
                            Delete all
                        </Button>
                    ]}
                />
                <ControlCard
                    title='Notebooks'
                    content={
                        <Stack>
                            <Typography gutterBottom>The following {notebookUsers.length} user(s) have submitted selections:</Typography>
                            {notebookUsers.map(id => (
                                <Typography color='textSecondary' key={id}>{id}</Typography>
                            ))}
                        </Stack>
                    }
                    buttons={[
                        <Button
                            variant='contained'
                            startIcon={<DownloadIcon/>}
                            component={Link}
                            to={'/api/notebooks/notebooks.csv'}
                            target="_blank"
                            download
                        >
                            Download (csv)
                        </Button>,
                        <Button
                            startIcon={<DeleteIcon/>}
                            color='error'
                            onClick={()=>setAreYouSure('deleteNotebooks')}
                            variant='outlined'
                        >
                            Delete all
                        </Button>
                    ]}
                />
                <ControlCard
                    title='Group Selection'
                    content={
                        <Stack>
                            <Typography gutterBottom>Select the features that the group has decided to include:</Typography>
                            <FormGroup sx={{flexWrap: 'wrap', maxHeight: '400px'}}>
                                {Object.entries(groupSelection).map(([feature, include]) => (
                                    <FormControlLabel
                                        control={<Checkbox checked={include} onChange={handleGroupChange} name={feature} />}
                                        label={feature}
                                    />
                                ))}
                            </FormGroup>
                        </Stack>
                    }
                    buttons={[
                        <Button
                            variant='contained'
                            startIcon={<ModelTrainingIcon/>}
                            onClick={()=>setAreYouSure('train')}
                        >
                            Train {selectionUsers.length + 1} models
                        </Button>
                    ]}
                />
            </Box>
        </FlexContainer>
        <AreYouSure
            open={Boolean(areYouSure)}
            close={() => setAreYouSure(undefined)}
            text={areYouSure && confirmDialogs[areYouSure].text}
            confirmButton={areYouSure ? confirmDialogs[areYouSure].button : null}
        />
    </>)
}

export default Admin