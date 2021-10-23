import {  Tooltip as MuiTooltip, useTheme, tooltipClasses, styled } from "@mui/material"
import React from "react"

const Tooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
  ))(`
    & .${tooltipClasses.tooltip} {
      background-color: rgba(0,0,0,.90);
    }
  `);

const InfoTip = ({ children, text }) => {
    const theme = useTheme()
    return (
        <Tooltip title={text}>
            <span style={{textDecoration: 'underline', cursor: 'pointer', color: theme.palette.primary.dark}}>
                {children}
            </span>
        </Tooltip>
    )
}

export default InfoTip