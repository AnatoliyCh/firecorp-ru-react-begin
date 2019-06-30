import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import * as allConst from '../../commonComponents/Const'

const Header = ({match}) => (
    <Fragment>
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <Link to={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}`} className="navbar-brand">
                <img src={require('../../../static/HeaderLogo.jpg')} width="30" height="30"
                     className="d-inline-block align-top mr-2" alt=""/>
                Огнезащитная корпорация</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav mr-auto">
                    <Link to={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}`} className="nav-item nav-link">Пользователи</Link>
                    <Link to={`${match.url}/contractor`} className="nav-item nav-link">Контрагенты</Link>
                </div>
                <div className="textRight">
                    <div>{allConst.ROLES.get(allConst.getCurrentUser().typeId)}</div>
                    <div>{allConst.getCurrentUser().lastName} {allConst.getCurrentUser().firstName}</div>
                </div>
                <img className="textRight" src={require('../../../static/EmptyUser.jpg')} width="50" height="50"
                     alt=""/>
            </div>
        </nav>
    </Fragment>
);

export default Header;