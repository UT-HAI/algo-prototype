import { Button, Typography, Box, Grid, Tabs, Tab, Slide } from "@mui/material";
import React, { useState } from "react";
import { FlexContainer, FlexBox, Transition } from "../../util/components";
import { useSessionStore } from "../../util/hooks/useStorage";
import SlideToggle from "../../components/SlideToggle"
import FeatureCard from "./FeatureCard"
import FeatureDetails from "./FeatureDetails"
import InfoTip from "../../components/InfoTip"
import Comparison from "./Comparison";
import { useFeatureSelection, useData } from "../../util/hooks/contextHooks";
import { keyframes } from '@emotion/react'
import content from "./content"

const flash = keyframes({ from: { filter: 'brightness(1) saturate(1)' }, to: { filter: 'brightness(1.4) saturate(.7)' } })

const TabPanel = ({value, index, children}) => {
    return (
        <Box sx={{display: value !== index ? 'none' : 'block', backgroundColor: 'grey.100', flexGrow: 1}}>
            {value === index && children}
        </Box>
    )
}

const SelectFeatures = () => {
    const [landing, setLanding] = useSessionStore(true, "landing"); // is the user still on the landing/introduction screen
    const [feature, selectFeature] = useState(0)
    const { features, dataLoading, rows } = useData()
    const [selectedName, selectedData] = rows > 0 ? Object.entries(features)[feature] : [undefined, undefined]
    const [tab, setTab] = useSessionStore(0, 'tab')
    const [selections] = useFeatureSelection()
    const ready = Object.keys(features).every(f => selections[f])
    return (<>
      
        <SlideToggle 
            firstComponent={
                <FlexContainer sx={{px: "48px !important", justifyContent: 'center'}} grow maxWidth="md" >
                    <Typography variant="h3" mb={2}>
                        Feature Selection
                    </Typography>
                    <Typography>
                        {content.intro}
                    </Typography>
                    <Button onClick={() => setLanding(false)} variant="contained" sx={{mt: 4}}>
                        Continue
                    </Button>
                </FlexContainer>
            }
            secondComponent={
                <Box sx={{display: "flex", flexGrow: 1}}>
                    <FlexBox sx={{ borderRight: 1, borderColor: "divider", width: '350px', px: 2, py: 4}}>
                        <Typography variant="h5" mb={2}>
                            Feature Selection
                        </Typography>
                        <Typography sx={{"& > h3": { color: 'text.secondary'}}}>
                            {
                                tab === 0 ? content.selection :
                                tab === 1 ? content.comparison : null
                            }
                        </Typography>
                    </FlexBox>
                    <FlexBox grow sx={{height: 'auto'}}>
                        <FlexBox sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={tab} onChange={(e,val) => setTab(val)}>
                                <Tab label="Selection" sx={{minWidth: '150px', fontSize: '1rem'}}/>
                                <Tab label="Comparison"sx={{minWidth: '150px', fontSize: '1rem'}}/>
                            </Tabs>
                        </FlexBox>
                        {
                            dataLoading ? "loading..." : 
                            rows <= 0 ? "no data" :
                            (<>
                                <TabPanel value={tab} index={0}>
                                    <FlexContainer grow maxWidth="md" sx={{py:6, flexDirection: "row"}}>
                                        {/* https://mui.com/components/grid/#heading-spacing */}
                                        <Grid container spacing={1} direction="column" sx={{width: "auto", mr: 4}}>
                                            {Object.entries(features).map(([name,data], i) => <Grid item><FeatureCard name={name} selected={i === feature} onClick={() => selectFeature(i)}/></Grid>)}
                                        </Grid>
                                        <FlexBox grow sx={{flexDirection: 'row', flex: 1, width: 0}}>
                                            <FeatureDetails name={selectedName} data={selectedData} />
                                        </FlexBox>
                                    </FlexContainer>
                                </TabPanel>
                                <TabPanel value={tab} index={1}>
                                    <Comparison />
                                </TabPanel>
                        </>)}
                    </FlexBox>
                    {ready && 
                        <Transition
                            TransitionComponent={Slide}
                            direction="up"
                            in={ready}
                            mountOnEnter unmountOnExit
                            wrapperProps={{sx: {position: 'fixed', right: 0, bottom: 0, mr: 4, mb: 4}}}
                        >
                            <Button
                                variant='contained'
                                sx={{fontSize: '16px', animation: `${flash} .8s ease-in infinite alternate`, fontSize: '1.2rem', p: '10px 20px'}}
                            >
                                Finish!
                            </Button>
                        </Transition>
                    }
                </Box>}
            firstIn={landing}
        />
        
    </>)

}

export default SelectFeatures