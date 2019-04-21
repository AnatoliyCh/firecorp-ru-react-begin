import React, { Component } from 'react';

import './styles.css';

class Users extends Component {

    render() {
        return (
            <div className="card hh">
                <div className="card-header">
                    Featured
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
        )
    }
}

export default Users;