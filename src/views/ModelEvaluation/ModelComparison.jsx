import React, { useState } from "react"
import { Stack, Card, ToggleButton, ToggleButtonGroup, Typography, Box, Divider, Tooltip } from "@mui/material"
import { createGradient } from "../../util/color"
import { useModels } from "../../util/hooks/contextHooks"
import content from "../../content/modelEvalutation"
import { InfoIcon } from "../../components/InfoTip"

const gradient = {
    group: createGradient(['#FFFFFF','#8E44AD']),
    your: createGradient(['#FFFFFF','#E98F00']),
}

const toPercent = (decimal) => `${Math.round(decimal*100)}%`

const Sum = ({ terms, colorBy }) => (
    <Stack direction='row' spacing={'4px'}>
        {terms.map(({name, val},i) => <>
            {i !== 0 ? <span>+</span> : null}
            <span style={{backgroundColor: gradient[colorBy](val), padding: '2px'}}>{toPercent(val)}&nbsp;({name})</span>
        </>)}
    </Stack>
)
const Equation = ({ title, titleTooltip, numerator, denominator, result, colorBy }) => (
    <Stack spacing={2}>
        <Typography variant='h6'>{title}<InfoIcon inline sx={{opacity:0.5}} text={titleTooltip}/></Typography>
        
        <Stack direction='row' alignItems='center' spacing={1} alignSelf='center'>
            <Stack alignItems='center' spacing={'2px'}>
                <Sum terms={numerator} colorBy={colorBy}/>
                <Divider sx={{borderColor: 'text.primary'}} flexItem/>
                <Sum terms={denominator} colorBy={colorBy}/>
            </Stack>
            <span>=</span>
            <Box color='primary.main' fontSize='2rem'>{toPercent(result)}</Box>
        </Stack>
    </Stack>
)

const Overview = ({ metrics }) =>
    <Stack direction='row' py={2} justifyContent='space-evenly' backgroundColor='grey.100'>
        {metrics.map(({ name, decimal },i) => <>
            {i !== 0 ? <Divider orientation='vertical' flexItem/> : null}
            <Stack alignItems='center'>
                <Typography>{name}</Typography>
                <Typography color='primary.dark' fontSize='1.3rem'><b>{toPercent(decimal)}</b></Typography>
            </Stack> 
        </>)}
    </Stack>

const ConfusionCell = ({ val, label, disabled, colorBy, ...props }) =>
    <Box
        backgroundColor={disabled ? 'none' : gradient[colorBy](val)}
        {...props}
        display='flex'
        justifyContent='space-between'
        padding={1}
        alignItems='center'
        border='1px solid'
        borderColor='divider'
        borderRadius='4px'
        color={disabled ? 'action.disabled': ''}
        >
            <span>{label}</span><span>{toPercent(val)}</span>
    </Box>
const ConfusionMatrix = ({ matrix, colored, colorBy, total }) => {
    const createGrid = () => { 
        let row = 0
        return ['false', 'true'].map((pred) => (
            ['false', 'true'].map((actual) => {
                const key = pred+actual
                const decimal = matrix[content.confusion.quadrantsAbbrev[key]]

                if (colored.includes(content.confusion.quadrantsAbbrev[key])) {
                    row +=1
                    return <>
                        <Box gridArea={`${row+1} / 1`} backgroundColor={gradient[colorBy](decimal)} display='flex' alignItems='center' px={1} justifyContent='center'>
                            <Typography><b>{content.confusion.quadrants[key]}</b></Typography>
                        </Box>
                        <Typography fontSize='0.8rem' sx={{gridArea: `${row+1} / 2`}}>
                            <b>{Math.round(decimal*total)} ({toPercent(decimal)})</b>
                            &nbsp;students were predicted to be&nbsp;
                            <Box component='span' color={content.confusion.colors[pred]} fontWeight={600}>{content.confusion.labels[pred]}</Box>
                            &nbsp;and were actually&nbsp;
                            <Box component='span' color={content.confusion.colors[actual]} fontWeight={600}>{content.confusion.labels[actual]}</Box>.
                        </Typography>
                    </>
                }
                return null
            })
        )).flat()
    }
    return (
        <Stack px={1}>
            <Typography variant='h6' gutterBottom>Confusion Matrix</Typography>
            <Box display='grid' gridTemplateColumns='1fr 2fr 2fr' rowGap={1} columnGap={1}>
                <Typography sx={{gridArea:'1 / 2'}}><b>Predict Admit</b></Typography>
                <Typography sx={{gridArea:'1 / 3'}}><b>Predict Reject</b></Typography>
                <Typography sx={{gridArea:'2 / 1', textAlign: 'right'}}><b>Actual Admit</b></Typography>
                <Typography sx={{gridArea:'3 / 1', textAlign: 'right'}}><b>Actual Reject</b></Typography>

                <ConfusionCell gridArea='2 / 2' disabled={!colored.includes('tp')} val={matrix.tp} label='True Positive' colorBy={colorBy}/>
                <ConfusionCell gridArea='2 / 3' disabled={!colored.includes('fn')} val={matrix.fn} label='False Negative' colorBy={colorBy}/>
                <ConfusionCell gridArea='3 / 2' disabled={!colored.includes('fp')} val={matrix.fp} label='False Positive' colorBy={colorBy}/>
                <ConfusionCell gridArea='3 / 3' disabled={!colored.includes('tn')} val={matrix.tn} label='True Negative' colorBy={colorBy}/>
            </Box>
            <Divider sx={{my: 3}} />
            <Box display='grid' gridTemplateColumns='1fr 2fr' columnGap={2} rowGap={1}>
                {createGrid()}
            </Box>
        </Stack>
    )
}

