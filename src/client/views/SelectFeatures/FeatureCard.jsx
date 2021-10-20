import React from "react";
import { Card, CardActionArea, Typography, Box } from "@mui/material"
import Check from '@mui/icons-material/CheckCircleOutline';
import Cross from '@mui/icons-material/CancelOutlined';
import { useFeatureSelection } from "../../util/hooks/contextHooks"

const selectedStyle = {
    // border: 1,
    borderColor: "primary.light",
    backgroundColor: "#E2F1FF",
    // backgroundColor: "grey.100",
    '& p':{
        fontWeight: 600
    }
}

const FeatureCard = ({ name, selected, onClick}) => {
    const [features] = useFeatureSelection()
    const selection = features[name]
    return (
        <Card variant='outlined' sx={{width: '150px', ...(selected ? selectedStyle : {}) }} elevation={selected ? 4 : 2}>
            <CardActionArea sx={{ py:1, px: 1.5, }} onClick={onClick}>
                <Typography>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    {name}
                    { selection === 'include' ? <Check color='success'/> :
                        selection === 'exclude' ? <Cross color='error'/> :
                        null}
                        </Box>
                </Typography>
            </CardActionArea>
        </Card>
    )
}

export default FeatureCard