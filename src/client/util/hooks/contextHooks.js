import { useContext } from "react";
import { AppContext } from "../../state/context"

export const useFeatureSelection = () => {
    const { state, dispatch } = useContext(AppContext)
    const select = (feature, selection) => dispatch({ type: 'FEATURE_SELECT', payload: [feature, selection]})
    return [state.featureSelections, select]
}