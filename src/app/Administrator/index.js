import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router';
import Header from './Header';
import * as allConst from '../commonComponents/Const';
import AddEditDialogBoxUsers from './Users/AddEditDialogBoxUsers';
import UsersActual from './Users/UsersActual';
import UsersArchive from './Users/UsersArchive';
import Page404 from '../commonComponents/Page404';

const Administrator = ({match}) => {
    return (
        <Fragment>
            {allConst.redirect(2)}
            <Header match={match}/>
            <AddEditDialogBoxUsers/>
            <Switch>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS_ACTUAL}`} component={UsersActual}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS_ARCHIVED}`} component={UsersArchive}/>
                <Route component={Page404}/>
            </Switch>
        </Fragment>
    )
};

export default Administrator;