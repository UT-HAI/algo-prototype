import React, { useEffect, useState } from "react"
import { Container, Box, Slide } from "@mui/material";

export const FlexContainer = ({grow, ...props}) =>
    <Container
        {...props}
        sx={{display: "flex", flexDirection: "column", alignItems: 'flex-start', flexGrow: grow ? 1 : 0, ...props.sx, }}
    />

export const FlexBox = ({grow, ...props}) =>
<Box
    {...props}
    sx={{display: "flex", flexDirection: "column", flexGrow: grow ? 1 : 0, ...props.sx, }}
/>

// to put a component inside a MUI Transition component it needs to be able to forward a ref
export const Transitionable = React.forwardRef((props, ref) => 
    <Box
        ref={ref}
        // sx={{display: "flex", flexDirection: "column", flexGrow: 1, ...props.sx, }}
        {...props}
    />)

export const Transition = ({TransitionComponent, children, wrapperProps, ...props}) => 
    <TransitionComponent {...props}>
        <Transitionable children={children} {...wrapperProps}/>
    </TransitionComponent>