import { Typography, Box, IconButton, Container, Stack, Button, Tooltip } from "@mui/material"
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
import InfoTip from "../../components/InfoTip"



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
        <Typography variant="h2" gutterBottom>Welcome to "Future-Proofing AI"!</Typography>
        <Typography sx={{'& > span': { color: 'primary.dark'}}}>
          This week, you and your colleagues will work together to explore MSIS admissions data to "future-proof" decision-making.
          By building a machine learning model that predicts admissions, you will explore past decision patterns and gaps{' '}
          <span>to inform the future admissions practice.</span>
        </Typography>
        <Typography component='span'>
          This website will guide you through:
          <ol>
            <li>Basic concepts and terminology related to Artificial Intelligence and Machine Learning.</li>
            <li>Applying these concepts with a real dataset of anonymized past Master’s applicants to create your model.</li>
          </ol>
        </Typography>
        <Typography>Press the down arrow on the right hand side or scroll down with your mouse to continue to the next screen.</Typography>
      </Stack>
      <img src={bro} alt='image' width='400px'/>
    </Stack>,
    
    <Stack>
      <Typography variant="h3" gutterBottom>What is AI?</Typography>
      <Stack direction='row' spacing={4}>
          <iframe src="https://www.youtube-nocookie.com/embed/ND-gzP3sINE?rel=0&amp;showinfo=0&amp;ytp-pause-overlay=0&amp;modestbranding=1&amp;showinfo=0" width="720" height="405" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullscreen title="demo" style={{flexShrink: 0}}></iframe>
          <Stack>
            <Typography color='textSecondary' gutterBottom fontWeight={500}>Notes:</Typography>
            <Typography gutterBottom>When you use Siri, <InfoTip term='artificial intelligence'>AI</InfoTip>/<InfoTip term='machine learning'>ML</InfoTip> is in action as it answers your questions.</Typography>
            <Stack spacing={2} my={4}>
              <Box>
                <TextWithIcon icon={<StorageIcon />} text={<strong>Dataset:</strong>} props={{gutterBottom: true}}/>
                <Typography>The questions and responses exchanged between Siri and iPhone users</Typography>
              </Box>
              <Box>
                <TextWithIcon icon={<FactCheckIcon />} text={<strong>Rules:</strong>} props={{gutterBottom: true}}/>
                <Typography>Learned by the computer system to decide how to best respond</Typography>
              </Box>
              <Box>
                <TextWithIcon icon={<LightbulbIcon />} text={<strong>Prediction:</strong>} props={{gutterBottom: true}}/>
                <Typography>Responses that Siri gives you to the questions you ask her</Typography>
              </Box>
            </Stack>
          </Stack>
      </Stack>
    </Stack>,

    <Stack mt={-10}>
      <Typography variant='h4' sx={{mb: 10}}>AI/ML Biases Reflective of Past Decision Patterns</Typography>
      <Stack direction='row' spacing={6} alignItems='center'>
        <Stack spacing={2} alignItems='center'>
          <Box mx={3}>
            <img src={email}/>
          </Box>
          <Typography>e.g. AI filtering our email inboxes for spam</Typography>
        </Stack>
        <Stack>
          <Typography>As useful as <InfoTip term='artificial intelligence'>AI</InfoTip> and <InfoTip term='machine learning'>ML</InfoTip> are in our lives—filtering our email inboxes for spam, predicting medical diagnoses, and giving us directions to get between places—they can still make mistakes and <InfoTip term='disparate impact'>disparately harm people.</InfoTip></Typography>
          <Typography>For example, a large technology company discontinued a hiring model after it was found to discriminate against female candidates due to gender imbalances and biases of historical hiring decisions data.</Typography>
        </Stack>
      </Stack>
    </Stack>,

<Stack mt={-10}>
  <Typography variant='h4' sx={{mb: 10}}>AI/ML Biases Reflective of Past Decision Patterns</Typography>
  <Stack direction='row' spacing={6} alignItems='center'>
    <Stack spacing={2} alignItems='center'>
      <Box mx={3}>
        <img src={hireReject}/>
      </Box>
      <Typography>e.g. ML that is supposed to help with hiring may learn to discriminate based on gender or ethnicity from biases in historical data</Typography>
    </Stack>
    <Stack>
      <Typography gutterBottom>ML <InfoTip term='model'>models</InfoTip> are dependent on the <strong>quality</strong> and <strong>quantity</strong> of past data.</Typography>
      <Typography>
        If the dataset:
        <ul>
          <li>is missing information or context</li>
          <li>isn't representative enough of different populations</li>
          <li>contains errors</li>
          <li>contains historical human biases</li>

        </ul>
        the predictions it makes will be inaccurate, biased, or even <strong>exacerbate disparities</strong>.
      </Typography>
    </Stack>
  </Stack>
  </Stack>,

<Stack mt={-10}>
  <Typography variant='h4' sx={{mb: 10}}>"Future-Proofing" for Responsible Decision-Making</Typography>
  <Typography>
      Today, you will have the opportunity to learn how to create an ML model as well as probe deeper into an important task, applicant selection, collaboratively with your colleagues.<br/>
      Creating the perfect ML model for applicant selection is a very challenging task, however a model can be useful for revealing biases of past human decisions.&nbsp;
      <strong>Thus, treat today's session as a chance to "future-proof" responsible decision-making by:</strong>
      <ol>
        <li>critically examining past data for patterns and gaps</li>
        <li>aligning with colleagues on iSchool goals for the Master's program</li>
        <li>understanding ways that ML is suitable or limited in its abilities to assist human decision-making</li>
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