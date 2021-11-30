import React, { useMemo, useState } from "react"
import { InfoIcon } from "../../components/InfoTip"
import { FlexContainer } from "../../util/components"
import TypeChip from "../SelectFeatures/TypeChip"
import { Paper, Typography, Stack, Divider, Grid, Box, Tooltip } from "@mui/material"
import { useData, useModels } from "../../util/hooks/contextHooks"
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import PlusIcon from '@mui/icons-material/AddCircleOutline';

const Dots = ({importance, color, negative}) => {
    const sign = negative ? -1 : 1
    const threshold = (i) => sign * importance > i / 5 // the ith dot is colored if the importance is above i / 5
    return (
        <Stack spacing={.5} direction='row'>
            {[...Array(5)].map((_,i)=>
                <svg width='16' height='16'>
                    <circle cx='8' cy='8' r='8' fill={threshold(negative ? 4 - i : i) ? color : '#E0E0E0'}/>
                </svg>
            )}
        </Stack>
    )
}

const Importance = ({ importance, label, color, onMouseEnter, onMouseLeave, dim}) => {
    const props = {
        onMouseEnter,
        onMouseLeave,
        sx: { opacity: dim ? .3 : 1 }
    }
    // the Typography and Stack have to not have a parent container so the grid works
    return(<>
        <Typography {...props}>{label}</Typography>
        {importance ?
        <Tooltip title={(importance > 0 ? '+' : '') + importance.toFixed(3)}>
            <Stack direction='row' spacing={1} alignItems='center' {...props}>
                <MinusIcon sx={{color: importance < 0 ? 'error.main' : 'divider'}}/>
                <Dots importance={importance} color={color} negative />
                <Divider flexItem orientation='vertical' />
                <Dots importance={importance} color={color} />
                <PlusIcon sx={{color: importance > 0 ? 'success.light' : 'divider'}} />
            </Stack>
        </Tooltip>
        : <Typography color='textSecondary' fontSize='0.8rem' sx={{textAlign: 'center'}}>Feature not included in model</Typography>}
    </>)
    /* </Stack> */
}

// this will either get the feature values if it's a numerical feature (name=GPA) or will find the categorical variable it belongs to (name=White)
const getFeatureData = (name, features) => {
    const featureNames = Object.keys(features)
    if (featureNames.includes(name)) return {...features[name], name: name === 'Gender' ? 'Gender (Male)' : name}
    let data = undefined
    featureNames.some(f => {
        if (features[f].data.includes(name)){
            data = {
                ...features[f],
                name: `${f}: ${name}` // i.e. "Ethnicity: White"
            }
            return true
        }
    })
    return data
}

const FeatureComparison = () => {
    const { features, dataLoading, rows } = useData()
    const { models } = useModels()
    const [hovered, setHovered] = useState(null)
    const onMouseEnter = (s) => setHovered(s)
    const onMouseLeave = () => setHovered(null)
    const featureList = [...new Set(Object.keys(models.your.coef).concat(Object.keys(models.group.coef)))]
    const data = useMemo(() => featureList.map(f => ({
        ...getFeatureData(f, features),
        coef: { your: models.your.coef[f], group: models.group.coef[f]}
    }))
    .sort((f1,f2) => f1.name < f2.name ? -1 : 1)
    ,[rows, models.id])

    return (
        <FlexContainer grow maxWidth="md" sx={{pt: 6, pb: 4}}>
            <Typography variant='h4' sx={{mb: 3}}>Feature Importance</Typography>
            {/* <Typography sx={{mb: 2}}>
                Familiarize yourself with what is known, or not known, about students and jot your thoughts down. You can also see what the data values look like. 
            </Typography> */}
            <Paper>
                {/* header */}
                <Stack direction='row' width='100%' py={1} backgroundColor='#e7f0f3'>
                    {/* flex-basis = 5/12 */}
                    <Typography fontSize='1.1rem' sx={{flexBasis: '41.67%', pl:2}}>Feature</Typography>
                    <Divider orientation='vertical' flexItem sx={{ my: -1, ml: '-1px', opacity: 0.5 }}/>
                    <Typography fontSize='1.1rem' sx={{pl:2}}>Feature Weight/Importance<InfoIcon inline text={<>(+): this feature has a positive effect on the model predicting that a student will be accepted.<br/>(-): this feature has a negative effect on the model predicting that a student will be accepted.</>} sx={{opacity: .5}}/></Typography>
                </Stack>
                {/* <Divider /> */}
                {dataLoading ? 'loading...' :
                <Grid container>
                    {data.map(({ type, description, name, coef },i) => <>
                        { i !== 0 && <Grid item xs={12}><Divider/></Grid>}
                        <Grid item xs={5}>
                            <Stack padding={2} spacing={1}>
                                <Typography variant='h6' fontSize='1.1rem'>{name}</Typography>
                                <TypeChip type={type}/>
                                <Typography color='textSecondary' fontSize='.8rem'>{description}</Typography>
                            </Stack>
                        </Grid>
                        <Divider orientation='vertical' flexItem sx={{marginLeft: '-1px', opacity: 0.5}}/>
                        <Grid item xs={7} padding={2} display='flex' alignItems='center' justifyContent='center'>
                            <Box display='grid' gridTemplateColumns='auto auto' columnGap={3} rowGap={2}>
                                <Importance
                                    importance={coef.your}
                                    label='Your Model'
                                    color='#F39C12'
                                    onMouseEnter={() => onMouseEnter('your')}
                                    onMouseLeave={onMouseLeave}
                                    dim={hovered=='group'}
                                />
                                <Importance
                                    importance={coef.group}
                                    label='Group Model'
                                    color='#8E44AD'
                                    onMouseEnter={() => onMouseEnter('group')}
                                    onMouseLeave={onMouseLeave}
                                    dim={hovered=='your'}
                                />
                            </Box>
                        </Grid>
                    </>)}
                </Grid>
                }
                
            </Paper>
        </FlexContainer>
    )
}

export default FeatureComparison