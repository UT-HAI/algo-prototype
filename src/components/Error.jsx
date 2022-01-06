import { Alert, Snackbar } from "@mui/material"
import React from "react"
import { useError } from "../util/hooks/contextHooks"

// component that renders error message based on value of error in app context
// (if `error` is non-null, an error message at the bottom will display)

const Error = () => {
    const [error, setError] = useError()
    const close = () => setError(undefined)
    // coalesce the error in case it's accidentally an object and not a string
    const err = ['undefined', 'string'].includes(typeof error) ? error
        : (error.message ?? 'error')
    return (
        <Snackbar
            open={Boolean(err)}
            onClose={close}
            anchorOrigin={{vertical:'bottom',horizontal:'center'}}
        >
            <Alert onClose={close} severity="error">
                {err}
            </Alert>
        </Snackbar>
    )
}

export default Error