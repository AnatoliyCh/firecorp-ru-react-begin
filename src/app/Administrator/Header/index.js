import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import * as allConst from '../../commonComponents/Const'

const Header = ({match}) => (
    <Fragment>
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <Link to={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}${allConst.PATH_ADMINISTRATOR_USERS_ACTUAL}`} className="navbar-brand">
                <img src={require('../../../static/HeaderLogo.jpg')} width="30" height="30"
                     className="d-inline-block align-top mr-2" alt=""/>
                Огнезащитная корпорация</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        {
                            // eslint-disable-next-line
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Пользователи
                            </a>
                        }
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}${allConst.PATH_ADMINISTRATOR_USERS_ACTUAL}`}>Актуальные</a>
                            <a className="dropdown-item" href={`${match.path}${allConst.PATH_ADMINISTRATOR_USERS}${allConst.PATH_ADMINISTRATOR_USERS_ARCHIVED}`}>Архив</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        {
                            // eslint-disable-next-line
                            <a className="nav-link dropdown-toggle" href="#"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Справочники
                            </a>
                        }
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href={`${match.url}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_STREET}`}>Улицы</a>
                            <a className="dropdown-item" href={`${match.url}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_CYTY}`}>Нас. пункты</a>
                            <a className="dropdown-item" href={`${match.url}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_FACILITY}`}>Объекты</a>
                            <a className="dropdown-item" href={`${match.url}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_SERVICEZONE}`}>Локации</a>
                            <a className="dropdown-item" href={`${match.url}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_IMPLEMENTS}`}>Инвентарь</a>
                            <a className="dropdown-item" href={`${match.url}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_COMPONENTTYPE}`}>Комплектующие</a>
                            <a className="dropdown-item" href={`${match.url}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_JOBTYPE}`}>Типы работ</a>
                            <a className="dropdown-item" href={`${match.url}${allConst.PATH_ADMINISTRATOR_CATALOG}${allConst.PATH_ADMINISTRATOR_CATALOG_CONTRACTOR}`}>Контрагенты</a>
                        </div>
                    </li>
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