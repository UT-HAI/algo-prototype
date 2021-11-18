import React from "react"
import LineIcon from '@mui/icons-material/TimelineOutlined';
import BarIcon from '@mui/icons-material/BarChartOutlined';
import { Tooltip, Box } from "@mui/material"
import Chip from "../../components/Chips"

const TypeChip = ({ type }) => {
    const chipProps = type == 'numerical' ?
        { color: 'purple', icon: <LineIcon/>} :
        { color: 'green', icon: <BarIcon/>}
    const chipTooltip = type == 'numerical' ?
        'Numerical variables have values that describe a measurable quantity as a number, like "how many" or "how much"' :
        'Categorical variables have values that describe a "quality" or "characteristic" of a data unit, like "what type" or "which category"'
    return (
        <Tooltip title={chipTooltip}>
            {/* Tooltip child must be able to forward ref, hence the Box component */}
            <Box>
                <Chip label={type} {...chipProps}/>
            </Box>
        </Tooltip>
    )
}

export default TypeChip