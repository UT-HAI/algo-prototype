import React from "react"
import { Typography } from "@mui/material"
import InfoTip from "../components/InfoTip"
import { Heading } from "./common"
import glossary from "./glossary"



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    intro: <>
        <p>In this step, you will select which <InfoTip term="feature">features</InfoTip> from the data you want to include in your model.</p>
        <p>Choosing whether to include a feature is important because it can affect not only the accuracy, but the bias and fairness of your model.</p>
    </>,
    selection: <>
        <Heading>Selection</Heading>
        <p>You can view each <InfoTip term="feature">feature</InfoTip> by clicking on its name in the list. Each feature has a description,
         a chart showing its <InfoTip term="distribution">distribution</InfoTip>, and summary statistics.</p>
        <p>When you've decided whether or not to include this feature in your model, use the Selection section to mark your choice. You can continue after you've marked the Selection for every feature by clicking the Finish button that appears.</p>
        <p>To compare the distributions of two variables, use the tabs to navigate to the <b>Comparison</b> section</p>
    </>,
    comparison: <>
        <Heading>Comparison</Heading>
        <p>You can compare any two variables, which will visualize their <InfoTip term="bivariate distribution">bivariate distribution</InfoTip></p>
        <p>For numerical vs numerical comparisons, a <InfoTip term="scatter plot">scatter plot</InfoTip> is used.</p>
        <p>For numerical vs categorical comparisons, a <InfoTip term="box plot">box plot</InfoTip> is used.</p>
        <p>For categorical vs categorical comparisons, a <InfoTip term="stacked bar chart">stacked bar chart</InfoTip> is used.</p>
        <p>To view individual variable distributions and decide which features to include, use the tabs to navigate to the <b>Selection</b> section</p>
    </>
}