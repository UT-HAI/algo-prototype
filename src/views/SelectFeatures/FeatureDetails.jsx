import React from "react"
import { Card, Grid, Typography, Box, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { FlexBox } from "../../util/components"
import Histogram from "../../components/Histogram"
import { useSessionStore } from "../../util/hooks/useStorage"
import { useFeatureSelection } from "../../util/hooks/contextHooks"
import { simple } from "../../data/mockData"
import Chip from "../../components/Chips"
import LineIcon from '@mui/icons-material/TimelineOutlined';
import BarIcon from '@mui/icons-material/BarChartOutlined';

const Statistic =  ({name, number}) => 
    <FlexBox sx={{alignItems: "center"}}>
        <Typography color="textPrimary" fontSize={24}>{number}</Typography>
        <Typography color="textSecondary" fontSize={14}>{name}</Typography>
    </FlexBox>


const FeatureDetails = ({ name, data }) => {
    const [features, select] = useFeatureSelection();
    const selection = features[name]
    const chipProps = simple[name].type == 'numerical' ?
        { color: 'purple', icon: <LineIcon/>} :
        { color: 'green', icon: <BarIcon/>}
    return (
        <Card variant='outlined' sx={{width: '0', flex: 1, maxWidth: '600px', p: 2, overflow: 'visible'/*for the tooltips*/}}>
            <FlexBox sx={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography variant="h5" gutterBottom>{name}</Typography>
                <Chip label={simple[name].type} {...chipProps}/>
            </FlexBox>
            <Typography sx={{mb: 3}} fontSize={14} color='textSecondary'>{simple[name].description}</Typography>
            {/* histogram */}
            <Box sx={{width: '100%', height: '250px'}}>
                <Histogram data={data} name={name} />
            </Box>
            {/* min, max, average, and median stats */}
            {simple[name].type === 'numerical' &&
                <Grid container columns={4} spacing={3} sx={{pt: 1}}>
                    {["min","max","average","median"].map(stat => 
                        <Grid item xs={1}>
                            <Statistic name={stat} number={data[stat]} />
                        </Grid>    
                    )}
                </Grid>
            }   
            <Divider sx={{mt: 3}}/>
            <Box mt={2} ml={1}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Selection</FormLabel>
                <RadioGroup
                    row
                    aria-label="feature selection"
                    name="radio-buttons-group"
                    value={selection ?? null}
                    onChange={(e) => { select(name,e.target.value) }}
                >
                    <FormControlLabel value="include" control={<Radio />} label="include" />
                    <FormControlLabel value="exclude" control={<Radio />} label="exclude" />
                </RadioGroup>
                </FormControl>
            </Box>
        </Card>
    )
}

export default FeatureDetails