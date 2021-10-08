import { Button, Typography } from "@mui/material";
import React from "react";
import { FlexContainer } from "../util/components";
import { useSessionStore } from "../util/hooks/useStorage";
import SlideToggle from "../components/SlideToggle"

const SelectFeatures = () => {
    const [landing, setLanding] = useSessionStore(true, "landing"); // is the user still on the landing/introduction screen
    return (<>
      
        <SlideToggle 
            firstComponent={
                <FlexContainer sx={{px: "48px !important", justifyContent: 'center'}} grow maxWidth="md" >
                    <Typography variant="h3" mb={2}>
                        Feature Selection
                    </Typography>
                    <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis venenatis, arcu sollicitudin egestas arcu iaculis leo senectus. In aenean magnis sem varius diam laoreet ullamcorper volutpat ultrices.
                    </Typography>
                    <Button onClick={() => setLanding(false)} variant="contained" sx={{mt: 4}}>
                        Continue
                    </Button>
                </FlexContainer>
            }
            secondComponent={
                <FlexContainer>
                    <Typography>aoiwefhpaiuwhefpiauh apiwuehf apiwueh piawuef hapiuewhpiu piwueh fpiuawefpiuh ipuahwefiuh aweipuh piuh paiweufh </Typography>
                    <Button onClick={() => setLanding(true)} variant="contained" sx={{mt: 4}}>
                        Back
                    </Button>
                </FlexContainer>}
            firstIn={landing}
        />
        
    </>)

}

export default SelectFeatures;