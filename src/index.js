import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from "./app/LoginForm";
import Administrator from "./app/Administrator";

//переделать
import App from './app/App/App';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LoginForm}/>
            <Route path='/administrator' component={Administrator}/>
            <Route path='/app' component={App}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
