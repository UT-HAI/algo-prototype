import { Tooltip as MuiTooltip } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
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
            <span style={{textDecoration: 'underline', color: theme.palette.primary.dark}}>
                {children}
            </span>
        </Tooltip>
    )
}

export default InfoTip