import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router';
import * as allConst from '../commonComponents/Const';
import Header from './Header';
import Page404 from '../commonComponents/Page404';
import Contractor from "./Contractor";

const Customer = ({match}) => {
    return (
        <Fragment>
            {allConst.redirect(9)}
            <Header match={match}/>
            <Switch>
                <Redirect exact from={`${match.path}`} to={`${match.path}${allConst.PATH_CUSTOMER_FORM}`}/> {/* перенапровление с /customer */}
                <Route path={`${match.path}${allConst.PATH_CUSTOMER_FORM}`} component={Contractor}/>
                <Route path={`${match.path}${allConst.PATH_CUSTOMER_FORM}`} component={null}/>
                <Route component={Page404}/>
            </Switch>
        </Fragment>
    )
};


export default Customer;