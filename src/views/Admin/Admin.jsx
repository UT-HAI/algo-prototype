import React, { useState } from "react"
import { FlexContainer, FlexBox } from "../../util/components"
import AppBar from "../../components/AppBar"
import { Typography, Divider, Grid, Card, Button, Stack } from "@mui/material"
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { useSelectionsUsers } from "../../util/hooks/contextHooks";
import { deleteAllSelections } from "../../api/selections"
import AreYouSure from "./AreYouSure"

const Admin = () => {
    const users = useSelectionsUsers()
    const [areYouSure,setAreYouSure] = useState(false) // controls Are You Sure dialog?
    const deleteAll = () => deleteAllSelections().then(() => window.location.reload(false))
    return (<>
        <AppBar />
        <FlexContainer maxidth="lg" sx={{pt: 4}}>
                <Typography variant="h3" gutterBottom>Admin</Typography>
                <Divider sx={{width: '100%'}}/>
                <Card variant='outlined' sx={{px:3, py:2, mt: 4}}>
                    <FlexBox sx={{alignItems: 'flex-start'}}>
                        <Typography variant="h6" gutterBottom>Feature Selections</Typography>
                        <Stack>
                            <Typography gutterBottom>The following {users.length} user(s) have submitted selections:</Typography>
                            {users.map(id => (
                                <Typography color='textSecondary' key={id}>{id}</Typography>
                            ))}
                        </Stack>
                        <Stack direction='row' mt={3} spacing={1}>
                            <Button
                                variant='contained'
                                startIcon={<DownloadIcon/>}
                                component={Link}
                                to={'/api/selections/selections.csv'}
                                target="_blank"
                                download
                            >
                                Download (csv)
                            </Button>
                            <Button
                                startIcon={<DeleteIcon/>}
                                color='error'
                                onClick={()=>setAreYouSure(true)}
                                variant='outlined'
                            >
                                Delete all
                            </Button>
                        </Stack>
                    </FlexBox>
                </Card>
        </FlexContainer>
        <AreYouSure open={areYouSure} setOpen={setAreYouSure} onConfirm={deleteAll}/>
    </>)
}

export default Admin