import React, { useMemo, useState } from "react"
import { Stack, Card, CardContent, Typography, IconButton, Collapse, Paper, Box, Tooltip } from "@mui/material"
import { useTheme } from "@mui/system";
import UpArrowIcon from '@mui/icons-material/KeyboardArrowUp';
import EqualOpportunity from "../../assets/EqualOpportunity.png"
import DemographicParity from "../../assets/DemographicParity.png"
import content from "../../content/modelEvalutation"
import { useData, useModels } from "../../util/hooks/contextHooks";
import { confusion } from "../../util/math";
import { DoNotDisturbOnTotalSilence } from "@mui/icons-material";


const FairnessCard = ({ title, img, content, isOpen, open, isCollapsed }) =>
    <Card>
        <CardContent>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6'>{title}</Typography>
                <IconButton onClick={()=>open(!isOpen)} sx={{transform: !isOpen ? 'rotate(180deg)' : '', transition: '300ms ease-out'}}>
                    <UpArrowIcon />
                </IconButton>
            </Stack>
        </CardContent>
        <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
            <CardContent sx={{py: '0!important', display: 'flex'}}>
                <img src={img} style={{width: '100%', maxWidth: '250px', margin: 'auto'}}/>
            </CardContent>
        </Collapse>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <CardContent sx={{fontSize: '0.8rem', lineHeight: '1.2em', py: '0!important', '& ul': { paddingLeft: '20px', marginTop: 0 }}}>
                {content}
            </CardContent>
        </Collapse>
    </Card>

const toPercent = (decimal) => `${Math.round(decimal*100)}%`

const ConfusionBar = ({ title, subtitle, groupBy, groups, value, side, color, total }) => {
    const theme = useTheme()
    const sum = groupBy ? value[0] + value[1] : value
    return (
    <Stack direction={side === 'left' ? 'row' : 'row-reverse'} flex='50%' spacing={1}>
        {/* text */}
        <Stack textAlign={side === 'left' ? 'right' : 'left'} alignItems={side === 'left' ? 'flex-end' : 'flex-start'} flex='50%'>
            <Typography>{title}</Typography>
            <Typography><strong>{Math.round(sum*total)} ({toPercent(sum)})</strong></Typography>
            <Typography color='textSecondary' fontSize='.8rem'>{subtitle}</Typography>
        </Stack>
        {/* bars */}
        <Stack direction={side === 'right' ? 'row' : 'row-reverse'} backgroundColor='grey.100' /*border='1px solid' borderColor='grey.300'*/ flex='50%' height='90px'>
            {groupBy ? <>
                <Tooltip title={`${groups[0]} - ${Math.round(value[0]*total)} (${toPercent(value[0])})`}>
                    <Box flex={toPercent(value[0])} flexGrow={0} backgroundColor={color} sx={{'&:hover': { outline: `2px solid ${theme.palette.primary.main}`}}}/>
                </Tooltip>
                <Tooltip title={`${groups[1]} - ${Math.round(value[1]*total)} (${toPercent(value[1])})`}>
                    <Box flex={toPercent(value[1])} flexGrow={0} backgroundColor={color} sx={{opacity: 0.5, '&:hover': { outline: `2px solid ${theme.palette.primary.main}` }}} />
                </Tooltip>
            </> :
            <Box flex={toPercent(value)} flexGrow={0} backgroundColor={color}/>
            }
        </Stack>
    </Stack>
    )
}
const ConfusionCard = ({ title, confusion, color, groupBy, groups, total, bottomText }) => {
    return (
        <Paper>
            <Stack p={3} spacing={2}>
                <Stack direction='row' spacing={1}>
                    <Typography variant='h6'>{title}</Typography>
                    {groupBy ? <Typography variant='h6' color='textSecondary'>by {groupBy}</Typography> : null}
                </Stack>
                <Stack spacing={1}>
                    <Stack direction='row' spacing={1}>
                        <ConfusionBar title='True Positive' subtitle={<>Predict <Box display='inline' color='success.main' fontWeight={600}>Admit</Box>, Actually <Box display='inline' color='success.main' fontWeight={600}>Admit</Box></>} value={confusion.tp} side='left' color={color} groupBy={groupBy} groups={groups} total={total}/>
                        <ConfusionBar title='False Positive' subtitle={<>Predict <Box display='inline' color='success.main' fontWeight={600}>Admit</Box>, Actually <Box display='inline' color='error.main' fontWeight={600}>Reject</Box></>} value={confusion.fp} side='right' color={color} groupBy={groupBy} groups={groups} total={total}/>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                    <ConfusionBar title='False Negative' subtitle={<>Predict <Box display='inline' color='error.main' fontWeight={600}>Reject</Box>, Actually <Box display='inline' color='success.main' fontWeight={600}>Admit</Box></>} value={confusion.fn} side='left' color={color} groupBy={groupBy} groups={groups} total={total}/>
                        <ConfusionBar title='True Negative' subtitle={<>Predict <Box display='inline' color='error.main' fontWeight={600}>Reject</Box>, Actually <Box display='inline' color='error.main' fontWeight={600}>Reject</Box></>} value={confusion.tn} side='right' color={color} groupBy={groupBy} groups={groups} total={total}/>
                    </Stack>
                </Stack>
                {bottomText && bottomText(confusion, groups)}
            </Stack>
        </Paper>
    )
}

