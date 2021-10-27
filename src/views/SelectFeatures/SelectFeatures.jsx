import { Button, Typography, Box, Grid, Tabs, Tab, Slide, Stack } from "@mui/material";
import React, { useState } from "react";
import { FlexContainer, FlexBox, Transition } from "../../util/components";
import { useSessionStore } from "../../util/hooks/useStorage";
import SlideToggle from "../../components/SlideToggle"
import FeatureCard from "./FeatureCard"
import FeatureDetails from "./FeatureDetails"
import InfoTip from "../../components/InfoTip"
import Comparison from "./Comparison";
import { useFeatureSelection, useData, useError, useId } from "../../util/hooks/contextHooks";
import { keyframes } from '@emotion/react'
import content from "./content"
import FinishDialog from "./FinishDialog";
import { postSelections } from "../../api/selections";

const flash = keyframes({ from: { filter: 'brightness(1) saturate(1)' }, to: { filter: 'brightness(1.4) saturate(.7)' } })

const TabPanel = ({value, index, children}) => {
    return (
        <Box sx={{display: value !== index ? 'none' : 'block', backgroundColor: 'grey.100', flexGrow: 1}}>
            {value === index && children}
        </Box>
    )
}

const submitSelections = (id, selections, onSuccess, onError) =>
    postSelections(id,selections)
    .then(res => onSuccess(res))
    .catch(err => onError(err))
    

const SelectFeatures = () => {
    const [landing, setLanding] = useState(true); // is the user still on the landing/introduction screen
    const [feature, selectFeature] = useState(0) // the feature selected to be viewed
    const [finished, setFinished] = useState(false) // set by clicking Finish (shows Finish Dialog)
    const { features, dataLoading, rows } = useData()
    const [selectedName, selectedData] = rows > 0 ? Object.entries(features)[feature] : [undefined, undefined]
    const [tab, setTab] = useSessionStore(0, 'tab') // Selection & Comparison tabs 
    const [selections] = useFeatureSelection()
    const [_, setError] = useError()
    const ready = Object.keys(features).every(f => selections[f]) // controls if the Finish button is visible
    const [id] = useId()
    const onFinish = () => submitSelections(id,selections,() => setFinished(true),(err)=>setError(err.message))
    return (<>
      
        <SlideToggle 
            firstComponent={
                <FlexContainer sx={{px: "48px !important", justifyContent: 'center'}} grow maxWidth="md" >
                    <Typography variant="h3" mb={2}>
                        Feature Selection
                    </Typography>
                    {content.intro}
                    <Button onClick={() => setLanding(false)} variant="contained" sx={{mt: 4}}>
                        Continue
                    </Button>
                </FlexContainer>
            }
            secondComponent={<>
                <Box sx={{display: "flex", flexGrow: 1}}>
                    <FlexBox sx={{ borderRight: 1, borderColor: "divider", width: '350px', px: 2, py: 4}}>
                        <Typography variant="h5" mb={2}>
                            Feature Selection
                        </Typography>
                        <span sx={{"& > h3": { color: 'text.secondary'}}}>
                            {
                                tab === 0 ? content.selection :
                                tab === 1 ? content.comparison : null
                            }
                        </span>
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
                                        <Stack spacing={1} mr={4} sx={{width: "auto"}}>
                                            {Object.entries(features).map(([name,data], i) => <FeatureCard name={name} selected={i === feature} onClick={() => selectFeature(i)} key={name}/>)}
                                        </Stack>
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
                                onClick={onFinish}
                            >
                                Finish!
                            </Button>
                        </Transition>
                    }
                </Box>
                <FinishDialog open={finished} setOpen={setFinished}/>
                </>}
            firstIn={landing}
        />
        
    </>)

}

export default SelectFeatures