import { Paper, Stack, Typography, Button, IconButton, Box, Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Tooltip, Popover, TextField, MenuItem, Slider, Divider, Badge } from "@mui/material"
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

// "Persona Filter" box 

const Filter = ({ label, onChange, val }) => (
    <Stack direction='row' justifyContent='space-between'>
        <Typography>{label}</Typography>
        <Stack direction='row' spacing={1}>
            <Chip color='admit' component={Button} clickable onClick={()=>onChange(true)} sx={ !val ? greyProps : undefined} label='Admit' />
            <Chip color='reject' component={Button} clickable onClick={()=>onChange(false)} sx={ val ? greyProps : undefined} label='Reject' />
        </Stack>
    </Stack>
)
const ValueSelect = ({ featureName, value, setFilterValue }) => {
    const { features } = useData()
    const feature = features[featureName]
    if (featureName === null) return null
    if (feature.type === 'categorical') {
        return (
            <TextField select size='small' value={value} onChange={e => setFilterValue(e.target.value)}>
                { Object.keys(feature.counts).map(val => (
                    val === 'other' ? null :
                    <MenuItem value={val}>{val}</MenuItem>
                ))}
            </TextField>
        )
    }
    return <Slider
        value={value}
        onChange={(_,val) => setFilterValue(val)}
        min={feature.min} max={feature.max}
        valueLabelDisplay='auto'
        marks={[{value: feature.min, label: feature.min},{value: feature.max, label: feature.max}]}
        step={(feature.max - feature.min < 10 ? 0.1 : 1)}
        sx={{mx: '16px !important', width: '200px'}}
    />
}
const FeatureFilter = ({ anchorEl, setAnchorEl, filters, setFilter, setFilterValue }) => {
    const { features } = useData()
    const featureNames = Object.keys(features)
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            sx={{mt: 1}}
        >
            <Stack p={3} spacing={2} width='450px'>
                <Typography variant='h6'>Filter personas by feature values</Typography>
                <Typography color='textSecondary' sx={{fontSize: '.8rem', mb: 2}}>Choose up to 2 features to filter for generated personas. Once you've selected a feature name, you can adjust the values you want to include.</Typography>
                {/* feature filter 1 */}
                <Stack direction='row' spacing={1}>
                    <TextField select size='small' value={filters[0].feature} onChange={e => setFilter(0, e.target.value)} sx={{minWidth: '100px'}}>
                        <MenuItem value={null} sx={{color: 'text.secondary'}}>None</MenuItem>
                        { featureNames.map(f => f === filters[1].feature ? null :
                            <MenuItem value={f}>{f}</MenuItem>
                        )}
                    </TextField>
                    <ValueSelect featureName={filters[0].feature} value={filters[0].value} setFilterValue={(val) => setFilterValue(0,val)} />
                </Stack>
                <Divider />
                {/* feature filter 2 */}
                <Stack direction='row' spacing={1}>
                    <TextField select size='small' value={filters[1].feature} onChange={e => setFilter(1, e.target.value)} sx={{minWidth: '100px'}}>
                        <MenuItem value={null} sx={{color: 'text.secondary'}}>None</MenuItem>
                        { featureNames.map(f => f === filters[0].feature ? null :
                            <MenuItem value={f}>{f}</MenuItem>
                        )}
                    </TextField>
                    <ValueSelect featureName={filters[1].feature} value={filters[1].value} setFilterValue={(val) => setFilterValue(1,val)} />
                </Stack>
                
                <Button onClick={()=>setAnchorEl(null)}>Close</Button>
            </Stack>
        </Popover>
    )
}
const ResultFilter = ({ onNext, outcomeFilterLabels, outcomeFilterValues, setOutcomeFilters, featureFilters, setFeatureFilter, setFeatureFilterValue }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <Paper>
            <Stack spacing={3} width='100%' height='100%' px={2} py={3}>
                <Typography variant='h5'>Persona Filter</Typography>
                <Stack spacing={1}>
                    {Object.keys(outcomeFilterLabels).map(l => (
                        <Filter label={outcomeFilterLabels[l]} val={outcomeFilterValues[l]} onChange={(val) => setOutcomeFilters(filters => ({ ...filters, [l]: val}))}/>
                    ))}
                </Stack>
                <Stack direction='row' alignSelf='center' spacing={2} /*marginTop='auto!important'*/>
                    <Badge badgeContent={featureFilters.reduce((n, { feature }) => n + (feature !== null),0)} color='primary' overlap='circular'>
                        <IconButton onClick={e => setAnchorEl(e.currentTarget)} sx={{backgroundColor: '#3576CB4D', '&:hover': { backgroundColor: '#0a33684d'}}}>
                            <FilterIcon sx={{ color: 'black'}} />
                        </IconButton>
                    </Badge>
                    <Button startIcon={<RotateIcon />} variant='contained' onClick={onNext}>Next Persona</Button>
                    <FeatureFilter filters={featureFilters} setFilter={setFeatureFilter} setFilterValue={setFeatureFilterValue} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                </Stack>
            </Stack>
        </Paper>
    )
}

