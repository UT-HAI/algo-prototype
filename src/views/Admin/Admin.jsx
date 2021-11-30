import React, { useState, useEffect } from "react"
import { FlexContainer, FlexBox } from "../../util/components"
import AppBar from "../../components/AppBar"
import { Typography, Divider, Card, Button, Stack, FormGroup, FormControlLabel, Checkbox, Alert, Snackbar } from "@mui/material"
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { Link } from "react-router-dom";
import { useSelectionsUsers, useFeatures, useNotebookUsers } from "../../util/hooks/contextHooks";
import { deleteAllSelections } from "../../api/selections"
import AreYouSure from "./AreYouSure"
import { deleteAllNotebooks } from "../../api/notebook";
import { postTrain } from "../../api/ml";


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
    const [alert,setAlert] = useState(undefined)
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
    }, [features.length])
    const selectAll = () => setGroupSelection(Object.fromEntries(features.map(f => [f, true])))
    const handleGroupChange = (e) => {
        setGroupSelection({
          ...groupSelection,
          [e.target.name]: e.target.checked,
        });
      };
    const selectedFeatures = Object.keys(groupSelection).filter(f => groupSelection[f])
    const train = () =>
        postTrain(selectedFeatures)
        .then(() => {
            setAlert({
                message: 'Models successfully trained!',
                severity: 'success'
            })
            setAreYouSure(undefined)
        })
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
            button: <Button variant='contained' startIcon={<ModelTrainingIcon/>} onClick={train}>Train {selectionUsers.length + 1} models</Button>
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
            {/* <Box mt={2} display='flex' flexWrap='wrap' alignItems='flex-start' sx={{'& > *': { marginRight: '16px', marginBottom: '16px' }}}> */}
            <Stack direction='row' mt={2} spacing={2}>
                <Stack spacing={2}>
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
                </Stack>
                <ControlCard
                    title='Group Selection'
                    content={
                        <Stack alignItems='flex-start' spacing={1}>
                            <Typography gutterBottom>Select the features that the group has decided to include:</Typography>
                            <Button variant='outlined' size='small' onClick={selectAll}>Select all</Button>
                            <FormGroup>
                                {Object.entries(groupSelection).map(([feature, include]) => (
                                    <FormControlLabel
                                        control={<Checkbox checked={include} onChange={handleGroupChange} name={feature} sx={{py: '3px'}}/>}
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
                            disabled={selectedFeatures.length === 0}
                        >
                            Train {selectionUsers.length + 1} models
                        </Button>
                    ]}
                />
            </Stack>
            {/* </Box> */}
        </FlexContainer>
        <AreYouSure
            open={Boolean(areYouSure)}
            close={() => setAreYouSure(undefined)}
            text={areYouSure && confirmDialogs[areYouSure].text}
            confirmButton={areYouSure ? confirmDialogs[areYouSure].button : null}
        />
        <Snackbar
            open={Boolean(alert)}
            onClose={()=>setAlert(undefined)}
            anchorOrigin={{vertical:'bottom',horizontal:'center'}}
        >
            <Alert onClose={close} severity={alert?.severity}>
                {alert?.message}
            </Alert>
        </Snackbar>
    </>)
}

export default Admin