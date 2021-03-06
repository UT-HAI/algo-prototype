import React from "react"
import { Typography } from "@mui/material";
import { Switch, Route, Redirect } from "react-router-dom";
import { IdForm } from "../components/IdForm"
import MainLayout from "../components/MainLayout"
import SelectFeatures from "../views/SelectFeatures/SelectFeatures";
import ExploreData from "../views/ExploreData/ExploreData";
import ModelEvaluation from "../views/ModelEvaluation/ModelEvaluation";
import TrainModel from "../views/TrainModel/TrainModel";
import { useData } from "../util/hooks/contextHooks";


const Steps = () => {
    useData() // start fetching the data on the render of this component
    return (<>
        {/* IdForm will appear & ask for participant ID if none is currently specified */}
        <IdForm /> 
        <MainLayout>
        <Switch>
            {/* would put steps 1-4 in here */}
            <Route exact path='/steps/1'>
                <ExploreData />
            </Route>
            <Route exact path='/steps/2'>
                <SelectFeatures />
            </Route>
            <Route exact path='/steps/3'>
                <TrainModel />
            </Route>
            <Route exact path='/steps/4'>
                <ModelEvaluation />
            </Route>
            <Redirect to='/steps/1' />
        </Switch>
        </MainLayout>
    </>)
}

export default Steps
  