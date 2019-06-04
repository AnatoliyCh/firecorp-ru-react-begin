import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router';
import Header from './Header';
import * as allConst from '../commonComponents/Const';
import UsersActual from './Users/UsersActual';
import UsersArchive from './Users/UsersArchive';
import Page404 from '../commonComponents/Page404';
import Street from "./catalog/Street";
import City from "./catalog/City";
import Implements from "./catalog/Implements";
import ComponentType from "./catalog/ComponentType";
import JobType from "./catalog/JobType";



const Administrator = ({match}) => {
    return (
        <Fragment>
            {allConst.redirect(2)}
            <Header match={match}/>
            <Switch>
                <Redirect exact from={`${match.path}`} to={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}${allConst.PATH_ADMINISTRATOR_USERS_ACTUAL}`}/> {/* перенапровление с /administrator */}
                <Redirect exact from={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}`} to={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}${allConst.PATH_ADMINISTRATOR_USERS_ACTUAL}`}/> {/* перенапровление с /administrator/users */}
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}${allConst.PATH_ADMINISTRATOR_USERS_ACTUAL}`} component={UsersActual}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}${allConst.PATH_ADMINISTRATOR_USERS_ARCHIVED}`} component={UsersArchive}/>
                <Redirect exact from={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}`} to={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}${allConst.PATH_ADMINISTRATOR_CATALOG_STREET}`}/> {/* перенапровление с /administrator/catalog */}
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_STREET}`} component={Street}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_CYTY}`} component={City}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_FACILITY}`} component={UsersArchive}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_SERVICEZONE}`} component={UsersArchive}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_IMPLEMENTS}`} component={Implements}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_COMPONENTTYPE}`} component={ComponentType}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_JOBTYPE}`} component={JobType}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_CONTRACTOR}`} component={UsersArchive}/>
                <Route component={Page404}/>
            </Switch>
        </Fragment>
    )
};

export default Administrator;