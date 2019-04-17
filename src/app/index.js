import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ChiefTO from './chiefTO';
import Administrator from './Administrator';
import LoginPage from './commonComponents/LoginPage';

import * as allConst from './commonComponents/Const'

const App = () => (
    <Switch>
        <Route exact path={`${allConst.ROOT_DIRECTORY}`} component={LoginPage}/>
        <Route path={`${allConst.PATH_ADMINISTRATOR}`} component={Administrator}/>
        <Route path={`${allConst.PATH_CHIEFTO}`} component={ChiefTO}/>
    </Switch>
);

export default App
