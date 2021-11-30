import React from "react"
import { Typography } from "@mui/material"
import InfoTip from "../components/InfoTip"
import { Heading } from "./common"
import glossary from "./glossary"



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    intro: <>
        <p>You have explored the <InfoTip term='dataset'>dataset</InfoTip> and written down your admissions goals and rules. In this step, you will select what <InfoTip term="feature">features</InfoTip> from the dataset should be used to train your <InfoTip term='model'>model</InfoTip>. The features are the characteristics in the dataset about each student that you just explored, such as their GPA, Undergraduate Institution Tier, and Ethnicity. </p>
        <p>
Carefully considering whether to include a feature is important because this will have an impact on the <InfoTip term='accuracy'>accuracy</InfoTip>, fairness, and  <InfoTip term='bias'>bias</InfoTip> of the final model and the predictions it makes. On the next page, we will explain more about this.</p>
    </>,
    selection: <>
        <Heading>Selection</Heading>
        <p>You can view each <InfoTip term="feature">feature</InfoTip> by clicking on its name in the list. Each feature has a description,
         a chart showing its <InfoTip term="distribution">distribution</InfoTip>, and summary statistics.</p>
        <p>When you've decided whether or not to include this feature in your model, use the <b>Selection</b> section to mark your choice. You can continue after you've marked the <b>Selection</b> for every feature by clicking the <b>Finish</b> button that appears.</p>
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