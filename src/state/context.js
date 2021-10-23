import React, { createContext, useReducer } from "react"
import { getStorage } from "../util/hooks/useStorage"
import { getQueryString, setQueryString } from "../util/hooks/useQuery"

// App-wide context. Some properties also cached in storage or query string

const initialState = {
    featureSelections: {}, // key-value pairs of feature names with "include" or "exclude" as values
    id: undefined, // participant id
}

const getCachedState = () => ({
    ...initialState,
    featureSelections: getStorage('feature-selections','session',initialState.featureSelections),
    id: getQueryString('id'),
})

const reducer = (state, action) => {
    switch(action.type){
        case 'FEATURE_SELECT':
            const { feature, selection }  = action.payload
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
            const { id, history } = action.payload
            setQueryString('id',id,history)
            return {
                ...state,
                id,
            }
        default: return state
    }
}

export const AppContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, getCachedState())

    return (<AppContext.Provider value={{state,dispatch}}>{children}</AppContext.Provider>)
}