// "Result" box
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



// Persona & Model Confidence box

const FilterChip = ({ feature, value }) => {
    if (feature === null) return null
    const { features } = useData()
    const type = features[feature].type
    return (
        <Chip
            color={type === 'categorical' ? 'green' : 'purple'}
            label={`${feature}: ${type === 'categorical' ? value : value[0] + '-' + value[1]}`}
        />
    )
}

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

const Persona = ({ id, idx, featureFilters }) => {
    const { features } = useData()
    const confidences = useMemo(() => [Math.random(),Math.random()],[])
    return (
    <Paper sx={{flex: '60%'}}>
        <Stack px={2} py={3} maxHeight='100%' spacing={2}>
            <Stack direction='row' alignItems='center' spacing={2}>
                <Typography variant='h5'>Persona</Typography>
                <Typography color='textSecondary'>(#{id})</Typography>
                {/* { featureFilters.map(({ feature, value }) => <FilterChip feature={feature} value={value}/>)} */}
            </Stack>
            <TableContainer>
                <Table stickyHeader size='small'>
                <colgroup>
                    <col style={{width:'50%'}}/>
                    <col style={{width:'50%'}}/>
                </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell>Feature</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.keys(features).map(f =>
                                <Tooltip title={features[f].description}>
                                    <TableRow>
                                        <TableCell>{f}</TableCell>
                                        <TableCell>{features[f].data[idx]}</TableCell>
                                    </TableRow>
                                </Tooltip>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2}>
                <Typography variant='h5'>Model Confidence<InfoIcon inline text='This value represents how "sure" the model is about a decision, or how likely the model is to be correct. A confidence of 0 is equivalent to a random guess.' sx={{opacity: .5}}/></Typography>
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

// whole container

const Personas = () => {
    const [persona, setPersona_] = useState(0)
    const { rows, features, ids } = useData()
    console.log(ids)
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
    const [featureFilters, setFeatureFilters] = useState([
        { feature: null, value: null },
        { feature: null, value: null }
    ])
    // change just the ith filter
    const setFeatureFilter = (i, feature) => {
        const defaultValue = feature === null ? null : features[feature].type === 'categorical' ? features[feature].data[0] : [features[feature].min, features[feature].max]
        setFeatureFilters(prevState => {
            const newState = [...prevState]
            newState[i] = { feature, value: defaultValue }
            return newState
        })
    }
    const setFeatureFilterValue = (i, value) => {
        setFeatureFilters(prevState => {
            const newState = [...prevState]
            newState[i].value = value
            return newState
        })
    }
    const [filtersUsed, setFiltersUsed] = useState([])
    const setPersona = (p) => {
        setPersona_(p)
        setFiltersUsed(featureFilters)
    }
    return (
        <Stack direction='row' spacing={2} height='100%' padding={4}>
            <Stack flex='40%' spacing={2}>
                <ResultFilter
                    outcomeFilterLabels={outcomeLabels}
                    outcomeFilterValues={outcomeFilters}
                    setOutcomeFilters={setOutcomeFilters}
                    featureFilters={featureFilters}
                    setFeatureFilter={setFeatureFilter}
                    setFeatureFilterValue={setFeatureFilterValue}
                    onNext={() => setPersona(Math.floor(Math.random()*rows))}
                />
                <Result />
            </Stack>
            <Persona id={ids[persona]} idx={persona} featureFilters={filtersUsed}/>
        </Stack>
    )
}

export default Personas