import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router';
import Header from './Header';
import AddEditDialogBox from './AddEditDialogBox';
import Users from './Users';
import Archived from './Archived';
import Page404 from '../commonComponents/Page404';

const Administrator = ({match}) => {
    return (
        <Fragment>
            <Header match={match}/>
            <AddEditDialogBox/>
            <Switch>
                <Route path={`${match.path}/users`} component={Users}/>
                <Route path={`${match.path}/archived`} component={Archived}/>
                <Route component={Page404}/>
            </Switch>
        </Fragment>
    )
};

export default Administrator;