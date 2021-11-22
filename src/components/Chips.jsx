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
    },
    admit: {
        line: '#107700',
        background: '#1077001A',
        hover: '#10770033',
    },
    reject: {
        line: '#CD3100',
        background: '#CD31001A',
        hover: '#CD310033',
    }
}

const Chip = ({color, ...props}) =>
    <MuiChip
        variant='outlined'
        {...props}
        sx={{
            color: colors[color].line,
            borderColor: colors[color].line,
            backgroundColor: colors[color].background,
            '& svg': { color: 'inherit !important'},
            '&:hover': props.clickable ? {backgroundColor: `${colors[color].hover}!important`,} : undefined,
            ...props.sx
        }}
    />


export default Chip