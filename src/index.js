import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {LoginForm} from "./app/components/LoginForm/LoginForm";

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LoginForm}/>
        </Switch>
    </BrowserRouter>), document.getElementById('root'));
