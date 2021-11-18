import React, { useState } from "react"
import SlideToggle from "./SlideToggle"
import { FlexContainer } from "../util/components";
import { Typography, Button } from "@mui/material";

// creates two-page layout
// first page is a landing page with a heading and intro text
// second page is just content (whatever is children of WithLanding)

const WithLanding = ({title, introText, children}) => {
    const [landing, setLanding] = useState(true); // is the user still on the landing/introduction screen
   return (<>
     
   <SlideToggle 
       firstComponent={
           <FlexContainer sx={{px: "48px !important", justifyContent: 'center'}} grow maxWidth="md" >
               <Typography variant="h3" mb={2}>
                   {title}
               </Typography>
               {introText}
               <Button onClick={() => setLanding(false)} variant="contained" sx={{mt: 4}}>
                   Continue
               </Button>
           </FlexContainer>
       }
       secondComponent={children}
       firstIn={landing}
   />
   
</>)}

export default WithLanding