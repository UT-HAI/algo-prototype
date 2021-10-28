import React, { useState } from "react"
import { Typography, Box, Tabs, Tab, Drawer, TextField, IconButton, Stack, List, ListItemButton, ListItemText, Collapse, Divider } from "@mui/material";
import { FlexBox } from "../util/components";
import UpArrowIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import glossary from "../content/glossary";
import ExpandMore from '@mui/icons-material/ExpandMore';

// layout for some of the /steps pages

// includes side panel w/ glossary, tabs, and main content
// tabs prop should be an object with tab names as keys and as values, an object with a `text` component and a `component` component

// displays children when value == index
const TabPanel = ({value, index, children}) => {
    return (
        <Box sx={{display: value !== index ? 'none' : 'block', backgroundColor: 'grey.100', flex: '1 1 auto', overflow: 'auto', display: 'flex', flexDirection: 'column'}}>
            {value === index && children}
        </Box>
    )
}

// list item that collapses open with a definition
const SearchTerm = ({term,definition}) => {
    const [open, setOpen] = useState(false)
    return (
        <FlexBox>
            <ListItemButton onClick={()=>setOpen(!open)}>
                <ListItemText primary={term} disableTypography sx={{fontWeight: 600}}/>
                <ExpandMore sx={{transform: open ? 'rotate(180deg)' : '', color: 'grey.400'}} />
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider variant='inset' sx={{ml:2, borderColor: 'grey.200'}}/>
                <Box px={3} py={2}>
                    {definition}
                </Box>
            </Collapse>
        </FlexBox>
    )
}

// search drawer
const Search = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const results = Object.entries(glossary).filter(([term]) => query === '' || term.toLowerCase().match(query.toLowerCase()))
    return (
        <Drawer
            anchor='bottom'
            open={open}
            onClose={()=>setOpen(false)}
            variant="persistent"
            sx={{
                visibility: 'visible',
            }}
            PaperProps={{
                sx: {
                    position: 'absolute',
                    border: 'none',
                    visibility: 'visible !important',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 'calc(100% - 70px)',
                    overflowY: 'visible'
                }
            }}
        >
            <Stack
                spacing={2}
                direction='row'
                sx={{
                    width: '100%',
                    height: '70px',
                    top: '-70px',
                    position: 'absolute',
                    borderTop: 1,
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: "grey.50",
                    alignItems: 'center',
                    px: 2,
                    
                    }}
                >
                <TextField
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder='Search the glossary'
                    size="small"
                    onFocus={()=>setOpen(true)}
                    sx={{flexGrow: 1, backgroundColor: 'white'}}
                    InputProps={{startAdornment: <SearchIcon sx={{mr: 1, color: open ? 'primary.main' : 'action.disabled'}}/>}}
                />
                <IconButton onClick={()=>setOpen(!open)} sx={{transform: open ? 'rotate(180deg)' : '', transition: '300ms ease-out'}}>
                    <UpArrowIcon />
                </IconButton>
            </Stack>
            <List disablePadding>
                {results.length === 0 ?  
                <Box px={3} py={2} sx={{color: 'text.secondary'}}>No results for "{query}"</Box> :
                results.map(([term, definition],i) => (
                    <div key={term}>
                        <SearchTerm term={term} definition={definition} />
                        <Divider component="li"/> 
                    </div>
                ))}
            </List>
        </Drawer>
    )
}

const SidePanel = ({ title, text }) => {
    return (
        <FlexBox sx={{ borderRight: 1, borderColor: "divider", width: '350px', px: 2, py: 4, position: 'relative', overflow: 'hidden'}}>
            <Typography variant="h5" mb={2}>
                {title}
            </Typography>
            <span sx={{"& > h3": { color: 'text.secondary'}}}>
                {text}
            </span>
            <Search />
        </FlexBox>
    )
}
    

export default ({ title, tabs, fallback }) => {
    const [tab, setTab] = useState(0)
    return (
        <Box sx={{display: "flex", flexGrow: 1, overflow: 'auto'}}>
            <SidePanel title={title} text={Object.values(tabs)[tab].text} />
            {/* tabs + content conainter */}
            <FlexBox grow sx={{height: 'auto'}}>
                {/* tabs container */}
                <FlexBox sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tab} onChange={(_,val) => setTab(val)}>
                        {Object.keys(tabs).map(tabName => <Tab label={tabName} key={tabName} sx={{minWidth: '150px', fontSize: '1rem'}}/>)}                
                    </Tabs>
                {/* tab panels */}
                </FlexBox>
                    {fallback ||
                    Object.entries(tabs).map(([tabName,tabContent],i) => (
                        <TabPanel value={tab} index={i} key={tabName}>
                            {tabContent.component}
                        </TabPanel>
                    ))}
            </FlexBox>
        </Box>
    )
}