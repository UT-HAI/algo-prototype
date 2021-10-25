import React from "react";
import { Grid, Select, MenuItem, Card, Box, FormControl, InputLabel, Typography } from "@mui/material"
import { useSessionStore } from "../../util/hooks/useStorage";
import { useData } from "../../util/hooks/contextHooks";
import { FlexContainer, FlexBox } from "../../util/components";
import Bivariate from "../../components/Bivariate";

const AxisSelect = ({ label, onChange, values, value }) => (
    <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={onChange}
          sx={{backgroundColor: 'white'}}
        >
          {values.map(v => <MenuItem value={v}>{v}</MenuItem>)}
        </Select>
      </FormControl>
)

const Comparison = () => {
    const { features } = useData()
    const featureNames = Object.keys(features)
    const [xaxis, setXaxis] = useSessionStore(featureNames[0], 'compare-xaxis')
    const [yaxis, setYaxis] = useSessionStore(featureNames[1], 'compare-yaxis')
    const x = features[xaxis]
    const y = features[yaxis]
    return (
        <FlexContainer grow maxWidth="md" sx={{py:6, flexDirection: "column", height: 'auto', alignItems: 'center'}}>
            <Box sx={{ml:-4}}>
            <Grid container spacing={4} direction="row" alignItems='center' sx={{width: "auto", mb: 4}}>
                <Grid item>
                    <AxisSelect label='x-axis' onChange={(e)=>setXaxis(e.target.value)} value={xaxis} values={featureNames} />
                </Grid>
                <Grid item>
                    <Typography color="textSecondary">vs.</Typography>
                </Grid>
                <Grid item>
                    <AxisSelect label='y-axis' onChange={(e)=>setYaxis(e.target.value)} value={yaxis} values={featureNames} />
                </Grid>
            </Grid>
            </Box>
            <FlexBox grow sx={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                <Card variant='outlined' sx={{ maxWidth: '800px', p: 2}}>
                <Box sx={{width: '100%', height: '400px'}}>
                    {/* numerical vs numerical: scatter */}
                    {/* numerical vs categorical: violin */}
                    {/* categorical vs categorical: stacked bar */}
                    {x && y &&
                    <Bivariate
                        x={{data: x.data, type: x.type, label: xaxis}}
                        y={{data: y.data, type: y.type, label: yaxis}}
                    />}
                </Box>
                </Card>
            </FlexBox>
        </FlexContainer>
    )
}

export default Comparison