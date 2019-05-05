import React, {Component, Fragment} from 'react';

import './styles.css';
import * as allConst from '../../commonComponents/Const';
import Loading from '../../commonComponents/Loading';
import UsersList from './UsersList';

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
        fetch(`${allConst.IP_HOST}${allConst.ALL_USERS_PATH}`, {
            method: 'GET',
            headers: {'SessionToken': `${allConst.USER_DATA.sessionToken}`},
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
                if (i === itemData.typeId) usersNew.push(itemData);//сортировка
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
        return (
            <Fragment>
                {
                    this.state.isLoading ? <Loading/>
                        :
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-12">
                                    {this.getListsToComponents()}
                                </div>
                            </div>
                        </div>
                }
            </Fragment>
        )
    }
}

export default Users;