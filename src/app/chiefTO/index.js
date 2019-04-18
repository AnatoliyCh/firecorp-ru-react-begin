import React, {Fragment} from 'react'
import Header from "./header";
import About from "./about";
import {Switch, Route} from "react-router";
import Home from "./home";
import Locations from "./locations";

const ChiefTO = ({match}) => (
    <Fragment>
        <Header match={match}/>
        <Switch>
            <Route path={`${match.path}/notifications`} component={About}/>
            <Route path={`${match.path}/locations`} component={Locations}/>
            <Route path={`${match.path}/technicians`} component={Home}/>
            <Route path={`${match.path}/monthlyto`} component={Home}/>
            <Route path={`${match.path}/objects`} component={About}/>
            <Route path={`${match.path}/calendar`} component={About}/>
            <Route path={`${match.path}/map`} component={About}/>
        </Switch>
    </Fragment>
);

export default ChiefTO
