import React from "react"
import InfoTip from "../components/InfoTip"

export default {
    intro: <>
        <p>
            So far, you have:
            <ul>
                <li>Identified your goals for admissions</li>
                <li>Selected <InfoTip term='feature'>features</InfoTip> you think are important for selecting applicants</li>
                <li>Worked with your colleagues to collectively determine what features in the <InfoTip term='dataset'>dataset</InfoTip> are important for selecting applicants.</li>
            </ul>
        </p>
        <p>Watch the video for a brief explanation about how the <InfoTip term='model'>machine learning model</InfoTip> is created or <InfoTip term='training'>"trained"</InfoTip>.</p>
    </>
}