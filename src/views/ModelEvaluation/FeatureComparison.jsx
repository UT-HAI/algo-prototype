import React, { useMemo, useState } from "react"
import { InfoIcon } from "../../components/InfoTip"
import { FlexContainer } from "../../util/components"
import TypeChip from "../SelectFeatures/TypeChip"
import { Paper, Typography, Stack, Divider, Grid, Box, Tooltip } from "@mui/material"
import { useData } from "../../util/hooks/contextHooks"
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
        <Tooltip title={(importance > 0 ? '+' : '') + importance.toFixed(3)}>
            <Stack direction='row' spacing={1} alignItems='center' {...props}>
                <MinusIcon sx={{color: importance < 0 ? 'error.main' : 'divider'}}/>
                <Dots importance={importance} color={color} negative />
                <Divider flexItem orientation='vertical' />
                <Dots importance={importance} color={color} />
                <PlusIcon sx={{color: importance > 0 ? 'success.light' : 'divider'}} />
            </Stack>
        </Tooltip>
    </>)
    /* </Stack> */
}

const FeatureComparison = () => {
    const { features, dataLoading, rows } = useData()
    const [hovered, setHovered] = useState(null)
    const onMouseEnter = (s) => setHovered(s)
    const onMouseLeave = () => setHovered(null)
    const mockImportances = useMemo(() => Object.keys(features)
        .map(()=>[Math.random() * 2 - 1,Math.random() * 2 - 1])
    ,[])

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
                    <Typography fontSize='1.1rem' sx={{pl:2}}>Feature Weight/Importance<InfoIcon inline text='sample text' sx={{opacity: .5}}/></Typography>
                </Stack>
                {/* <Divider /> */}
                {dataLoading ? 'loading...' :
                <Grid container>
                    {Object.keys(features).map((f,i) => <>
                        { i !== 0 && <Grid item xs={12}><Divider/></Grid>}
                        <Grid item xs={5}>
                            <Stack padding={2} spacing={1}>
                                <Typography variant='h6' fontSize='1.1rem'>{f}</Typography>
                                <TypeChip type={features[f].type}/>
                                <Typography color='textSecondary' fontSize='.8rem'>{features[f].description}</Typography>
                            </Stack>
                        </Grid>
                        <Divider orientation='vertical' flexItem sx={{marginLeft: '-1px', opacity: 0.5}}/>
                        <Grid item xs={7} padding={2} display='flex' alignItems='center' justifyContent='center'>
                            <Box display='grid' gridTemplateColumns='auto auto' columnGap={3} rowGap={2}>
                                <Importance
                                    importance={mockImportances[i][0]}
                                    label='Your Model'
                                    color='#8E44AD'
                                    onMouseEnter={() => onMouseEnter('your')}
                                    onMouseLeave={onMouseLeave}
                                    dim={hovered=='group'}
                                />
                                <Importance
                                    importance={mockImportances[i][1]}
                                    label='Group Model'
                                    color='#F39C12'
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