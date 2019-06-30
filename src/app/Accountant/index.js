import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router';
import * as allConst from '../commonComponents/Const';
import Header from './Header';
import Page404 from '../commonComponents/Page404';
import Contractor from './Contractor';
import Users from './UsersActual';

const Accountant = ({match}) => {
    return (
        <Fragment>
            {allConst.redirect(6)}
            <Header match={match}/>
            <Switch>
                <Redirect exact from={`${match.path}`} to={`${match.path}${allConst.PATH_ACCOUNTANT_USERS}`}/> {/* перенапровление с /accountant */}
                <Route path={`${match.path}${allConst.PATH_ACCOUNTANT_USERS}`} component={Users}/>
                <Route path={`${match.path}${allConst.PATH_ACCOUNTANT_CATALOG_CONTRACTOR}`} component={Contractor}/>
                <Route component={Page404}/>
            </Switch>
        </Fragment>
    )
};

export default Accountant;