import React from "react"
import { Typography } from "@mui/material"
import InfoTip from "../components/InfoTip"
import { Heading } from "./common"
import glossary from "./glossary"



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    intro: <p>Description about Model Evaluation stage</p>,
    featureComparison: <>
        <Heading>Feature Comparison</Heading>
        <p>Placeholder content</p>
    </>,
    personas: <>
        <Heading>Personas</Heading>
        <p>Now that you can play with the results of different models. The system will generate some personas based on your selection.</p>
        <p>See which model better represent your goal and what can be improved later.</p>
    </>,
    fairness: <>
        <Heading>Fairness</Heading>
        <p>Placeholder content</p>
    </>,
    confusion: {
        quadrants: {
            'truetrue': 'True Positive',
            'truefalse': 'False Positive',
            'falsetrue': 'False Negative',
            'falsefalse': 'True Negative'
        },
        labels: {
            'true': 'admitted',
            'false': 'denied',
        },
        colors: {
            'true': 'success.main',
            'false': 'error.main'
        }
    }
}