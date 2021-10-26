import { Alert, Snackbar } from "@mui/material"
import React from "react"
import { useError } from "../util/hooks/contextHooks"

// component that render error message based on value of error in app context

const Error = () => {
    const [error, setError] = useError()
    const close = () => setError(undefined)
    return (
        <Snackbar
            open={error}
            onClose={close}
            anchorOrigin={{vertical:'bottom',horizontal:'center'}}
        >
            <Alert onClose={close} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}

export default Error