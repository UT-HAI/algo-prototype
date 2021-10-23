import { Container, Box, Tabs, Tab, Stepper, Step, StepLabel } from "@mui/material";
import React from "react"
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import AppBar from "./AppBar";
import { FlexBox } from "../util/components";

// I kept the tab version but I like the step version better

// const NavTab = ({label, value}) => {
//     return (
//         <Tab
//             component={Link}
//             to={value}
//             label={label}
//         />
//     )
// }

const steps = ['Explore', 'Select Features', 'Train Model', 'Evaluate Model'];

// main layout (for the /build pages)
const MainLayout = ({children}) => {
    const location = useLocation().pathname
    let index = 0
    try {
        // get index from url "/build/{index}"
        index = Number(location.match(/(?:\/build\/)([0-9])/)[1]) - 1
    }
    // eslint-disable-next-line no-empty
    catch{}
    
    return (
    <>
        <AppBar/>
        <Box sx={{ py: 2, px: 1, display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider', backgroundColor:"grey.50" }}>
            <Box sx={{maxWidth: 'md', flexGrow: 1}}>
                {/* <Tabs value={location} aria-label="basic tabs example">
                <NavTab label="1. Explore" value="/build/1"/>
                <NavTab label="2. Select Features" value="/build/2"/>
                <NavTab label="3. Train Model" value="/build/3"/>
                <NavTab label="4. Evaluate Model" value="/build/4"/>
                </Tabs> */}
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