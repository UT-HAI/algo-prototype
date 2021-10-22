import React from "react"
import { FlexContainer, FlexBox } from "../../util/components"
import AppBar from "../../components/AppBar"
import { Typography, Divider, Grid, Card, Button } from "@mui/material"
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';

const mockIds = ['12345','67890','56473','00110']

const Admin = () => {
    return (<>
        <AppBar />
        <FlexContainer maxidth="lg" sx={{pt: 4}}>
                <Typography variant="h3" gutterBottom>Admin</Typography>
                <Divider sx={{width: '100%'}}/>
                <Card variant='outlined' sx={{px:3, py:2, mt: 4}}>
                    <FlexBox sx={{alignItems: 'flex-start'}}>
                        <Typography variant="h6" gutterBottom>Feature Selections</Typography>
                        <Grid container direction="column">
                            <Grid item><Typography gutterBottom>The following users have submitted selections:</Typography></Grid>
                            {mockIds.map(id => (
                                <Grid item><Typography color='textSecondary'>{id}</Typography></Grid>
                            ))}
                        </Grid>
                        <Button variant='contained' startIcon={<DownloadIcon/>} sx={{mt:2}}>Download (csv)</Button>
                    </FlexBox>
                </Card>
        </FlexContainer>
    </>)
}

export default Admin