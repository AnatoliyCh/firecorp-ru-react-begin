import React from 'react';
import './styles.css';

const Footer = () => {
    return (
        <nav className="navbar sticky-bottom navbar-light bg-light" id="footer">
            <a className="navbar-brand btn-github" href="https://github.com/AnatoliyCh/web_client_group/tree/dev" >
                <button className="btn btn-sm btn-outline-secondary" type="button" >
                    <i className="fab fa-github fa-lg" />
                </button>
            </a>
        </nav>
    )
};

export default Footer