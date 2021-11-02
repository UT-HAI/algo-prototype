import { Typography, Box, IconButton, Container, Stack, Button } from "@mui/material"
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import ReactFullpage from '@fullpage/react-fullpage';
import AppBar from "../../components/AppBar"
import { FlexBox } from "../../util/components";
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircleIcon from '@mui/icons-material/Circle';

// const Section = React.forwardRef(({ children, i }, refList) =>
//   <Box sx={{height: '100vh', width: '100vw'}} ref={(section)=>{ refList.current[i] = section }}>
//     {children}
//   </Box>
// )


// const Controls = ({ moveUp, moveDown }) => 
//   <FlexBox sx={{position: 'fixed', right: '16px', top: '50%', transform: 'translate(0, -50%)', zIndex: 100}} >
//     <IconButton onClick={moveUp}>
//       <UpIcon />
//     </IconButton>
//     <IconButton onClick={moveDown}>
//       <DownIcon />
//     </IconButton>
//   </FlexBox>

// const Home = () => {
//   const sections = useRef([])
//   const [page,setPage] = useState(0)
//   const up
//   return (
//     <>
//       <Controls moveUp={()=>setPage(page-1)} moveDown={()=>setPage(page+1)} />
//       <Section i={0} ref={sections}>Hello world</Section>
//     </>
//   )
// }

// export default Home

const FullPageSection = ({ children }) => 
// background color for debugging
  <Container className="section" maxWidth='xl' sx={{height: '100vh !important', display: 'flex !important', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {children}
  </Container>

const Controls = ({ moveUp, moveDown, i, total }) => 
  <FlexBox id='controls' sx={{position: 'fixed', right: '24px', top: '50%', transform: 'translate(0, -50%)', zIndex: 100}} >
    <IconButton onClick={moveUp} disabled={i===0}>
      <UpIcon />
    </IconButton>
    <Stack alignItems='center' spacing={1}>
      {[...Array(total)].map((_,idx)=>
        <CircleIcon sx={{fontSize:'8px', color: 'text.secondary', opacity: idx === i ? 1 : .3}} />
      )}
    </Stack>
    <IconButton onClick={moveDown} disabled={i===total-1} >
      <DownIcon />
    </IconButton>
  </FlexBox>

const Home = () => {
  const [index, setIndex] = useState(0)
  const sections = [
    <Stack direction='row' spacing={6}>
      <Stack spacing={2} justifyContent='center'>
        <Typography variant="h2" gutterBottom>Welcome to TBD</Typography>
        <Typography sx={{'& > span': { color: 'primary.dark'}}}>
          This week, you and your colleagues will work together to{' '}
          <span>design a tool to help you make decisions on who should be admitted to the School of Information.</span>
        </Typography>
        <Typography>
        Throughout the sessions, you will learn the basic concepts and terminology related to Artificial Intelligence and Machine Learning. Using a real dataset of anonymized past applicants, you will apply these concepts to create your tool. 
        </Typography>
      </Stack>
      <img src='' alt='image' width='400px' height='300px' style={{backgroundColor: 'lightblue'}}/>
    </Stack>,

    <FlexBox>
      <Typography variant="h3" gutterBottom>What is AI?</Typography>
      <iframe src="https://player.vimeo.com/video/641630657?h=751b5d808a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="960" height="540" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullscreen title="demo"></iframe>
    </FlexBox>,

    <Stack spacing={2} alignItems='center'>
      <Typography>Now that you've gotten an introduction into AI, let's start building our model.</Typography>
      <Button variant='contained' component={Link} to='/steps'>Start</Button>
    </Stack>
  ]
  return (<>
    <Controls
      moveUp={()=>window.fullpage_api.moveSectionUp()}
      moveDown={()=>window.fullpage_api.moveSectionDown()}
      i={index}
      total={sections.length}
    />
    <ReactFullpage
      afterLoad={(_,destination)=>setIndex(destination.index)}
      render={({ state, fullpageApi }) => {
        return (
            <ReactFullpage.Wrapper>
              {sections.map((section,i)=>(
                <FullPageSection>
                  <FlexBox justifyContent='center' alignItems='center' sx={{height: '100%', px: 8}} key={i}>{section}</FlexBox>
                </FullPageSection>
              ))}
            </ReactFullpage.Wrapper>
      );
    }}
  />
    </>)
}

export default Home