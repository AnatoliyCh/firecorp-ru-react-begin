import React, {Component} from 'react';

class UsersList extends Component {
    getDataToComponents = () => {
        let components = null;
        if (!!this.props.data && this.props.data.length) {
            components = this.props.data.map(function (item, i) {
                return <li className="list-group-item" key={i}>{item.firstName}</li>;
            });
        }
        else components = <li className="list-group-item text-center">Тут пусто!</li>;
        return components;
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.title}
                </div>
                <ul className="list-group list-group-flush">
                    {this.getDataToComponents()}
                </ul>
            </div>
        )
    }
}

export default UsersList;