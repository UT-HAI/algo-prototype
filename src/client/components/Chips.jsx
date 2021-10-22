import React from "react"
import { Chip as MuiChip } from "@mui/material"

const colors = {
    purple: {
        line: '#8A3F97',
        background: 'rgba(186, 104, 200, 0.1)'
    },
    green: {
        line: '#2F8221',
        background: 'rgba(117, 200, 104, 0.1)'
    }
}

const Chip = ({color, ...props}) =>
    <MuiChip
        variant='outlined'
        {...props}
        sx={{color: colors[color].line, borderColor: colors[color].line, backgroundColor: colors[color].background, '& svg': { color: 'inherit !important'}}}
    />

export default Chip