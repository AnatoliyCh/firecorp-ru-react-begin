import React, {Fragment} from 'react'
import Header from "./header";
import About from "./about";
import {Switch, Route} from "react-router";
import Home from "./home";
import Locations from "./locations";
import Technicians from "./technicians";
import Facility from "./facility";
import Calender from "./calender";
import Map from "./maps";

const ChiefTO = ({match}) => (
    <Fragment>
        <Header match={match}/>
        <div className="container-fluid">
            <Switch>
                <Route path={`${match.path}/notifications`} component={About}/>
                <Route path={`${match.path}/locations`} component={Locations}/>
                <Route path={`${match.path}/technicians`} component={Technicians}/>
                <Route path={`${match.path}/monthlyto`} component={Home}/>
                <Route path={`${match.path}/facility`} component={Facility}/>
                <Route path={`${match.path}/calendar`} component={Calender}/>
                <Route path={`${match.path}/map`} component={Map}/>
            </Switch>
        </div>
    </Fragment>
);

export default ChiefTO
