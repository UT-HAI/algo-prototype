import React from "react"
import LineIcon from '@mui/icons-material/TimelineOutlined';
import BarIcon from '@mui/icons-material/BarChartOutlined';
import StarIcon from '@mui/icons-material/StarRounded';
import { Tooltip, Box } from "@mui/material"
import Chip from "../../components/Chips"

const TypeChip = ({ type }) => {
    const chipProps = {
        numerical: { color: 'purple', icon: <LineIcon/>},
        categorical: { color: 'green', icon: <BarIcon/>},
        target: { color: 'yellow', icon: <StarIcon/>},
    }
   
    const chipTooltip = {
        numerical: 'Numerical variables have values that describe a measurable quantity as a number, like "how many" or "how much"',
        categorical: 'Categorical variables have values that describe a "quality" or "characteristic" of a data unit, like "what type" or "which category"',
        target: 'The target variable is what we\'re trying to predict based on the data from other variables'
    }
    return (
        <Tooltip title={chipTooltip[type]}>
            {/* Tooltip child must be able to forward ref, hence the Box component */}
            <Box>
                <Chip label={type} {...chipProps[type]}/>
            </Box>
        </Tooltip>
    )
}

export default TypeChip