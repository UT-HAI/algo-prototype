import { createContext, useReducer } from "react"
import { getStorage } from "../util/hooks/useStorage"

// App-wide context backed by session storage

const initialState = {
    featureSelections: {}, // key-value pairs of feature names with "include" or "exclude" as values
}

const reducer = (state, action) => {
    let newState = state
    switch(action.type){
        case 'FEATURE_SELECT':
            const [feature, selection] = action.payload
            newState = {
                ...state,
                featureSelections: {
                    ...state.featureSelections,
                    [feature]: selection,
                }
            }
            break;
        default: newState = state
    }
    sessionStorage.setItem('context',JSON.stringify(newState))
    return newState
}

export const AppContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, getStorage('context','session',initialState))

    return (<AppContext.Provider value={{state,dispatch}}>{children}</AppContext.Provider>)
}