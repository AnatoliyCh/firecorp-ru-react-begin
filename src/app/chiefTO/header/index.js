import React, {Fragment} from 'react'
import {Link} from "react-router-dom";
import './index.css';
import {USER_DATA} from "../../commonComponents/Const";

// const USER_FIO = `${USER_DATA.lastName} ${USER_DATA.firstName[0]}.${USER_DATA.middleName[0]}.`;
const USER_FIO = '1 2 3';

const Header = ({match}) => (
    <Fragment>
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <Link to={`${match.url}/locations`} className="navbar-brand">
                <img src={require("./img/logo.jpg")} width="30" height="30"
                     className="d-inline-block align-top mr-2" alt=""/>
                Огнезащитная корпорация</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav mr-auto">
                    <Link to={`${match.url}/notifications`} className="nav-item nav-link">Уведомления</Link>
                    <Link to={`${match.url}/locations`} className="nav-item nav-link">Локации</Link>
                    <Link to={`${match.url}/technicians`} className="nav-item nav-link">Техники</Link>
                    <Link to={`${match.url}/monthlyto`} className="nav-item nav-link">Ежемесячное ТО</Link>
                    <Link to={`${match.url}/objects`} className="nav-item nav-link">Объекты</Link>
                    <Link to={`${match.url}/calendar`} className="nav-item nav-link">Календарь</Link>
                    <Link to={`${match.url}/map`} className="nav-item nav-link">Карта</Link>
                </div>
                <ul className="navbar-nav">
                    <div className="nav-item">
                        <div className="row">
                            <div className="header-profile_text text-right">
                                <p>Начальник ТО</p>
                                <p>{USER_FIO}</p>
                            </div>
                            <img src={require("./img/logo.jpg")} className="ml-2 mr-2 round-img" width="50" height="50"
                                 alt=""/>
                        </div>
                    </div>
                </ul>
            </div>
        </nav>
    </Fragment>
);

export default Header;