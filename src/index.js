import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import $ from 'jquery';
// import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './config/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from "./app/commonComponents/LoginPage";
import Administrator from "./app/Administrator";

import {
    ROOT_DIRECTORY,
    PATH_ADMINISTRATOR,
} from './app/commonComponents/const';


ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route exact path={ROOT_DIRECTORY} component={LoginForm}/>
                <Route path={PATH_ADMINISTRATOR} component={Administrator}/>
            </Switch>
        </Provider>
    </BrowserRouter>
), document.getElementById('root'));