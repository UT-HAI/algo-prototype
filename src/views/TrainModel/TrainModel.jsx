import React from "react"
import { Link } from "react-router-dom"
import { FlexContainer } from "../../util/components"
import { Typography, Button, Stack } from "@mui/material"
import content from "../../content/trainModel"

const TrainModel = () => 
    <FlexContainer sx={{px: "48px !important", justifyContent: 'center'}} grow maxWidth="md" >
        <Typography variant="h3" mb={2}>
            Training a Model
        </Typography>
        <Stack direction='row' spacing={3}>
            <Box>{content.intro}</Box>
            <Box width='528px' height='305px' backgroundColor='grey.200'/>
        </Stack>
        <Button component={Link} to='/steps/4' variant="contained" sx={{mt: 4}}>
            Continue
        </Button>
    </FlexContainer>

export default TrainModel