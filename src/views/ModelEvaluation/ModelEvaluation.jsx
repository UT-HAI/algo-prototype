import React from "react"
import content from "../../content/modelEvalutation"
import WithLanding from "../../components/WithLandingPage"
import StepsLayout from "../../components/StepsLayout"
import FeatureComparison from "./FeatureComparison"

const ModelEvaluation = () => {

    return (
        <WithLanding
            title='Model Evaluation'
            introText={content.intro}
        >
            <StepsLayout
                title='Mode Evaluation'
                tabs={{
                    'Feature Comparison': {
                        text: content.featureComparison,
                        component: <FeatureComparison />
                    },
                }}
                fallback={undefined}
            />
        </WithLanding>
    )
}

export default ModelEvaluation