import { Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { FlexBox } from "../../util/components"
import content from "../../content/exploreData"

const Question = ({ name, prompt, placeholder, value, onChange}) => 
    <Stack>
        <Typography variant='h6'>{name}</Typography>
        <Typography sx={{mb: 2}}>{prompt}</Typography>
        <TextField multiline minRows={3} value={value} onChange={onChange} placeholder={placeholder} sx={{backgroundColor: 'white'}}/>
    </Stack>

const GoalSetting = ({ responses, setResponse }) => {
    return (
        <FlexBox>
            <Typography variant='h4' sx={{mb: 3}}>Goal Setting</Typography>
            <Stack spacing={4}>
                <Question
                    name='Question 1'
                    prompt={content.questions[0]}
                    placeholder='Enter response here'
                    value={responses[0]}
                    onChange={e => setResponse(0,e.target.value)}
                />
                <Question
                    name='Question 2'
                    prompt={content.questions[1]}
                    placeholder='Enter response here'
                    value={responses[1]}
                    onChange={e => setResponse(1,e.target.value)}
                />
            </Stack>
        </FlexBox>
    )
}

export default GoalSetting