import { Container, Box, Tabs, Tab, Stepper, Step, StepLabel } from "@mui/material";
import React from "react"
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import AppBar from "./AppBar";
import { FlexBox } from "../util/components";

const steps = ['Explore', 'Select Features', 'Train Model', 'Evaluate Model'];

// main layout (for the /steps pages)
const MainLayout = ({children}) => {
    const location = useLocation().pathname
    let index = 0
    try {
        // get index from url "/steps/{index}"
        index = Number(location.match(/(?:\/steps\/)([0-9])/)[1]) - 1
    }
    // eslint-disable-next-line no-empty
    catch{}
    
    return (
    <>
        <AppBar/>
        <Box sx={{ py: 2, px: 1, display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider', backgroundColor:"grey.50" }}>
            <Box sx={{maxWidth: 'md', flexGrow: 1}}>
                <Stepper activeStep={index}>
                    {steps.map(step =>
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    )}
                </Stepper>
            </Box>
        </Box>
        <FlexBox grow>
            {children}
        </FlexBox>
    </>
    )
}

export default MainLayout;