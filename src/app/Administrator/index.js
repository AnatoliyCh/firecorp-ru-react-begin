import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router';
import Header from './Header';
import * as allConst from '../commonComponents/Const';
import AddEditDialogBox from './AddEditDialogBox';
import Users from './Users';
import Archived from './ArchivedUsers';
import Page404 from '../commonComponents/Page404';

const Administrator = ({match}) => {
    return (
        <Fragment>
            {allConst.redirect(2)}
            <Header match={match}/>
            <AddEditDialogBox/>
            <Switch>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS_ACTUAL}`} component={Users}/>
                <Route path={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS_DELETED}`} component={Archived}/>
                <Route component={Page404}/>
            </Switch>
        </Fragment>
    )
};

export default Administrator;