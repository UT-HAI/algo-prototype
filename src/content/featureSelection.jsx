import React from "react"
import { Typography } from "@mui/material"
import InfoTip from "../components/InfoTip"
import { Heading } from "./common"
import glossary from "./glossary"



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    intro: <>
        <p>You have explored the <InfoTip term='dataset'>dataset</InfoTip> and written down your admissions goals and rules. In this step, you will select what <InfoTip term="feature">features</InfoTip> from the dataset should be used to train your <InfoTip term='model'>model</InfoTip>. The features are the characteristics in the dataset about each student that you just explored, such as their GPA, Undergraduate Institution Tier, and Ethnicity. </p>
        <p>Carefully considering whether to include a feature is important because this will have an impact on the <InfoTip term='accuracy'>accuracy</InfoTip>, fairness, and  <InfoTip term='bias'>bias</InfoTip> of the final model and the predictions it makes. On the next page, we will explain more about this.</p>
        <p>You will first make your selections individually here, and then you will discuss feature selection as a group.</p>

    </>,
    selection: <>
        <Heading>Selection</Heading>
        <p>You are going to decide what <InfoTip term="feature">features</InfoTip> will be included in your model. Click on the name of the feature to view
         a short description, a chart showing its <InfoTip term="distribution">distribution</InfoTip>, and some summary statistics.</p>
        <p>For each feature, you must decide whether to include or exclude it.</p>
        <p>To compare the distributions of two variables, Click the <b>Comparison</b> tab.</p>
        <p>After you make selections for each feature, you will be able to click <b>Finish</b> to proceed to the next portion.</p>
    </>,
    comparison: <>
        <Heading>Comparison</Heading>
        <p>You can compare any two variables, which will visualize their <InfoTip term="bivariate distribution">bivariate distribution</InfoTip>.</p>
        <p>Numerical vs numerical comparisons will use a <InfoTip term="scatter plot">scatter plot</InfoTip>.</p>
        <p>Numerical vs categorical will use a <InfoTip term="box plot">box plot</InfoTip>.</p>
        <p>Categorical vs categorical will use a <InfoTip term="stacked bar chart">stacked bar chart</InfoTip>.</p>
        <p>For example, try selecting <b>First Generation</b> vs <b>GPA</b> to see how GPA is distributed for the values of <b>First Generation</b>.</p>
        <p>When you're done, you can navigate back to the <b>Selection</b> section.</p>
    </>
}