const Dot = ({color, d, opacity}) => <Box width={d} height={d} borderRadius={d} backgroundColor={color} sx={{opacity}}/>
const Legend = ({ colors, labels }) => 
    <Paper sx={{alignSelf: 'flex-end'}}>
        <Stack direction='row' p={2} spacing={2}>
            {labels.map((label,i) =>
                <Stack direction='row' spacing={1} alignItems='center' key={label}>
                    <Dot d='16px' color={colors[0]} opacity={i === 0 ? 1 : 0.5}/>
                    <Dot d='16px' color={colors[1]} opacity={i === 0 ? 1 : 0.5}/>
                    <Typography>{label}</Typography>
                </Stack>
            )}
        </Stack>
    </Paper>

const Fairness = () => {
    const [openIdx, setOpen] = useState(null)
    const openOne = (i, isOpen) => setOpen(isOpen ? i : null)
    const groups = ['Gender', 'Ethnicity'] // corresponds to fairness cards
    const groupValues = {
        'Gender': {
            'Male': ['Male'],
            'Female': ['Female']
        },
        'Ethnicity': {
            'White': ['White'],
            'Non-White': ['Asian','Hispanic','Black or African American','American Indian or Alaska Native','Native Hawaiian or Other Pacific Islander','Not Reported']
        }
    }
    const groupBy = openIdx !== null ? groups[openIdx] : null

    const { features, ids, rows, target } = useData()
    const { models } = useModels()
    const testIds = useMemo(() => Object.keys(models['group'].predictions).map(id => parseInt(id)), [models.id]) // we want to only sample from ids that are in the test set
    // creates two length tuple, each element is a list of {idx,id} objects corresponding to the rows that match the groupBy value
    const groupData = useMemo(() => groupBy ? Object.values(groupValues[groupBy]).map(values => {
        // need index and id
        const group = []
        features[groupBy].data.forEach((val,i) => {
            const id = ids[i]
            if (values.includes(val) && testIds.includes(id)){
                group.push({idx: i, id})
            }
        })
        return group
    }) : undefined
    ,[models.id, groupBy])
    const y_actual = useMemo(() =>
        target.data.map(code => code === 'Admit')
    ,[rows])
    
    const getMatrix = (key) => {
        const matrix = {}
        const split = [confusion(y_actual,models[key].predictions,groupData[0],testIds.length),confusion(y_actual,models[key].predictions,groupData[1],groupData[0].length+groupData[1].length)]
        Object.keys(split[0]).map(quadrant => {
            matrix[quadrant] = [split[0][quadrant], split[1][quadrant]]
        })
        return matrix
    }

    const confusionMatrix = useMemo(() => ({
        your: groupBy ? getMatrix('your') : models.your.metrics,
        group: groupBy ? getMatrix('group') : models.group.metrics,
    }),[rows,groupBy])

    const bottomTexts = {
        equalOpportunity: (matrix, values) =>
            <Stack alignItems='center'>
                <Typography><b>Equal Opportunity</b></Typography>
                <Typography fontSize='0.8rem'>{toPercent(matrix.tp[0]/(matrix.tp[0]+matrix.fn[0]))} of qualified {values[0]}s accepted</Typography>
                <Typography fontSize='0.8rem' color='textSecondary'>vs.</Typography>
                <Typography fontSize='0.8rem'>{toPercent(matrix.tp[1]/(matrix.tp[1]+matrix.fn[1]))} of qualified {values[1]}s accepted</Typography>
            </Stack>,
        demographicParity: (matrix, values) =>
            <Stack alignItems='center'>
                <Typography><b>Demographic Parity</b></Typography>
                <Typography fontSize='0.8rem'>{toPercent((matrix.tp[0]+matrix.fp[0])/(matrix.tp[0]+matrix.fp[0]+matrix.tn[0]+matrix.fn[0]))} of {values[0]}s accepted</Typography>
                <Typography fontSize='0.8rem' color='textSecondary'>vs.</Typography>
                <Typography fontSize='0.8rem'>{toPercent((matrix.tp[1]+matrix.fp[1])/(matrix.tp[1]+matrix.fp[1]+matrix.tn[1]+matrix.fn[1]))} of {values[1]}s accepted</Typography>
            </Stack>
    }

    const bottomText = openIdx === 0 ? bottomTexts.equalOpportunity: openIdx === 1 ? bottomTexts.demographicParity : undefined

    const total = testIds.length

    return (
        <Stack direction='row' spacing={2} height='100%' padding={4}>
            <Stack width='35%' spacing={2}>
                <FairnessCard
                    title='1. Equal Opportunity'
                    content={content.equalOpportunity}
                    img={EqualOpportunity}
                    isOpen={openIdx === 0}
                    open={(isOpen) => openOne(0,isOpen)}
                    isCollapsed={openIdx !== 0 && openIdx !== null}
                />
               <FairnessCard
                    title='2. Demographic Parity'
                    content={content.demographicParity}
                    img={DemographicParity}
                    isOpen={openIdx === 1}
                    open={(isOpen) => openOne(1,isOpen)}
                    isCollapsed={openIdx !== 1 && openIdx !== null}
                />
            </Stack>
            <Stack width='65%' spacing={2}>
                <ConfusionCard
                    title='Your Model' color='#F39C12'
                    groupBy={groupBy}
                    groups={groupBy && Object.keys(groupValues[groupBy])}
                    confusion={confusionMatrix.your}
                    bottomText={bottomText}
                    total={total}
                />
                <ConfusionCard
                    title='Group Model' color='#8E44AD'
                    groupBy={groupBy}
                    groups={groupBy && Object.keys(groupValues[groupBy])}
                    confusion={confusionMatrix.group}
                    bottomText={bottomText}
                    total={total}
                />
                {groupBy && <Legend colors={['#F39C12','#8E44AD']} labels={Object.keys(groupValues[groupBy])} />}
            </Stack>
        </Stack>
    )
}

export default Fairness