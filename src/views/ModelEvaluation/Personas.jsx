import { Paper, Stack, Typography, Button, IconButton, Box, Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Tooltip } from "@mui/material"
import React, { useMemo, useState } from "react"
import Chip from "../../components/Chips"
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import RotateIcon from '@mui/icons-material/Cached';
import content from "../../content/modelEvalutation"
import { useData } from "../../util/hooks/contextHooks";
import { InfoIcon } from "../../components/InfoTip"

const greyProps = {
    backgroundColor: 'white',
    borderColor: '#E0E0E0'
}

const Filter = ({ label, onChange, val }) => (
    <Stack direction='row' justifyContent='space-between'>
        <Typography>{label}</Typography>
        <Stack direction='row' spacing={1}>
            <Chip color='admit' component={Button} clickable onClick={()=>onChange(true)} sx={ !val ? greyProps : undefined} label='Admit' />
            <Chip color='reject' component={Button} clickable onClick={()=>onChange(false)} sx={ val ? greyProps : undefined} label='Reject' />
        </Stack>
    </Stack>
)
const ResultFilter = ({ onNext, outcomeFilterLabels, outcomeFilterValues, setOutcomeFilters }) => {
    return (
        <Paper>
            <Stack spacing={3} width='100%' height='100%' px={2} py={3}>
                <Typography variant='h5'>Result Filter</Typography>
                <Stack spacing={1}>
                    {Object.keys(outcomeFilterLabels).map(l => (
                        <Filter label={outcomeFilterLabels[l]} val={outcomeFilterValues[l]} onChange={(val) => setOutcomeFilters(filters => ({ ...filters, [l]: val}))}/>
                    ))}
                </Stack>
                <Stack direction='row' alignSelf='center' spacing={2} /*marginTop='auto!important'*/>
                    <IconButton sx={{backgroundColor: '#3576CB4D', '&:hover': { backgroundColor: '#0a33684d'}}}><FilterIcon sx={{ color: 'black'}} /></IconButton>
                    <Button startIcon={<RotateIcon />} variant='contained' onClick={onNext}>Next Persona</Button>
                </Stack>
            </Stack>
        </Paper>
    )
}

const ResultSection = ({ label, pred, actual, numerator, denominator, color }) =>
    <Stack direction='row' spacing={1}>
        <Box width='3px' backgroundColor={color} borderRadius='3px' flexShrink={0}/>
        <Stack spacing={1}>
            <Stack direction='row' justifyContent='space-between'>
                <Typography>{label}</Typography>
                <Typography><strong>{content.confusion.quadrants[String(pred)+String(actual)]}</strong></Typography>
            </Stack>
            <Typography color='textSecondary'>
                In this model,&nbsp;
                <strong style={{color:'black'}}>{numerator}/{denominator} ({(numerator/denominator).toFixed(2) * 100}%) </strong>
                students were predicted to be&nbsp;
                <Box display='inline' color={content.confusion.colors[pred]} fontWeight={600}>{content.confusion.labels[pred]}</Box>
                &nbsp;and were actually&nbsp;
                <Box display='inline' color={content.confusion.colors[actual]} fontWeight={600}>{content.confusion.labels[actual]}</Box>.
            </Typography>
        </Stack>
    </Stack>
const Result = () => 
    <Paper>
        <Stack spacing={3} width='100%' height='100%' px={2} py={3}>
            <Typography variant='h5'>Result</Typography>
            <Stack spacing={1}>
                <ResultSection label='Your Model' confusion='True Positive' numerator={40} denominator={100} color='#F39C12' actual={true} pred={true}/>
                <ResultSection label='Group Model' confusion='True Positive' numerator={60} denominator={100} color='#8E44AD' actual={true} pred={true}/>
            </Stack>
        </Stack>
    </Paper>

const Confidence = ({ confidences }) =>
    <Box flexGrow={1}>
        <Box display='flex' position='relative' alignItems='center' my={3}>
            <Box width='100%' height='6px' borderRadius='20px' backgroundColor='primary.main' sx={{opacity: .2}}/>
            {confidences.map(({label, color, value},i) => 
                <Tooltip open={true} title={label} arrow placement={i % 2 === 0 ? 'top' : 'bottom'}>
                    <Box position='absolute' left={`${(value*100).toFixed(2)}%`} width='16px' height='16px' borderRadius='16px' backgroundColor={color} boxShadow={2}/>
                </Tooltip>
            )}
        </Box>
    </Box>

const Persona = ({ idx }) => {
    const { features } = useData()
    const confidences = useMemo(() => [Math.random(),Math.random()],[])
    return (
    <Paper sx={{flex: '60%'}}>
        <Stack px={2} py={3} maxHeight='100%' spacing={2}>
            <Stack direction='row' alignItems='center' spacing={2}>
                <Typography variant='h5'>Persona</Typography>
                <Typography color='textSecondary'>(#{idx})</Typography>
            </Stack>
            <TableContainer>
                <Table stickyHeader size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Feature</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.keys(features).map(f =>
                                <TableRow>
                                    <TableCell>{f}</TableCell>
                                    <TableCell>{features[f].data[idx]}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2}>
                <Typography variant='h5'>Model Confidence<InfoIcon inline text='sample text' sx={{opacity: .5}}/></Typography>
                {/* <Slider value={confidence*100} onChange={undefined} /> */}
                <Stack direction='row' spacing={2}>
                    <Stack alignItems='flex-end'>
                        <Typography>0%</Typography>
                        <Typography color='textSecondary'>(guess)</Typography>
                    </Stack>
                    <Confidence
                        confidences={[
                            { label: 'Your Model', color: '#F39C12', value: confidences[0] },
                            { label: 'Group Model', color: '#8E44AD', value: confidences[1] },
                        ]}
                    />
                    <Stack>
                        <Typography>100%</Typography>
                        <Typography color='textSecondary'>(sure)</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </Paper>
    )
}

const Personas = () => {
    const [persona, setPersona] = useState(0)
    const { rows } = useData()
    const outcomeLabels = {
        'actual': 'Actual',
        'your': 'Your Model',
        'group': 'Group Model'
    }
    const [outcomeFilters, setOutcomeFilters] = useState({
        'actual': true,
        'your': true,
        'group': true
    })
    return (
        <Stack direction='row' spacing={2} height='100%' padding={4}>
            <Stack flex='40%' spacing={2}>
                <ResultFilter outcomeFilterLabels={outcomeLabels} outcomeFilterValues={outcomeFilters} setOutcomeFilters={setOutcomeFilters} onNext={() => setPersona(Math.floor(Math.random()*rows))}/>
                <Result />
            </Stack>
            <Persona idx={persona}/>
        </Stack>
    )
}

export default Personas