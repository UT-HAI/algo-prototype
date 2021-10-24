import { useContext } from "react";
import { AppContext } from "../../state/context"
import { useHistory } from "react-router-dom"

// get current user's feature selections
export const useFeatureSelection = () => {
    const { state, dispatch } = useContext(AppContext)
    const select = (feature, selection) => dispatch({ type: 'FEATURE_SELECT', payload: { feature, selection }})
    return [state.featureSelections, select]
}

// get participant id
export const useId = () => {
    const history = useHistory()
    const { state: { id }, dispatch } = useContext(AppContext)
    const setId = (id) => dispatch({ type: 'PARTICIPANT_ID', payload: { history, id }})
    return [id, setId]
}

// get feature data (fetched from server's .csv file)
export const useData = () => {
    const { state } = useContext(AppContext)
    const { data: { rows, features }, dataLoading } = state
    return { rows, features, dataLoading }
}