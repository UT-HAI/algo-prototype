import React from "react"
import { FlexContainer, FlexBox } from "../../util/components"
import AppBar from "../../components/AppBar"
import { Typography, Divider, Grid, Card, Button, Stack } from "@mui/material"
import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import { Link } from "react-router-dom";
import { useSelectionsUsers } from "../../util/hooks/contextHooks";

const mockIds = ['12345','67890','56473','00110']

const Admin = () => {
    const users = useSelectionsUsers()
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
                        <Button
                            variant='contained'
                            startIcon={<DownloadIcon/>}
                            sx={{mt:2}}
                            component={Link}
                            to={'/api/selections'}
                            target="_blank"
                            download
                        >
                            Download (csv)
                        </Button>
                    </FlexBox>
                </Card>
        </FlexContainer>
    </>)
}

export default Admin