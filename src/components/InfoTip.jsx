import { Tooltip as MuiTooltip } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
import React from "react"
import glossary from "../content/glossary"

const Tooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
  ))(`
    & .${tooltipClasses.tooltip} {
      background-color: rgba(0,0,0,.90);
    }
  `);

const InfoTip = ({ children, term, text }) => {
    const theme = useTheme()
    return (
        <Tooltip title={glossary[term] ?? text}>
            <mark
              style={{
                // highlight effect
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
                borderRadius: '3px',
                padding: '0 5px',
                cursor: 'default',
                backgroundColor: '#d3e9ff',
                color: 'inherit'
              }}
            >
                {children}
            </mark>
        </Tooltip>
    )
}

export default InfoTip
