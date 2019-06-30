import React, {Component, Fragment} from 'react';
import UsersList from './UsersList';
import {connect} from 'react-redux';
import {setArrayUserArrays} from '../../Administrator/Reducer';
import {setDialogMode} from '../../commonComponents/Reducer';
import './styles.css';
import * as allConst from '../../commonComponents/Const';
import AddEditDialogBoxUsers from '../../Administrator/Users/AddEditDialogBoxUsers';
import Loading from '../../commonComponents/Loading/SpinnerCustom/index';
import SpinnerDanger from '../../commonComponents/Loading/BootstrapBorderSpinnerDangerSmall';

class UsersActual extends Component {
    state = {
        isLoading: false,//загрузка
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getAPIUsers();
    };

    getAPIUsers = () => {
        fetch(`${allConst.IP_HOST}${allConst.PATH_USERS_ACTUAL}`, {
            method: 'GET',
            headers: {SessionToken: `${allConst.getCurrentUser().sessionToken}`},
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
            data.forEach(function (itemData, iData) {
                if (i === itemData.typeId) usersNew.push(itemData);//сортировка
            });
            usersLists.push({title: itemMap, data: usersNew});
        });

        let othersUsersNew = [];
        data.forEach(function (itemData, iData) { if (!allConst.ROLES.has(+(itemData.typeId))) othersUsersNew.push(itemData); });
        usersLists.sort((a, b) => { return a.data.length - b.data.length; });
        usersLists.push({title: "Другие", data: othersUsersNew});


        let tmp = [];
        usersLists.forEach((itemData, i) => {
            if (itemData.title === "Заказчик") tmp.push(itemData);
        });

        this.props.setArrayUserArraysInStore(tmp);
        this.setState({isLoading: false});
    };
    getListsToComponents = () => {
        let components = null;
        if (!!this.props.arrayUserArrays) {
            components = this.props.arrayUserArrays.map(function (item, i) {
                return <UsersList key={i} title={item.title} data={item.data} indArr={i}/>
            });
        }
        return components;
    };
    btnNewUserOnClick = () => {
        this.props.setDialogModeFunc(0);
    };

    render() {
        return (
            <Fragment>
                {
                    this.state.isLoading ? <Loading/>
                        :
                        <Fragment>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        {this.getListsToComponents()}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                }
            </Fragment>
        )
    }
}

// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        arrayUserArrays: store.administratorReducer.arrayUserArrays,
        isSetAPIAddUser: store.administratorReducer.isSetAPIAddUser,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setArrayUserArraysInStore: array => dispatch(setArrayUserArrays(array)),
        setDialogModeFunc: mode => dispatch(setDialogMode(mode)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersActual)