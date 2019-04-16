import React, {Fragment} from 'react'
import {Link} from "react-router-dom";

const Header = ({match}) => (
    <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={`${match.url}/locations`} className="navbar-brand">
                <img src={require("./img/logo.jpg")} width="30" height="30"
                     className="d-inline-block align-top mr-2" alt=""/>
                Огнезащитная корпорация</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={`${match.url}/notifications`} className="nav-link" href="#">Уведомления</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${match.url}/locations`} className="nav-link" href="#">Локации</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${match.url}/technicians`} className="nav-link" href="#">Техники</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${match.url}/monthlyto`} className="nav-link" href="#">Ежемесячное ТО</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${match.url}/objects`} className="nav-link" href="#">Объекты</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${match.url}/calendar`} className="nav-link" href="#">Календарь</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${match.url}/map`} className="nav-link" href="#">Карта</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </Fragment>
);

export default Header

