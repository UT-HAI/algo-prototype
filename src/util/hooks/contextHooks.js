import { useContext, useEffect } from "react";
import { AppContext } from "../../state/context"
import { useHistory } from "react-router-dom"
import { fetchData } from "../../api/data";

export const useError = () => {
    const { state: { error }, dispatch } = useContext(AppContext)
    const setError = (err) => dispatch({ type: 'ERROR', payload: err })
    return [error, setError]
}

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
    const { state, dispatch } = useContext(AppContext)
    const { data: { rows, features }, dataLoading } = state

    console.log(rows)

    useEffect(() => {
        if (rows === -1 && !dataLoading){
            // set loading to true, don't change `data`
            dispatch({ type: 'FETCH_DATA', payload: { loading: true }})
            fetchData()
            .then(data => {
                dispatch({ type: 'FETCH_DATA', payload: { loading: false, data}})
            })
            // todo: error handling
            .catch((err) => {
                dispatch({ type: 'FETCH_DATA', payload: { loading: false }})
            })
        }
    })

    return { rows, features, dataLoading }
}