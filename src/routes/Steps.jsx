import React from "react"
import { Switch, Route } from "react-router-dom";
import { IdForm } from "../components/IdForm"
import MainLayout from "../components/MainLayout"
import SelectFeatures from "../views/SelectFeatures/SelectFeatures";


const Steps = () => {
    return (<>
        <IdForm />
        <MainLayout>
        <Switch>
            {/* would put steps 1-4 in here */}
            <Route exact path='/steps/2'>
            <SelectFeatures />
            </Route>
        </Switch>
        </MainLayout>
    </>)
}

export default Steps
  