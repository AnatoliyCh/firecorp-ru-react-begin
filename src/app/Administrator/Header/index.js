import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import * as allConst from '../../commonComponents/Const'

const Header = ({match}) => (
    <Fragment>
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <Link to={`${match.url}/users`} className="navbar-brand">
                <img src={require('../../../static/HeaderLogo.jpg')} width="30" height="30"
                     className="d-inline-block align-top mr-2" alt=""/>
                Огнезащитная корпорация</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav mr-auto">
                    <Link to={`${match.url}/users`} className="nav-item nav-link">Пользователи</Link>
                    <Link to={`${match.url}/archived`} className="nav-item nav-link">Архив</Link>
                </div>
                <div style={{textAlign: 'right'}}>
                    <div>{allConst.ROLES.get(2)}</div>
                    <div>Xtkjdr kjhih9h.</div>
                </div>
            </div>
        </nav>
    </Fragment>
);

export default Header;