import React, { useState } from "react"
import { Stack, Card, CardContent, Typography, IconButton, Collapse, Paper, Box, Tooltip } from "@mui/material"
import { useTheme } from "@mui/system";
import UpArrowIcon from '@mui/icons-material/KeyboardArrowUp';


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
            <CardContent>
                <img src={img} />
            </CardContent>
        </Collapse>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <CardContent>
                {content}
            </CardContent>
        </Collapse>
    </Card>

const toPercent = (decimal) => `${Math.round(decimal*100)}%`

const ConfusionBar = ({ title, subtitle, groupBy, groups, value, side, color }) => {
    const theme = useTheme()
    return (
    <Stack direction={side === 'left' ? 'row' : 'row-reverse'} flex='50%' spacing={1}>
        {/* text */}
        <Stack textAlign={side === 'left' ? 'right' : 'left'} alignItems={side === 'left' ? 'flex-end' : 'flex-start'} flex='50%'>
            <Typography>{title}</Typography>
            <Typography><strong>{groupBy ? toPercent(value[0] + value[1]) : toPercent(value)}</strong></Typography>
            <Typography color='textSecondary' fontSize='.8rem'>{subtitle}</Typography>
        </Stack>
        {/* bars */}
        <Stack direction={side === 'right' ? 'row' : 'row-reverse'} backgroundColor='grey.100' /*border='1px solid' borderColor='grey.300'*/ flex='50%' height='90px'>
            {groupBy ? <>
                <Tooltip title={`${groups[0]} - ${toPercent(value[0])}`}>
                    <Box flex={toPercent(value[0])} flexGrow={0} backgroundColor={color} sx={{'&:hover': { outline: `2px solid ${theme.palette.primary.main}`}}}/>
                </Tooltip>
                <Tooltip title={`${groups[1]} - ${toPercent(value[1])}`}>
                    <Box flex={toPercent(value[1])} flexGrow={0} backgroundColor={color} sx={{opacity: 0.5, '&:hover': { outline: `2px solid ${theme.palette.primary.main}` }}} />
                </Tooltip>
            </> :
            <Box flex={toPercent(value)} flexGrow={0} backgroundColor={color}/>
            }
        </Stack>
    </Stack>
    )
}
const ConfusionCard = ({ title, confusion, color, groupBy, groups }) => {
    return (
        <Paper>
            <Stack p={3} spacing={2}>
                <Stack direction='row' spacing={1}>
                    <Typography variant='h6'>{title}</Typography>
                    {groupBy ? <Typography variant='h6' color='textSecondary'>by {groupBy}</Typography> : null}
                </Stack>
                <Stack spacing={1}>
                    <Stack direction='row' spacing={1}>
                        <ConfusionBar title='True Positive' subtitle={<>Predict <Box display='inline' color='success.main' fontWeight={600}>Admit</Box>, Actually <Box display='inline' color='success.main' fontWeight={600}>Admit</Box></>} value={groupBy ? [.15, .15] : 0.30} side='left' color={color} groupBy={groupBy} groups={groups}/>
                        <ConfusionBar title='False Positive' subtitle={<>Predict <Box display='inline' color='success.main' fontWeight={600}>Admit</Box>, Actually <Box display='inline' color='error.main' fontWeight={600}>Reject</Box></>} value={groupBy ? [.05, .05] : 0.10} side='right' color={color} groupBy={groupBy} groups={groups}/>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                    <ConfusionBar title='False Negative' subtitle={<>Predict <Box display='inline' color='error.main' fontWeight={600}>Reject</Box>, Actually <Box display='inline' color='success.main' fontWeight={600}>Admit</Box></>} value={groupBy ? [.025, .025] : 0.05} side='left' color={color} groupBy={groupBy} groups={groups}/>
                        <ConfusionBar title='True Negative' subtitle={<>Predict <Box display='inline' color='error.main' fontWeight={600}>Reject</Box>, Actually <Box display='inline' color='error.main' fontWeight={600}>Reject</Box></>} value={groupBy ? [.275, .275] : 0.55} side='right' color={color} groupBy={groupBy} groups={groups}/>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}

const Dot = ({color, d, opacity}) => <Box width={d} height={d} borderRadius={d} backgroundColor={color} sx={{opacity}}/>
const Legend = ({ colors, labels }) => 
    <Paper sx={{alignSelf: 'flex-end'}}>
        <Stack direction='row' p={2} spacing={2}>
            {labels.map((label,i) =>
                <Stack direction='row' spacing={1} alignItems='center'>
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
    const groups = ['Gender', 'Gender'] // corresponds to fairness cards
    const groupValues = {
        'Gender': {
            'Male': ['Male'],
            'Female': ['Female']
        }
    }
    const groupBy = openIdx !== null ? groups[openIdx] : null
    return (
        <Stack direction='row' spacing={2} height='100%' padding={4}>
            <Stack flex='25%' spacing={2}>
               <FairnessCard title='1. Equal Opportunity' content='hello world' isOpen={openIdx === 0} open={(isOpen) => openOne(0,isOpen)} isCollapsed={openIdx !== 0 && openIdx !== null} />
               <FairnessCard title='2. Demographic Parity' content='hello world' isOpen={openIdx === 1} open={(isOpen) => openOne(1,isOpen)} isCollapsed={openIdx !== 1 && openIdx !== null} />
            </Stack>
            <Stack flex='75%' spacing={2}>
                <ConfusionCard title='Your Model' color='#F39C12' groupBy={groupBy} groups={groupBy && Object.keys(groupValues[groupBy])}/>
                <ConfusionCard title='Group Model' color='#8E44AD' groupBy={groupBy} groups={groupBy && Object.keys(groupValues[groupBy])}/>
                {groupBy && <Legend colors={['#F39C12','#8E44AD']} labels={Object.keys(groupValues[groupBy])} />}
            </Stack>
        </Stack>
    )
}

export default Fairness