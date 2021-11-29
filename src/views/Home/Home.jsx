import { Typography, Box, IconButton, Container, Stack, Button } from "@mui/material"
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import ReactFullpage from '@fullpage/react-fullpage';
import AppBar from "../../components/AppBar"
import { FlexBox } from "../../util/components";
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircleIcon from '@mui/icons-material/Circle';
import StorageIcon from '@mui/icons-material/Storage';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import bro from '../../assets/bro.png'
import email from '../../assets/email.png'
import hireReject from '../../assets/hire-reject.png'
import process from '../../assets/process.png'



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

const TextWithIcon = ({ icon, text, props }) => (
  <Typography {...props} sx={{ display: 'inline-flex', alignItems: 'center','& > svg': { marginRight: 1, fontSize: '1.4em' }}}>
    {icon}
    {text}
  </Typography>
)

const Home = () => {
  const [index, setIndex] = useState(0)
  const sections = [
    <Stack direction='row' spacing={8}>
      <Stack spacing={2} justifyContent='center'>
        <Typography variant="h2" gutterBottom>Welcome to TBD</Typography>
        <Typography sx={{'& > span': { color: 'primary.dark'}}}>
          This week, you and your colleagues will work together to{' '}
          <span>design a tool to help you make decisions on who should be admitted to the School of Information.</span>
        </Typography>
        <Typography>
          Throughout the sessions, you will:
          <ol>
            <li>Learn the basic concepts and terminology related to Artificial Intelligence and Machine Learning.</li>
            <li>Using a real dataset of anonymized past applicants, you will apply these concepts to create your model.</li>
          </ol>
        </Typography>
      </Stack>
      <img src={bro} alt='image' width='400px'/>
    </Stack>,
    
    <Stack>
      <Typography variant="h3" gutterBottom>What is AI?</Typography>
      <Stack direction='row' spacing={4}>
          <iframe src="https://player.vimeo.com/video/641630657?h=751b5d808a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="720" height="405" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullscreen title="demo" style={{flexShrink: 0}}></iframe>
          <Stack>
            <Typography color='textSecondary' gutterBottom fontWeight={500}>Notes:</Typography>
            <Typography gutterBottom>When you finish watching a movie on Netflix, AI/ML is in action as it recommends other movies based on what you’ve watched. In this case:</Typography>
            <Stack spacing={2} my={4}>
              <Box>
                <TextWithIcon icon={<StorageIcon />} text={<strong>Dataset:</strong>} props={{gutterBottom: true}}/>
                <Typography>The movies you've watched, including characteristics like genre</Typography>
              </Box>
              <Box>
                <TextWithIcon icon={<FactCheckIcon />} text={<strong>Rules:</strong>} props={{gutterBottom: true}}/>
                <Typography>These are learned by the computer system based on the data</Typography>
              </Box>
              <Box>
                <TextWithIcon icon={<LightbulbIcon />} text={<strong>Prediction:</strong>} props={{gutterBottom: true}}/>
                <Typography>recommendations for movies Netflix thinks you'll like</Typography>
              </Box>
            </Stack>
          </Stack>
      </Stack>
    </Stack>,

    <Stack mt={-10}>
      <Typography variant='h4' sx={{mb: 10}}>"Future-Proofing" for Responsible Decision-Making</Typography>
      <Stack direction='row' spacing={6} alignItems='center'>
        <Stack spacing={2} alignItems='center'>
          <Box mx={3}>
            <img src={email}/>
          </Box>
          <Typography>e.g. AI filtering our email inboxes for spam</Typography>
        </Stack>
        <Typography> As useful as AI and ML are in our lives—filtering our email inboxes for spam, predicting medical diagnoses, and giving us directions to get between places—they can still make mistakes and disparately harm people. </Typography>
      </Stack>
    </Stack>,

<Stack mt={-10}>
  <Typography variant='h4' sx={{mb: 10}}>"Future-Proofing" for Responsible Decision-Making</Typography>
  <Stack direction='row' spacing={6} alignItems='center'>
    <Stack spacing={2} alignItems='center'>
      <Box mx={3}>
        <img src={hireReject}/>
      </Box>
      <Typography>e.g ML that is supposed to help with hiring may learn to discriminate based on gender or ethnicity from biases in historical data</Typography>
    </Stack>
    <Stack>
      <Typography gutterBottom>ML models are dependent on the <strong>quality</strong> and <strong>quantity</strong> of past data.</Typography>
      <Typography>
        If the dataset:
        <ul>
          <li>is missing information or context</li>
          <li>isn't representative enough of different populations</li>
          <li>contains errors</li>
        </ul>
        the predictions is makes will be inaccurate, biased, or even <strong>exacerbate disparities</strong>.
      </Typography>
    </Stack>
  </Stack>
  </Stack>,

<Stack mt={-10}>
  <Typography variant='h4' sx={{mb: 10}}>"Future-Proofing" for Responsible Decision-Making</Typography>
  <Typography>
      Today, you will have the opportunity to learn how to create an ML model as well as probe deeper into an important task, applicant selection, collaboratively with your colleagues.<br/>
      However, trying to create the perfect ML model for applicant selection is a very challenging task. Instead, treat this week’s sessions as a chance to:
      <ol>
        <li>understand ways that ML is suitable or limited in its abilities to assist human decision-making, </li>
        <li>examine past data for patterns and gaps,</li>
        <li>and align with colleagues on iSchool goals.</li>
      </ol>
  </Typography>
</Stack>,

<Stack mt={-10} spacing={16} width='100%'>
  <Box>
    <Typography variant='h4' gutterBottom>Process Overview</Typography>
    <Typography>This is the process we will go through today:</Typography>
  </Box>
  <img src={process} style={{maxWidth: '750px', alignSelf: 'center'}}/>
  <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography>Now that you've gotten an introduction into AI, let's start building our model.</Typography>
      <Button variant='contained' component={Link} to='/steps'>Start</Button>
  </Stack>
</Stack>,

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