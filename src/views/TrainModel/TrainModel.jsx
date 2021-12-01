import React from "react"
import { Link } from "react-router-dom"
import { FlexContainer } from "../../util/components"
import { Typography, Button, Stack, Box } from "@mui/material"
import content from "../../content/trainModel"

const TrainModel = () => 
    <FlexContainer sx={{px: "48px !important", justifyContent: 'center'}} grow maxWidth="xl" >
        <Typography variant="h3" mb={2}>
            Training a Model
        </Typography>
        <Stack direction='row' spacing={3}>
            <Stack spacing={2} alignItems='flex-start'>
                <Box>{content.intro}</Box>
                    <Button component={Link} to='/steps/4' variant="contained" sx={{mt: 4}}>
                    Continue
                </Button>
            </Stack>
            <iframe src="https://player.vimeo.com/video/651866855?h=4ce3bd036d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="720" height="405" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullscreen title="demo" style={{flexShrink: 0}}></iframe>
        </Stack>
    </FlexContainer>

export default TrainModel