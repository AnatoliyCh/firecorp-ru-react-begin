import React, {Component} from 'react';
import './styles.css';

class UsersList extends Component {

    getDataToComponents = () => {
        let components = null;
        if (!!this.props.data && this.props.data.length) {
            components = this.props.data.map(function (item, i) {
                return (
                    <tr key={i}>
                        <td id="tdImage">
                            <img src={require('../../../../static/EmptyUser.jpg')} width="40" height="40" alt=""/>
                        </td>
                        <td id="tdName">{item.lastName} {item.firstName} {item.middleName}</td>
                        <td id="tdLogin"> Логин: {item.account.login !== "" ? item.account.login : "---"}</td>
                        <td id="tdPassword"> Пароль: {item.account.password !== "" ? item.account.password : "---"}</td>
                        <td id="tdLoginPhone"> Телефон: {item.account.loginPhone.value !== "" ? item.account.loginPhone.value : "---"}</td>
                        <td id="tdButton">
                            <button className="font-awesome-button" data-toggle="modal" data-target="#myModal" ><i className="fas fa-user-edit fa-lg"> </i>
                            </button>
                            <button className="font-awesome-button" data-toggle="modal" data-target="#myModal" ><i className="far fa-file-archive fa-lg"> </i>
                            </button>
                        </td>
                    </tr>
                );
            });
        }
        else components = <tr>Нет данных</tr>;
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