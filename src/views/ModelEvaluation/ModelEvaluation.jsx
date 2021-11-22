import React from "react"
import content from "../../content/modelEvalutation"
import WithLanding from "../../components/WithLandingPage"
import StepsLayout from "../../components/StepsLayout"
import FeatureComparison from "./FeatureComparison"
import Personas from "./Personas"

const ModelEvaluation = () => {

    return (
        <WithLanding
            title='Model Evaluation'
            introText={content.intro}
        >
            <StepsLayout
                title='Model Evaluation'
                tabs={{
                    'Feature Comparison': {
                        text: content.featureComparison,
                        component: <FeatureComparison />
                    },
                    'Personas': {
                        text: content.personas,
                        component: <Personas />
                    },
                }}
                fallback={undefined}
            />
        </WithLanding>
    )
}

export default ModelEvaluation