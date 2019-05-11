import React, {Component} from 'react';
import './styles.css';
import TableItem from './TableItem';

class UsersList extends Component {
    getDataToComponents = () => {
        let components = null;
        if (!!this.props.data && this.props.data.length) {
            components = this.props.data.map(function (item, i) {
                return <TableItem key={i} data={item}/>;
            });
        }
        else components = <tr className="emptyData" >Нет данных</tr>;
        return components;
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.title}
                </div>
                <table className="table">
                    <tbody>
                    {this.getDataToComponents()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UsersList;