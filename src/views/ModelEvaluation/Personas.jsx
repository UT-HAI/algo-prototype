import { Paper, Stack, Typography, Button, IconButton, Box, Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Tooltip, Popover, TextField, MenuItem, Slider, Divider, Badge } from "@mui/material"
import React, { useMemo, useState } from "react"
import Chip from "../../components/Chips"
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import RotateIcon from '@mui/icons-material/Cached';
import content from "../../content/modelEvalutation"
import { useData, useModels } from "../../util/hooks/contextHooks";
import { InfoIcon } from "../../components/InfoTip"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const greyProps = {
    backgroundColor: 'white',
    borderColor: '#E0E0E0'
}

const NoPersona = () =>
    <Stack alignItems='center' my='auto' spacing={2} height='100%' justifyContent='center'>
        <ErrorOutlineIcon fontSize='large' color='disabled'/> 
        <Typography sx={{textAlign: 'center'}}>No matching personas found. Try a different filter.</Typography>
    </Stack>

// "Persona Filter" box ///////////////////////////////////////////////

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

// "Result" box ///////////////////////////////////////////////

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
const Result = ({ actual, pred, empty }) => {
    const { models } = useModels()
    const rows = Object.keys(models.group.predictions).length
    const values = ['your','group'].map(n => {
        const key = String(actual)+String(pred[n])
        const confusion = content.confusion.quadrants[key] // True Positive, False Negative, etc.
        const pct = models[n].metrics[content.confusion.quadrantsAbbrev[key]] //tp, fn, etc.
        const numerator = Math.round(pct*rows)
        return { confusion, numerator }
    })
    
    return ( empty ? null :
        <Paper>
            <Stack spacing={3} width='100%' height='100%' px={2} py={3}>
                <Typography variant='h5'>Result</Typography>
                <Stack spacing={1}>
                    <ResultSection label='Your Model' confusion={values[0].confusion} numerator={values[0].numerator} denominator={rows} color='#F39C12' actual={actual} pred={pred.your}/>
                    <ResultSection label='Group Model' confusion={values[1].confusion} numerator={values[1].numerator} denominator={rows} color='#8E44AD' actual={actual} pred={pred.group}/>
                </Stack>
            </Stack>
        </Paper>
    )
}


// Persona & Model Score box ///////////////////////////////////////////////

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

const Score = ({ scores }) =>
    <Box flexGrow={1}>
        <Box display='flex' position='relative' alignItems='center' my={3}>
            <Box width='100%' height='6px' borderRadius='20px' backgroundColor='primary.main' sx={{opacity: .2}}/>
            {scores.map(({label, color, value},i) => 
                <Tooltip open={true} title={`${label} (${Math.round(value*100)}%)`} arrow placement={i % 2 === 0 ? 'top' : 'bottom'}>
                    <Box position='absolute' left={`${(value*100).toFixed(2)}%`} width='16px' height='16px' borderRadius='16px' backgroundColor={color} boxShadow={2}/>
                </Tooltip>
            )}
        </Box>
    </Box>

const Persona = ({ id, idx, featureFilters }) => {
    const { features } = useData()
    const { models } = useModels()
    return (
    <Paper sx={{flex: '60%'}}>
        { !id ? <NoPersona /> :
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
                <Typography variant='h5'>Model Scores<InfoIcon inline text='The models generate a score for each applicant, representing how likely the model thinks they are to be admitted. Values farther from 0.5 are more confident predictions.' sx={{opacity: .5}}/></Typography>
                <Stack direction='row' spacing={2}>
                    <Stack alignItems='flex-end'>
                        <Typography>0%</Typography>
                        <Typography color='textSecondary'>(deny)</Typography>
                    </Stack>
                    <Score
                        scores={[
                            { label: 'Your Model', color: '#F39C12', value: models.your.predictions[id] },
                            { label: 'Group Model', color: '#8E44AD', value: models.group.predictions[id]  },
                        ]}
                    />
                    <Stack>
                        <Typography>100%</Typography>
                        <Typography color='textSecondary'>(admit)</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack> }
    </Paper>
    )
}

// root component for the Personas tab ///////////////////////////////////////////////

const Personas = () => {
    const { features, ids, target } = useData()
    const { models } = useModels()
    const testIds = useMemo(() => Object.keys(models['group'].predictions).map(id => parseInt(id)), [models.id]) // we want to only sample from ids that are in the test set

    // get the next persona to display based on filters
    const outcomeLabels = {
        actual: 'Actual',
        your: 'Your Model',
        group: 'Group Model'
    }
    const [outcomeFilters, setOutcomeFilters] = useState({
        actual: true,
        your: true,
        group: true
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

    const getOutputs = (id,idx) => {
        return {
            actual: target.data[idx] !== 'Deny',
            your: models.your.predictions[id] > 0.5,
            group: models.group.predictions[id] > 0.5,
        }
    }
    // get the next randomly generated Subject ID according to the filters currently selected
    const getNextId = () => {
        const filtered = []
        testIds.forEach(testId => {
            const idx = ids.indexOf(parseInt(testId))
            const { actual, your, group } = getOutputs(testId, idx)
            if (outcomeFilters.actual !== actual || outcomeFilters.your !== your || outcomeFilters.group !== group) return;

            const matches = featureFilters.every(filter => {
                if (!filter.feature) return true
                const feature = features[filter.feature]
                if (feature.type === 'categorical')
                    return feature.data[idx] === filter.value
                else // numerical
                    return feature.data[idx] >= filter.value[0] && feature.data[idx] <= filter.value[1]
            })
            if (matches) filtered.push(testId)
        })
        return filtered[Math.floor(Math.random()*filtered.length)]
    }
    const [persona, setPersona_] = useState(() => getNextId()) // Subject ID of the current persona
    const setPersona = (p) => {
        setPersona_(p)
        setFiltersUsed(featureFilters)
    }
    const idx = ids.indexOf(persona) // index within the entire dataset

    const { actual, your, group } = useMemo(() => getOutputs(persona, idx),[persona])
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
                    onNext={() => setPersona(getNextId())}
                />
                {/* <Result actual={actual} pred={{your,group}} empty={!persona}/> */}
            </Stack>
            <Persona id={persona} idx={idx} featureFilters={filtersUsed}/>
        </Stack>
    )
}

export default Personas