const Tabs = ({ tabs }) => {
    const [tab, setTab] = useState(0)
    return (<>
        {/* tab group */}
        <ToggleButtonGroup value={tab} exclusive onChange={(event) => {setTab(parseInt(event.target.value))}} color='primary' sx={{mb: 4}} size='small'>
            {tabs.map(({name}, i) =><ToggleButton value={i}>{name}</ToggleButton>)}
        </ToggleButtonGroup>
        {/* display the correct screen */}
        {tabs[tab].content}
    </>)
}

const ModelCard = ({ title, metrics, colorBy, total }) => {
    
    return (
        <Card sx={{px:3, py:3, flex: '50%'}}>
            <Typography variant='h4' sx={{mb:2}}>{title}</Typography>
            <Tabs 
                tabs={[
                {
                    name: 'Overview',
                    content: 
                        <Stack spacing={4}>
                            <Overview metrics={[{name: 'Accuracy', decimal: metrics.acc}, {name: 'Precision', decimal: metrics.precision}, {name: 'Recall', decimal: metrics.recall}]}/>
                            <ConfusionMatrix matrix={metrics} colored={['tp','tn','fp','fn']} colorBy={colorBy} total={total}/>
                        </Stack>
                },
                {
                    name: 'Accuracy',
                    content: 
                        <Stack spacing={4}>
                            <Equation
                                title='Accuracy'
                                titleTooltip='The number of students the model correctly predicted to be admitted and rejected to the school out of all its predictions'
                                numerator={[{name: 'TP', val: metrics.tp},{name: 'TN', val: metrics.tn}]}
                                denominator={[{name: 'TP', val: metrics.tp},{name: 'FP', val: metrics.fp},{name: 'FN', val: metrics.fn},{name: 'TN', val: metrics.tn}]}
                                result={metrics.acc}
                                colorBy={colorBy}
                            />
                            <ConfusionMatrix matrix={metrics} colored={['tp','tn','fp','fn']} colorBy={colorBy} total={total}/>
                        </Stack>
                },
                {
                    name: 'Precision',
                    content: 
                        <Stack spacing={4}>
                            <Equation
                                title='Precision'
                                titleTooltip='The number of students the model correctly predicted to admit out of all the students the model predicted to admit (correctly and incorrectly)'
                                numerator={[{name: 'TP', val: metrics.tp}]}
                                denominator={[{name: 'TP', val: metrics.tp},{name: 'FP', val: metrics.fp}]}
                                result={metrics.precision}
                                colorBy={colorBy}
                            />
                            <ConfusionMatrix matrix={metrics} colored={['tp','fp']} colorBy={colorBy} total={total}/>
                        </Stack>
                },
                {
                    name: 'Recall',
                    content: 
                        <Stack spacing={4}>
                            <Equation
                                title='Recall'
                                titleTooltip='The number of students that the model correctly predicted to admit out of the number of students actually admitted in the past'
                                numerator={[{name: 'TP', val: metrics.tp}]}
                                denominator={[{name: 'TP', val: metrics.tp},{name: 'FN', val: metrics.fn}]}
                                result={metrics.recall}
                                colorBy={colorBy}
                            />
                            <ConfusionMatrix matrix={metrics} colored={['tp','fn']} colorBy={colorBy} total={total}/>
                        </Stack>
                },
                ]}
            />
        </Card>
    )
}

const ModelComparison = () => {
    const { models } = useModels()
    const total = Object.keys(models.your.predictions).length
    return (
        <Stack direction='row' spacing={2} padding={4}>
            <ModelCard title='Your Model' metrics={models.your.metrics} colorBy='your' total={total}/>
            <ModelCard title='Group Model' metrics={models.group.metrics} colorBy='group' total={total}/>
        </Stack>
    )
}
export default ModelComparison