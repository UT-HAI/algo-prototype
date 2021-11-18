import { Button, Typography, Box, Slide, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { FlexContainer, FlexBox, Transition } from "../../util/components";
import { useSessionStore } from "../../util/hooks/useStorage";
import SlideToggle from "../../components/SlideToggle"
import FeatureCard from "./FeatureCard"
import FeatureDetails from "./FeatureDetails"
import Comparison from "./Comparison";
import { useFeatureSelection, useData, useError, useId } from "../../util/hooks/contextHooks";
import { keyframes } from '@emotion/react'
import content from "../../content/featureSelection"
import FinishDialog from "../../components/FinishDialog";
import { postSelections } from "../../api/selections";
import StepsLayout from '../../components/StepsLayout'
import WithLanding from "../../components/WithLandingPage";

const flash = keyframes({ from: { filter: 'brightness(1) saturate(1)' }, to: { filter: 'brightness(1.4) saturate(.7)' } })

const submitSelections = (id, selections, onSuccess, onError) =>
    postSelections(id,selections)
    .then(res => onSuccess(res))
    .catch(err => onError(err))
    

const SelectFeatures = () => {
    const [feature, selectFeature] = useState(0) // the feature selected to be viewed
    const [finished, setFinished] = useState(false) // set by clicking Finish (shows Finish Dialog)
    const { features, dataLoading, rows } = useData()
    const [selectedName, selectedData] = rows > 0 ? Object.entries(features)[feature] : [undefined, undefined]
    const [tab, setTab] = useSessionStore(0, 'tab') // Selection & Comparison tabs 
    const [selections] = useFeatureSelection()
    const [_, setError] = useError()
    const ready = selections ? Object.keys(features).every(f => selections[f].decision) : false // controls if the Finish button is visible
    const [id] = useId()
    const onFinish = () => submitSelections(id,selections,() => setFinished(true),(err)=>setError(err.message))
    return (
        <WithLanding
            title='Feature Selection'
            introText={content.intro}
        >
            <StepsLayout
                title='Feature Selection'
                tabs={{
                    'Selection': {
                        text: content.selection,
                        component: (
                            <FlexContainer grow maxWidth="md" sx={{py:6,  flexDirection: "row" }}>
                                {/* https://mui.com/components/grid/#heading-spacing */}
                                <Stack spacing={1} mr={4} sx={{width: "auto", maxHeight: '100%', overflow: 'auto', direction: 'rtl'}}>
                                    {Object.entries(features).map(([name,data], i) => <FeatureCard name={name} selected={i === feature} onClick={() => selectFeature(i)} key={name}/>)}
                                </Stack>
                                <FlexBox grow sx={{flexDirection: 'row', flex: 1, width: 0}}>
                                    <FeatureDetails name={selectedName} data={selectedData} />
                                </FlexBox>
                            </FlexContainer>
                        )
                    },
                    'Comparison': {
                        text: content.comparison,
                        component: <Comparison />
                    }
                }}
                fallback={dataLoading && "loading..." || (rows <= 0) && 'no data' }
            />
            {selections ? <>
            {/* Finish! button */}
                <Tooltip title={ready ? '' : `decisions need to be made for the following features: ${Object.keys(selections).filter(f => selections[f].decision === undefined).join(', ')}`}>
                {/* have to use a box to enable tooltip on disabled button */}
                <Box sx={{
                    position: 'fixed',
                    right: 0,
                    bottom: 0,
                    mr: 4,
                    mb: 4
                }}
                >
                    <Button
                        variant='contained'
                        sx={{
                            animation: ready ? `${flash} .8s ease-in infinite alternate` : undefined,
                            fontSize: '16px',
                            fontSize: '1.2rem',
                            p: '10px 20px',
                            
                        }}
                        onClick={onFinish}
                        disabled={!ready}
                    >
                        Finish!
                    </Button>
                </Box>
                </Tooltip>
            
                <FinishDialog
                    open={finished}
                    setOpen={setFinished}
                    title='Selections submitted!'
                    content={<>
                        <p>Your feature selections have been submitted. If you'd like, you can go back and change them (you must submit again).</p>
                        <p>Otherwise, please wait to click Continue until the moderator asks you.</p>
                    </>}
                    cancelText='I want to change my selections'
                    continueTo='/steps/3'
                />
            </> : null}
        </WithLanding>
        
    )

}

export default SelectFeatures