import React from "react"
import { Typography } from "@mui/material"
import InfoTip from "../../components/InfoTip"

const infotips = {
    feature: 'Features (or columns) are individual variables that act as input in your model. Examples include age, sex, and income.'
}

const Heading = ({children}) => <Typography sx={{fontSize: '1.2em', color: 'grey.600'}}>{children}</Typography>


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    intro: <>
        <p>In this step, you will select which <InfoTip text={infotips.feature}>features</InfoTip> from the data you want to include in your model.</p>
        <p>Choosing whether to include a feature is important because it can affect not only the accuracy, but the bias and fairness of your model.</p>
    </>,
    selection: <>
        <Heading>Selection</Heading>
        <p>You can view each <InfoTip text={infotips.feature}>feature</InfoTip> by clicking on its name in the list. Each feature has a description,
         a chart showing its <InfoTip text="A distribution of a variable is it's shape, which shows the values in the data and how frequently they each occur. Distributions can be visualized in many ways depending on the type of variable.">distribution</InfoTip>, and summary statistics.</p>
        <p>When you've decided whether or not to include this feature in your model, use the Selection section to mark your choice. You can continue after you've marked the Selection for every feature by clicking the Finish button that appears.</p>
        <p>To compare the distributions of two variables, use the tabs to navigate to the <b>Comparison</b> section</p>
    </>,
    comparison: <>
        <Heading>Comparison</Heading>
        <p>You can compare any two variables, which will visualize their <InfoTip text="A bivariate distribution is the distribution of two variables combined. This can tell us how two variables are related and if there's any correlation.">bivariate distribution</InfoTip></p>
        <p>For numerical vs numerical comparisons, a <InfoTip text="Scatter plots contain one dot per data point (row), so each dot represents one measurement (i.e. one person, one event).">scatter plot</InfoTip> is used.</p>
        <p>For numerical vs categorical comparisons, a <InfoTip text="Box plots show the distribution of a numerical variable for each value of a categorical variable.">box plot</InfoTip> is used.</p>
        <p>For categorical vs categorical comparisons, a <InfoTip text="For every combination of the two variables, a stacked bar chart shows the frequency of the cominbation occuring in the dataset.">stacked bar chart</InfoTip> is used.</p>
        <p>To view individual variable distributions and decide which features to include, use the tabs to navigate to the <b>Selection</b> section</p>
    </>
}