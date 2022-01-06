import { Tooltip as MuiTooltip } from "@mui/material"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/material/styles"
import React from "react"
import glossary from "../content/glossary"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Tooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
  ))(`
    & .${tooltipClasses.tooltip} {
      background-color: rgba(0,0,0,.90);
    }
  `);

const inlineProps = {
  fontSize: 'inherit',
  marginLeft: '.4em',
  color: 'inherit',
  verticalAlign: 'bottom',
  marginBottom: '.2em'
}

// "i" icon that renders a tooltip on hover
export const InfoIcon = ({ text, inline, ...props}) => (
  <Tooltip title={text}>
    <InfoOutlinedIcon {...props} sx={{...(inline ? inlineProps : undefined), ...props.sx}}/>
  </Tooltip>
)

// highlights the child content and on hover displays a tooltip containing text
// the `term` prop can refer to a term in the glossary, use either `term` or `text`
const InfoTip = ({ children, term, text }) => {
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
