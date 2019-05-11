import React, {Component, Fragment} from 'react';
import $ from 'jquery';
import UsersList from './UsersList/index';
import {connect} from 'react-redux';
import {setArrayUserArrays} from '../../Reducer';
import {setDialogMode} from '../../../commonComponents/Reducer';
import './styles.css';
import * as allConst from '../../../commonComponents/Const';
import Loading from '../../../commonComponents/Loading/SpinnerCustom/index';
import SpinnerDanger from '../../../commonComponents/Loading/BootstrapBorderSpinnerDangerSmall';
import Footer from '../../../commonComponents/Footer';

class Users extends Component {
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
            headers: {SessionToken: `${allConst.USER_DATA.sessionToken}`},
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
        });
        this.props.setArrayUserArraysInStore(usersLists);
        this.setState({isLoading: false});
    };
    getListsToComponents = () => {
        let components = null;
        if (!!this.props.arrayUserArrays) {
            components = this.props.arrayUserArrays.map(function (item, i) {
                return <UsersList key={i} title={item.title} data={item.data}/>
            });
        }
        return components;
    };
    btnNewUserOnClick = () => {
        this.props.setDialogModeInStore(0);
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
                                    <div className="col-12 col-md-12">
                                        <div className="div_UsersRowBtnNewUser">
                                            <div className="btn-group" role="group"
                                                 aria-label="Button group with nested dropdown">
                                                <button id="btnNewUser" className="btn btn-outline-secondary"
                                                        onClick={this.btnNewUserOnClick}
                                                        data-toggle="modal" data-target="#myModal"
                                                        disabled={this.props.isSetAPIAddUser}>
                                                    <i className="fas fa-user-plus fa-lg"/> Создание нового пользователя
                                                </button>
                                                {this.props.isSetAPIAddUser === true ?
                                                    <button type="button" className="btn btn-outline-secondary "
                                                            disabled={true}>
                                                        <SpinnerDanger/>
                                                    </button> : null}
                                            </div>
                                        </div>
                                        {this.getListsToComponents()}
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </Fragment>
                }
            </Fragment>
        )
    }
}

// приклеиваем данные из store
const mapStateToProps = store => {
    return store.administratorReducer;
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setArrayUserArraysInStore: array => dispatch(setArrayUserArrays(array)),
        setDialogModeInStore: mode => dispatch(setDialogMode(mode)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)