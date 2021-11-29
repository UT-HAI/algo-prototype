import React from "react"
import { Typography } from "@mui/material"
import InfoTip from "../components/InfoTip"
import { Heading } from "./common"
import glossary from "./glossary"



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    intro: <>
        <p>
            Now, you will evaluate and compare the performance of two models that were just <InfoTip term='train'>trained</InfoTip>.
            <ul>
                <li>The first, Individual Model, was trained using the features that <i>you</i> decided to include.</li>
                <li>The second, Group Model, was trained using the features your <i>group</i> decided to include.</li>
            </ul>
        </p>
        <p>
            We explained earlier what a model’s <InfoTip term='accuracy'>accuracy</InfoTip> is.
            However, a high accuracy doesn’t automatically mean an ML model is ready to launch. It is important to dig deeper and look at things like:
            <ol>
                <li>the types of errors it make</li>
                <li>how its accuracy and error rates impact different <InfoTip term='population'>populations</InfoTip>, including <InfoTip term='marginalized communities'>marginalized communities</InfoTip></li>
                <li>how historical <InfoTip term='bias'>biases</InfoTip> may be embedded in the data</li>
                <li>whether the patterns the ML model learned are representative of what we want a future decision-making system to use.</li>
            </ol>
        </p>
        <p>In this final section, we will introduce you to a few ways for evaluating a model.</p>
    </>,
    featureComparison: <>
        <Heading>Feature Comparison</Heading>
        <p>You can compare how features were used by 1) your individual model and 2) the group model. </p>
        <p><span style={{fontWeight: 600, color:'#F39C12'}}>Orange</span> dots represent your individual model. <span style={{fontWeight: 600, color:'#8E44AD'}}>Purple</span> dots represent the group’s model. </p>
        <p><b style={{fontWeight: 600}}>Something to think about:</b><br/>Are there any feature weights that the model came up with that you did not expect or disagree with?</p>
    </>,
    personas: <>
        <Heading>Personas</Heading>
        <p>Explore real world impacts of your model on applicants here.</p>
        <ol>
            <li>Select "admit" or "reject" to see students where decisions differed or were the same.</li>
            <li>You can apply a second layer of up to 2 features to filter on by clicking the blue filter icon.</li>
            <li>Click the "Next Persona" button to apply your choices. To see another applicant with the same selections, click the button without making changes.</li>
            <li>The content in the "Result" box and "Persona" box will change each time you click "Next Persona".</li>
        </ol>
        <p><b style={{fontWeight: 600}}>Something to think about:</b><br/>If the prediction from the models and the actual admission decision differs, which do you agree with and why?</p>
    </>,
    fairness: <>
        <Heading>Fairness</Heading>
        <p>Fairness in machine learning refers to making sure the models that are learned do not discriminate against individuals or groups of people.</p>
        <p>To the right, you can explore a couple ways to evaluate fairness of a model. Keep in mind, there are other methods and metrics to consider outside of this tool.</p>
        <p><b style={{fontWeight: 600}}>Something to think about:</b><br/>How do you think a model can be useful or harmful when assisting humans in applicant selection?</p>
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