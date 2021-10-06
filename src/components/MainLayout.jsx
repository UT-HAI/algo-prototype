import { Container, Box, Tabs, Tab } from "@material-ui/core";
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
        </Tabs>
      </Box>
        <Container>
            {children}
        </Container>
    </>
    )
}

export default MainLayout;