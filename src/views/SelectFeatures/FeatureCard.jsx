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
    const selection = features[name].decision
    return (
        <Card variant='outlined' sx={{width: '200px', flex: '1 0 auto', ...(selected ? selectedStyle : {}), direction: 'ltr' }}>
            <CardActionArea sx={{ py:1, px: 1.5, }} onClick={onClick}>
                <Typography sx={{fontSize: '14px', display: 'flex', justifyContent: 'space-between'}}>
                    {name}
                    { selection === 'include' ? <Check color='success' sx={{fontSize:'1.5em'}}/> :
                        selection === 'exclude' ? <Cross color='error' sx={{fontSize:'1.5em'}}/> :
                        null}
                </Typography>
            </CardActionArea>
        </Card>
    )
}

export default FeatureCard