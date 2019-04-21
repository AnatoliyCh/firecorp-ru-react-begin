import React, {Component} from 'react';
import $ from "jquery";

import './styles.css';
import * as allConst from '../../commonComponents/Const';
import UsersList from './UsersList';
import {USER_DATA} from "../../commonComponents/Const";

var usersLists = [];

class Users extends Component {
    state  = {
        lists: null,
    };
    componentDidMount() {
        this.getAPIUsers();
    };

    getAPIUsers = () => {
        // eslint-disable-next-line
        fetch(`${allConst.IP_HOST}` + '/api/user/list', {
            method: 'GET',
            headers: {'SessionToken': `${USER_DATA.sessionToken}`},
        }).then(function (response) {
            //console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            this.sortData(data);
        }).catch((error) => {
            console.log(error.message);
        });
    };
    sortData = (data) => {
        allConst.ROLES.forEach(function (itemMap, i, arrMap) {
            let usersNew = [];//отсортированные и обработанные пользователи
            data.forEach(function (itemData, j, arr) {
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
        console.log(usersLists);
    };

    getLists = () => {
        console.log("tttt");
        var componentLists = null;
        if (usersLists.length){
            componentLists = usersLists.map(function (item) {
                return <UsersList title={item.title} data={item.data}/>
            });
        }
        else componentLists = <UsersList title={allConst.ROLES.get(2)}/>;
        this.setState({lists: componentLists});
        return componentLists;
    };

    render() {
        const {lists} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-12">
                        {lists == null ? null : lists}
                        {/*<UsersList title={allConst.ROLES.get(2)}/>*/}
                        {/*<UsersList title={allConst.ROLES.get(3)}/>*/}
                        {/*<UsersList title={allConst.ROLES.get(4)}/>*/}
                        {/*<UsersList title={allConst.ROLES.get(5)}/>*/}
                        {/*<UsersList title={allConst.ROLES.get(6)}/>*/}
                        {/*<UsersList title={allConst.ROLES.get(7)}/>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default Users;