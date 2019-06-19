import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router';
import * as allConst from '../commonComponents/Const';
import Header from './Header';
import Page404 from '../commonComponents/Page404';

const Accountant = ({match}) => {
    return (
        <Fragment>
            {allConst.redirect(6)}
            <Header match={match}/>
            <Switch>
                <Redirect exact from={`${match.path}`} to={`${match.path}${allConst.PATH_ACCOUNTANT_USERS}${allConst.PATH_ACCOUNTANT_USERS_ACTUAL}`}/> {/* перенапровление с /accountant */}
                <Redirect exact from={`${match.path}${allConst.PATH_ACCOUNTANT_USERS}`} to={`${match.path}${allConst.PATH_ACCOUNTANT_USERS}${allConst.PATH_ACCOUNTANT_USERS_ACTUAL}`}/> {/* перенапровление с /accountant/users */}
                <Route path={`${match.path}${allConst.PATH_ACCOUNTANT_USERS}${allConst.PATH_ACCOUNTANT_USERS_ACTUAL}`} component={null}/>
                <Route path={`${match.path}${allConst.PATH_ACCOUNTANT_USERS}${allConst.PATH_ACCOUNTANT_USERS_ARCHIVED}`} component={null}/>
                <Route path={`${match.path}${allConst.PATH_ACCOUNTANT_CATALOG_CONTRACTOR}`} component={null}/>
                <Route component={Page404}/>
            </Switch>
        </Fragment>
    )
};

export default Accountant;