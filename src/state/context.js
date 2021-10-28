import React, { createContext, useReducer } from "react"
import { getStorage } from "../util/hooks/useStorage"
import { getQueryString } from "../util/hooks/useQuery"

// App-wide context. Some properties also cached in storage or query string

// IMPORTANT: try not to call useContext inside components, but instead access the data through hooks in the contextHooks.js file

const initialState = {
    error: undefined, // undefined or error message; if message, will display error snackbar in UI
    featureSelections: {}, // key-value pairs of feature names with "include" or "exclude" as values
    id: undefined, // participant id,
    data: {
        rows: -1,
        features: {}
    },
    dataLoading: false,
    // ADMIN CONTEXT BELOW
    selectionsUsers: undefined, // users who have submitted a selection
    features: undefined, // list of features without the data
}

const getCachedState = () => ({
    ...initialState,
    featureSelections: getStorage('feature-selections','session',initialState.featureSelections),
    id: getQueryString('id') ?? getStorage('participant_id','session', initialState.id),
    data: getStorage('feature-data','session',initialState.data),
    features: getStorage('features','session',initialState.features)
})

const reducer = (state, action) => {
    switch(action.type){
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'FEATURE_SELECT':
            const { feature, selection } = action.payload
            const featureSelections = {
                ...state.featureSelections,
                [feature]: selection,
            }
            sessionStorage.setItem('feature-selections',JSON.stringify(featureSelections))
            return {
                ...state,
                featureSelections,
            }
        case 'PARTICIPANT_ID':
            const id = action.payload
            sessionStorage.setItem('participant_id',String(id))
            return {
                ...state,
                id,
            }
        case 'FETCH_DATA':
            const { data, loading } = action.payload
            sessionStorage.setItem('feature-data',JSON.stringify(data))
            return {
                ...state,
                data: data ?? state.data,
                dataLoading: loading ?? state.loading,
            }
        case 'FETCH_SELECTIONS_USERS':
            const users = action.payload
            return {
                ...state,
                selectionsUsers: users
            }
        case 'FETCH_FEATURES':
            const features = action.payload
            sessionStorage.setItem('features',JSON.stringify(features))
            return {
                ...state,
                features
            }
        default: return state
    }
}

export const AppContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, getCachedState())

    return (<AppContext.Provider value={{state,dispatch}}>{children}</AppContext.Provider>)
}