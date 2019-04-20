import './styles.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

import * as allConst from '../Const';
import {setToken, setAccount} from '../Reducer';

import AlertWarning from '../Alerts/Warning';

const illegalLogin = 'Неверные логин или пароль!';
var errorStatus = {
    status: null,
    statusText: null,
};

class LoginPage extends Component {
    state = {
        warning: false,
    };
    //отправка login и password на сервер
    btnLogin = (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        fetch(`${allConst.IP_HOST}` + '/api/user/login', {
            method: 'POST',
            //headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login: $("#inpLogin").val(), password: $("#inpPassword").val()})
        }).then(function (response) {
            errorStatus.status = response.status;
            errorStatus.statusText = response.statusText;
            return response.json();
        }).then(data => {
            errorStatus.status = null;
            errorStatus.statusText = null;
            this.setState({warning: false});
            this.setData(data);
            this.redirect();
        }).catch((error) => {
            switch (errorStatus.statusText) {
                case 'Illegal login':
                    this.setState({warning: true});
                    break;
                case 'Illegal Password':
                    this.setState({warning: true});
                    break;
                default:
                    break;
            }
        });
    };
    setData = (data) => {
        this.props.setTokenAction(data.sessionToken);
        let account = {
            typeId: data.typeId,
            login: data.account.login,
            password: data.account.password,
            phone: data.account.loginPhone.value,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
        };
        this.props.setAccountAction(account);
    };
    redirect = () =>{
        switch (this.props.user.account.typeId){
            case 2:
                this.props.history.push(`${allConst.PATH_ADMINISTRATOR}`);
                break;
            case 3:
                this.props.history.push(`${allConst.PATH_CHIEFTO}`);
                break;
            case 5:
                this.props.history.push(`${allConst.PATH_CHIEF}`);
                break;
            case 6:
                this.props.history.push(`${allConst.PATH_ACCOUNTANT}`);
                break;
            case 7:
                this.props.history.push(`${allConst.PATH_STOREKEEPER}`);
                break;
            case 8:
                this.props.history.push(`${allConst.PATH_LAWYER}`);
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div className="center-page container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card">
                            <div className="card-header text-center">
                                <label>Авторизация</label>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Логин: </label>
                                    <input type="login" className="form-control" id="inpLogin"/>
                                </div>
                                <div className="form-group">
                                    <label>Пароль: </label>
                                    <input type="password" className="form-control" id="inpPassword"/>
                                </div>
                            </div>
                            {(this.state.warning) ? AlertWarning(illegalLogin) : null}
                            <div className="card-footer text-center">
                                <button
                                    className="btn btn-outline-primary col-md-6"
                                    onClick={this.btnLogin}>Войти
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        user: store.user,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setTokenAction: token => dispatch(setToken(token)),
        setAccountAction: account => dispatch(setAccount(account)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage)