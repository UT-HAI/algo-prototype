import React from "react"
import { Typography } from "@mui/material";
import { Switch, Route, Redirect } from "react-router-dom";
import { IdForm } from "../components/IdForm"
import MainLayout from "../components/MainLayout"
import SelectFeatures from "../views/SelectFeatures/SelectFeatures";
import { useData } from "../util/hooks/contextHooks";


const Steps = () => {
    useData() // start fetching the data on the render of this component
    return (<>
        {/* IdForm will appear & ask for participant ID if none is currently specified */}
        <IdForm /> 
        <MainLayout>
        <Switch>
            {/* would put steps 1-4 in here */}
            <Route exact path='/steps/2'>
                <SelectFeatures />
            </Route>
            <Route exact path='/steps/3'>
                <Typography variant="h2">Train Model</Typography>
            </Route>
            <Redirect to='/steps/2' />
        </Switch>
        </MainLayout>
    </>)
}

export default Steps
  