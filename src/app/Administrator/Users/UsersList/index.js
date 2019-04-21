import React, {Component} from 'react';

import * as allConst from "../../../commonComponents/Const";

class UsersList extends Component {

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.title}
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

export default UsersList;