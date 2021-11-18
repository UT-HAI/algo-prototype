import React from "react"
import { FlexBox } from "../../util/components"
import { TextField, Typography, Button, Box, IconButton } from "@mui/material"
import content from "../../content/exploreData"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Practice = ({ rules, setRules }) => {
    const setRule = (i, rule) => setRules(prevRules => {
        const newRules /* Dua Lipa who */ = [...prevRules]
        newRules[i] = rule
        return newRules
    })
    const addRule = () => setRules(prevRules => [...prevRules, ''])
    const delRule = (i) => setRules(prevRules => {
        const newRules /* Dua Lipa who */ = [...prevRules]
        newRules.splice(i,1)
        return newRules
    })
    return (
        <FlexBox>
            <Typography variant='h4' gutterBottom>Practice</Typography>
            {content.practice}
            {/* <Stack spacing={4}>
                {rules.map((rule,i) => (
                    <FlexBox sx={{flexDirection: row}}>
                        <span>{`Rule ${i+1}`}</span>
                        <TextField value={rule} onChange={e => setRule(i,e.target.value)} placeholder='Enter rule here'/>
                    </FlexBox>
                ))}
                <Button variant='contained' onClick={addRule} startIcon={<AddIcon/>}>Add another rule</Button>
            </Stack> */}
            <Box display='grid' gridTemplateColumns='auto 1fr auto' columnGap={1} rowGap={3} mt={4}>
                {rules.map((rule,i) => (
                    <>
                        <FlexBox sx={{justifyContent: 'center', mr: 2}}>{`Rule ${i+1}`}</FlexBox>
                        <TextField
                            value={rule}
                            onChange={e => setRule(i,e.target.value)}
                            placeholder='Enter rule here'
                            sx={{backgroundColor: 'white'}}
                        />
                        <FlexBox sx={{justifyContent: 'center', opacity: i === 0 ? 0 : 1}}>
                            <IconButton disabled={i === 0} onClick={() => delRule(i)}><DeleteIcon /></IconButton>
                        </FlexBox>
                    </>
                ))}
                <Button variant='contained' onClick={addRule} startIcon={<AddIcon/>} sx={{gridColumnStart: 2, gridRowStart: rules.length + 1, maxWidth: '200px'}}>Add another rule</Button>
            </Box>
        </FlexBox>
    )
}

export default Practice