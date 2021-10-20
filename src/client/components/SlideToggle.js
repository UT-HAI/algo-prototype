import React, { useState, useEffect } from "react";
import { Transition } from "../util/components";
import { Slide } from "@mui/material"

// first component slides out to reveal second component, controlled by `firstIn`
const SlideToggle = ({ firstComponent, secondComponent, firstIn}) => {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        setToggle(true)
        setTimeout(() => setToggle(false),300)
    }, [firstIn])
    useEffect(() => {
        setToggle(false)
    },[])
    return (<>
        <Transition
            TransitionComponent={Slide}
            direction="right"
            mountOnEnter
            unmountOnExit
            appear={false}
            in={!toggle && firstIn}
            wrapperProps={{style: {marginTop: 'auto', marginBottom: 'auto'}}}
        >
            {firstComponent}
        </Transition>
       {!toggle && !firstIn ? secondComponent : null}
    </>)
} 

export default SlideToggle