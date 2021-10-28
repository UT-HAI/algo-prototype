import React, { useCallback, useState } from "react"
import { Card, Typography, Box, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Stack, Checkbox, TextField } from "@mui/material"
import { FlexBox } from "../../util/components"
import Univariate from "../../components/Univariate"
import { useFeatureSelection, useData } from "../../util/hooks/contextHooks"
import Chip from "../../components/Chips"
import LineIcon from '@mui/icons-material/TimelineOutlined';
import BarIcon from '@mui/icons-material/BarChartOutlined';
import debounce from "lodash.debounce"

// card that represents the details, visualization, and selection decision of one feature

const round = (number, sigfigs) => Number(number.toFixed(sigfigs ?? 2))

const Statistic =  ({name, number, sigfigs}) => 
    <FlexBox sx={{alignItems: "center"}}>
        <Typography color="textPrimary" fontSize={24}>{round(number, sigfigs).toLocaleString()}</Typography>
        <Typography color="textSecondary" fontSize={14}>{name}</Typography>
    </FlexBox>

const FeatureDetails = ({ name, data }) => {
    const [selections, select] = useFeatureSelection();
    const { decision, reason, sure } = selections[name]
    const [text, setText] = useState('')
    useEffect(() => {
        setText(reason)
    },[name])
    const debounceReason = useCallback(debounce((txt)=> select(name, { reason:txt }),1000), [name])
    const onReasonChange = (e) => { debounceReason(e.target.value); setText(e.target.value)}
    const { features } = useData()
    const chipProps = features[name].type == 'numerical' ?
        { color: 'purple', icon: <LineIcon/>} :
        { color: 'green', icon: <BarIcon/>}
    return (
        <Card variant='outlined' sx={{width: '0', flex: 1, maxWidth: '600px', p: 2, overflow: 'visible'/*for the tooltips*/}}>
            <FlexBox sx={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography variant="h5" gutterBottom>{name}</Typography>
                <Chip label={features[name].type} {...chipProps}/>
            </FlexBox>
            <Typography sx={{mb: 3}} fontSize={14} color='textSecondary'>{features[name].description}</Typography>
            {/* histogram */}
            <Box sx={{width: '100%', height: '250px'}}>
                <Univariate data={data} name={name} />
            </Box>
            {/* min, max, average, and median stats */}
            {features[name].type === 'numerical' ?
                <Stack direction="row" justifyContent='center' spacing={6} pt={1}>
                    {["min","max","mean","median"].map(stat => 
                        <Statistic name={stat} number={data[stat]} sigfigs={data['sigfigs']} key={stat}/>
                    )}
                </Stack> :
                <Statistic name={'unique values'} number={data['unique']} />
            }   
            <Divider sx={{mt: 3}}/>
            <Stack mt={2} ml={1} spacing={1}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Selection</FormLabel>
                    <RadioGroup
                        row
                        aria-label="feature selection"
                        name="radio-buttons-group"
                        value={decision ?? null}
                        onChange={(e) => select(name, { decision: e.target.value })}
                    >
                        <FormControlLabel value="include" control={<Radio />} label="include" />
                        <FormControlLabel value="exclude" control={<Radio />} label="exclude" />
                    </RadioGroup>
                </FormControl>
                <FormControlLabel checked={!sure} onChange={(e)=>select(name, { sure: !e.target.checked })} control={<Checkbox />} label="I'm not sure about this decision" />
                <TextField
                    label="Reason for decision"
                    multiline
                    maxRows={4}
                    value={text}
                    onChange={onReasonChange}
                />
            </Stack>
        </Card>
    )
}

export default FeatureDetails