import React, {Component} from 'react';
import $ from "jquery";

import './styles.css';
import * as allConst from '../../commonComponents/Const';
import UsersList from './UsersList';
import {USER_DATA} from "../../commonComponents/Const";

class Users extends Component {
    state = {
        isLoading: false,//загрузка
        lists: null,//итоговый массив групп пользователей
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIUsers();
    };

    getAPIUsers = () => {
        // eslint-disable-next-line
        fetch(`${allConst.IP_HOST}` + '/api/user/list', {
            method: 'GET',
            headers: {'SessionToken': `${USER_DATA.sessionToken}`},
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.sortData(data);
        }).catch((error) => {
            console.log(error.message);
        });
    };
    sortData = (data) => {
        let usersLists = [];//итоговый массив групп пользователей
        allConst.ROLES.forEach(function (itemMap, i) {
            let usersNew = [];//отсортированные и обработанные пользователи
            data.forEach(function (itemData) {
                //сортировка и обработка
                if (i == itemData.typeId) {
                    usersNew.push({
                        login: itemData.account.login,
                        password: itemData.account.password,
                        loginPhone: itemData.account.loginPhone.value,
                        firstName: itemData.firstName,
                        middleName: itemData.middleName,
                        lastName: itemData.lastName,
                        typeId: itemData.typeId,
                    });
                }
            });
            usersLists.push({title: itemMap, data: usersNew});
            usersNew = [];
        });
        this.setState({lists: usersLists});
        this.setState({isLoading: false});
    };

    getListsToComponents = () => {
        let components = null;
        if (!!this.state.lists) {
            components = this.state.lists.map(function (item, i) {
                return <UsersList key={i} title={item.title} data={item.data}/>
            });
        }
        return components;
    };

    render() {
        console.log(this.state.lists);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-12">
                        {this.state.isLoading ? null : this.getListsToComponents()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Users;