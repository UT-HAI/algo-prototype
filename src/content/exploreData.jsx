import React from "react"
import { Typography } from "@mui/material"
import InfoTip from "../components/InfoTip"
import { Heading } from "./common"
import glossary from "./glossary"



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    intro: <p>Description about Explore Data stage</p>,
    goalSetting: [<>
        <Heading>Goal Setting</Heading>
        <p>First, take some time to think about and write down what is important to you when it comes to selecting qualified applicants.</p>
        <p>Once you determine your goals, click <b>Next</b> to move on to the next page.</p>
    </>,
    <>
        <Heading>Practice</Heading>
        <p>Let’s practice with rules. Read the following scenario and list rules that you think best fit the scenario.</p>
        <p>Once you determine your rules, you may begin exploring the data by clicking on the <b>Dataset Exploration</b> tab.</p>
    </>],
    questions: [
        'What characteristics matter to you when you read an individual’s application package?',
        'What characteristics matter to you for the overall student class that is admitted?'
    ],
    datasetExploration: <>
        <Heading>Dataset Exploration</Heading>
        <p>Let’s start by taking a look at the dataset. On this page, you can scroll to view the rows and columns of the data to explore what we know about each applicant. </p>
        <p>If at any point during the sessions you wish to return to this page, just click <b>Explore data</b> in the menu bar above.</p>
        <p>To continue to the next step, navigate back to <b>Goal Setting</b> and complete the activity.</p>
    </>,
    practice: <>
        <Typography gutterBottom>When you try to get a computer program to assist you, you can’t always talk to it like you would a person. Instead you have to give it some structured rules or instructions to complete a task. For example, if you are trying to find a restaurant for a group dinner, you have to specify characteristics to the search engine to narrow down what restaurants satisfy dietary requirements, price constraints, locations, and so on.</Typography>
        <Typography>How would you teach a <b>computer program</b> to recognize a <b>strong vs. weak applicant</b>? Put one rule per line.</Typography>
    </>,
}