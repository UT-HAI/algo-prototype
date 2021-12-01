import React from "react"
import { Typography } from "@mui/material"
import InfoTip from "../components/InfoTip"
import { Heading } from "./common"
import glossary from "./glossary"



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    intro: <>
        <p>To begin, you will take some time to answer a few reflective questions about selecting applicants, and then review the dataset. This is so you can articulate your personal feelings about the admissions process and what matters. </p>
        <p>The dataset you are going to review has been anonymized and contains information about past iSchool Master’s Program applicants between Fall 2013 through Spring 2019. You will be shown distributions of select columns from their application data. We are not including recommendation letters and statements of purpose for student privacy. You may begin when you are ready</p>
    </>,
    goalSetting: [<>
        <Heading>Goal Setting</Heading>
        <p>Take some time to think about and write down what is important to you when it comes to selecting qualified applicants.</p>
        <p>Your answers will be saved in your notebook (accessible below) and not displayed to your colleagues.</p>
        <p>Once you determine your goals, click <b>Next</b> to move on to the next page.</p>
    </>,
    <>
        <Heading>Practice</Heading>
        <p>Write down the rules you would tell a computer so it can recognize a strong vs. a weak applicant.</p>
        <p>Your answers will be saved in your notebook (accessible below) and not displayed to your colleagues.</p>
        <p>When you are done, click the <b>Dataset Exploration</b> tab at the top. Once you have explored the dataset, return to this page. You may make modifications, and click <b>Finish</b> to move to the next activity.</p>
    </>],
    questions: [
        'What characteristics matter to you when you read an individual’s application package?',
        'What characteristics matter to you for the overall student class that is admitted?'
    ],
    datasetExploration: <>
        <Heading>Dataset Exploration</Heading>
        <p>On this page, you can scroll to view the distributions of selected columns from the dataset.</p>
        <p>When you are done, click on the <b>Goal Setting</b> tab to return to the previous screen. You can update the goals or rules you wrote earlier, based on this data.</p>
    </>,
    practice: <>
        <Typography gutterBottom>You can’t always tell a computer what to do the way you would a person. Instead you have to give it some structured rules or instructions to complete a task. For example, if you are trying to find a restaurant for a group dinner, you might have to describe your criteria as a set of rules. Your rules might be: </Typography>
        <ol>
            <li>Has vegan options</li>
            <li>${20} per entree</li>
            <li>Within 5 miles of Hyde Park</li>
        </ol>
        <Typography>How would you teach a <b>computer program</b> to recognize a <b>strong vs. weak applicant</b>? Put one rule per line. Format doesn't matter.</Typography>
    </>,
}