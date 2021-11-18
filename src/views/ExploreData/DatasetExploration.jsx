import React, { useMemo } from "react"
import { Typography, Paper, Box, Stack, Divider, Grid } from "@mui/material"
import { FlexContainer } from "../../util/components"
import { useData } from "../../util/hooks/contextHooks"
import TypeChip from "../SelectFeatures/TypeChip"
import { createGradient } from "../../util/color"
import Plot from "react-plotly.js"

const gradient = createGradient(['#C3D6F2', '#2676E1', '#0046A1'])

const Category = ({name, frac}) =>
    <Stack alignItems='center'>
        <span>{name}</span>
        <Box fontWeight={600} fontSize='1.5em' color={gradient(frac)}>{frac.toFixed(2) * 100}%</Box>
    </Stack>

const CategoricalPreview = ({ counts, total }) => {
    // take out the 'other' category
    const { other, ...values } = counts
    // sort descending
    const sortedValues = [...Object.entries(values)].sort((a,b) => b[1] - a[1])
    // we want to individually show the top 3 categories
    const showCounts = sortedValues.slice(0,3)
    // total the rest of the categories, including 'other'
    const otherTotal = sortedValues.slice(3).map(([_,val])=>val).concat([other ?? 0]).reduce((a,b)=>a+b, 0) / total
    return (
        <Stack direction='row' justifyContent='space-around' height='100%' alignItems='center'>
            {showCounts.map(([category, count]) =>
            <Category name={category} frac={count/total} />
            )}
            {otherTotal !== 0 ?
            <Category name='other' frac={otherTotal} />
            : null}
        </Stack>
    )
}

const NumericalPreview = ({ data, min, max }) => {
    return (
        <Plot
            data={[{
                type: 'histogram',
                x: data,
            }]}
            layout={{
                xaxis: {
                    tickmode: 'array',
                    tickvals: [min,max]
                },
                yaxis: {
                    showticklabels: false,
                },
                autosize: true,
                margin: {
                    t: 0,
                    b: 20,
                }
            }}
            useResizeHandler={true}
            style={{width: "100%", height: "100%"}}
        />
    )
}

// what goes in the Dataset Exploration tab of 1) Explore Data
const DatasetExploration = () => {
    const { features, dataLoading, rows } = useData()

    return (
        <FlexContainer grow maxWidth="md" sx={{pt: 6, pb: 4}}>
            <Typography variant='h4' sx={{mb: 3}}>Dataset Exploration</Typography>
            <Typography sx={{mb: 2}}>
                Familiarize yourself with what is known, or not known, about students and jot your thoughts down. You can also see what the data values look like. 
            </Typography>
            <Paper>
                <Stack direction='row' width='100%' py={1} backgroundColor='#e7f0f3'>
                    <Typography fontSize='1.1rem' sx={{flexBasis: '33.33%', pl:2}}>Feature</Typography>
                    <Divider orientation='vertical' flexItem sx={{ my: -1, ml: '-1px', opacity: 0.5 }}/>
                    <Typography fontSize='1.1rem' sx={{pl:2}}>Values</Typography>
                </Stack>
                {/* <Divider /> */}
                {dataLoading ? 'loading...' :
                <Grid container>
                    {Object.keys(features).map((f,i) => <>
                        { i !== 0 && <Grid item xs={12}><Divider/></Grid>}
                        <Grid item xs={4}>
                            <Stack padding={2} spacing={1}>
                                <Typography variant='h6' fontSize='1.1rem'>{f}</Typography>
                                <TypeChip type={features[f].type}/>
                                <Typography color='textSecondary'>{features[f].description}</Typography>
                            </Stack>
                        </Grid>
                        <Divider orientation='vertical' flexItem sx={{marginLeft: '-1px', opacity: 0.5}}/>
                        <Grid item xs={8} padding={2}>
                            {features[f].type == 'categorical' ?
                                <CategoricalPreview counts={features[f].counts} total={rows}/> :
                                <NumericalPreview data={features[f].data} min={features[f].min} max={features[f].max} />
                            }
                        </Grid>
                    </>)}
                </Grid>
                }
                
            </Paper>
        </FlexContainer>
    )
}

export default DatasetExploration