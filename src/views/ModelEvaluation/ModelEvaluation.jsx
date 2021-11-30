import React from "react"
import content from "../../content/modelEvalutation"
import WithLanding from "../../components/WithLandingPage"
import StepsLayout from "../../components/StepsLayout"
import FeatureComparison from "./FeatureComparison"
import Personas from "./Personas"
import Fairness from "./Fairness"
import { useModels } from "../../util/hooks/contextHooks"
import { Stack, Typography, Button } from "@mui/material"
import ReplayIcon from '@mui/icons-material/Replay';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NoModels = ({ refresh }) => (
    <Stack alignItems='center' my='auto' spacing={2}>
        <ErrorOutlineIcon fontSize='large' color='disabled'/> 
        <Typography sx={{textAlign: 'center'}}>No trained models found for this participant</Typography>
        <Button variant='contained' startIcon={<ReplayIcon />} onClick={refresh}>Check again</Button>
    </Stack>
)

const ModelEvaluation = () => {
    const { models, refresh } = useModels()

    return (
        <WithLanding
            title='Model Evaluation'
            introText={content.intro}
        >
            <StepsLayout
                title='Model Evaluation'
                tabs={{
                    'Feature Comparison': {
                        text: content.featureComparison,
                        component: <FeatureComparison />
                    },
                    'Personas': {
                        text: content.personas,
                        component: <Personas />
                    },
                    'Fairness': {
                        text: content.fairness,
                        component: <Fairness />
                    }
                }}
                fallback={!models ? <NoModels refresh={refresh} /> : undefined}
            />
        </WithLanding>
    )
}

export default ModelEvaluation