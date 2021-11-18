import React from "react"
import { Button, Box, Tooltip} from "@mui/material"
import { FlexBox } from "../util/components"

// have several pages of content controlled by a Back and Next button, with a Finish at the end

const Pages = ({ pages, index, changePage, onFinish, disabledReason }) => {
    const next = () => {
        if (index < pages.length - 1)
            changePage(index+1)
    }
    const back = () => {
        if (index > 0)
            changePage(index-1)
    }
    const lastPage = index === pages.length - 1
    return (
        <FlexBox sx={{position: 'relative', minHeight: '100%', width: '100%'}}>
            {/* content */}
            {pages.map((content,i) => (
                <FlexBox grow sx={{ display: i !== index ? 'none' : undefined }}>
                    {content}
                </FlexBox>
            ))}
            {/* buttons */}
            <FlexBox sx={{flexDirection: 'row', bottom: 0, width: "100%", my: 4}}>
                <Button onClick={back} variant='outlined' sx={ {display: index === 0 ? 'none' : undefined }}>Back</Button>
                <FlexBox sx={{flexDirection: 'row', marginLeft: 'auto', alignItems: 'center'}}>
                    <Box sx={{color: 'text.secondary', mr: 2 }}>{`${index+1} of ${pages.length}`}</Box>
                    <Tooltip title={disabledReason ?? ''}>
                        <Box>
                            <Button onClick={lastPage ? onFinish : next} variant='contained' disabled={Boolean(disabledReason)}>{lastPage ? 'Finish' : 'Next'}</Button>
                        </Box>
                    </Tooltip>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

export default Pages