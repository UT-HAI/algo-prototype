import React, { useState } from "react"
import WithLanding from "../../components/WithLandingPage"
import StepsLayout from "../../components/StepsLayout"
import { FlexContainer, FlexBox } from "../../util/components"
import { Stack } from "@mui/material"
import Pages from "../../components/Pages"
import FinishDialog from "../../components/FinishDialog"
import content from "../../content/exploreData"
import GoalSetting from "./GoalSetting"
import DatasetExploration from "./DatasetExploration"
import Practice from "./Practice"
import { useId, useError, useNotebook } from "../../util/hooks/contextHooks"


const ExploreData = () => {
    const [id] = useId()
    const [_, setError] = useError()
    const [__,submitNotebook] = useNotebook()

    const [goalSettingPage, setPage] = useState(0)
    // the two Goal Setting questions
    const [goalResponses, setResponses] = useState(['',''])
    const setResponse = (i, response) => setResponses(oldResponses => {
        const newResponses = [...oldResponses]
        newResponses[i] = response
        return newResponses
    })
    // user-response rules
    const [rules, setRules] = useState([''])

    const [finished, setFinished] = useState(false)
    // error handling is done inside the hook
    const onSubmit = () => submitNotebook({
        q1: goalResponses[0],
        q2: goalResponses[1],
        rules,
    })
    .then((success) => {
        if (success) setFinished(true)
    })

    const [hasVisitedExploration, setVisited] = useState(false)

    // why the Finish/Next button is disabled (undefined means it's not disabled)
    const disabledReason =
        goalSettingPage === 0 ? (!goalResponses.every(r => r.length > 5) ? 'Please answer all questions' : undefined) :
        goalSettingPage === 1 ? (rules[0] === '' ? 'Please fill out at least Rule 1' : !hasVisitedExploration ? 'Click on the Dataset Exploration tab before continuing!' : undefined) :
        undefined

    return (
        <WithLanding
            title='Explore Data'
            introText={content.intro}
        >
            <StepsLayout
                title='Explore Data'
                tabs={{
                    'Goal Setting': {
                        text: content.goalSetting[goalSettingPage],
                        component: (
                            <FlexContainer grow maxWidth="md" sx={{pt: 6}}>
                                <Pages
                                    index={goalSettingPage}
                                    changePage={setPage}
                                    onFinish={onSubmit}
                                    disabledReason={disabledReason}
                                    pages={[
                                        <GoalSetting
                                            responses={goalResponses}
                                            setResponse={setResponse}
                                        />,
                                        <Practice
                                            rules={rules}
                                            setRules={setRules}
                                        />
                                    ]}
                                />
                            </FlexContainer>
                        )
                    },
                    'Dataset Exploration': {
                        text: content.datasetExploration,
                        component: <DatasetExploration visit={() => setVisited(true)}/>
                    }
                }}
                fallback={undefined}
            />
            <FinishDialog
                open={finished}
                setOpen={setFinished}
                title='Confirm your response'
                content={<>
                    <p>Your reponses have been submitted. You can refer to them at any time by opening your <b>notebook</b> using the blue button located on the left side of the page.</p>
                    <p>You can edit your responses now or continue on to the feature selection step.</p>
                </>}
                cancelText='Edit responses'
                continueTo='/steps/2'
            />
        </WithLanding>
    )
}

export default ExploreData