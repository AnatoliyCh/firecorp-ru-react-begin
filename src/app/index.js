import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ChiefTO from "./chiefTO";
import Administrator from "./Administrator";
import LoginPage from "./commonComponents/LoginPage";
const App = () => (
    <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/administrator' component={Administrator}/>
        <Route path="/chiefto" component={ChiefTO}/>
    </Switch>
)

export default App
