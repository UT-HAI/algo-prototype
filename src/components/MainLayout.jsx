import { Container, Box, Tabs, Tab } from "@mui/material";
import React from "react"
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import AppBar from "./AppBar";

const NavTab = ({label, value}) => {
    return (
        <Tab
            component={Link}
            // onClick={(e) => e.preventDefault()}
            to={value}
            label={label}
        />
    )
}

// main layout (for the /build pages)
const MainLayout = ({children}) => {
    const location = useLocation().pathname
    return (
    <>
        <AppBar/>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={location} aria-label="basic tabs example">
          <NavTab label="1. Explore" value="/build/1"/>
          <NavTab label="2. Select Features" value="/build/2"/>
          <NavTab label="3. Train Model" value="/build/3"/>
          <NavTab label="4. Evaluate Model" value="/build/4"/>
        </Tabs>
      </Box>
        <Container>
            {children}
        </Container>
    </>
    )
}

export default MainLayout;