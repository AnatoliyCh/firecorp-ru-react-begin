import React, {Component} from 'react';
import $ from 'jquery';
import './styles.css';
import * as allConst from '../Const';
import AlertWarning from '../Alerts/Warning';
import SpinnerDanger from '../Loading/BootstrapBorderSpinnerDangerDefault';

const illegalLogin = 'Неверные логин или пароль!';
var errorStatus = {
    status: null,
    statusText: null,
};

class LoginPage extends Component {
    state = {
        warning: false,//неверные данные
        isLoading: false,//получение данных из api
    };
    //отправка login и password на сервер
    btnLogin = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});
        this.setState({warning: false});
        fetch(`${allConst.IP_HOST}${allConst.PATH_API_USER_LOGIN}`, {
            method: 'POST',
            body: JSON.stringify({login: $("#inpLogin").val(), password: $("#inpPassword").val()})
        }).then(function (response) {
            errorStatus.status = response.status;
            errorStatus.statusText = response.statusText;
            return response.json();
        }).then(data => {
            errorStatus.status = null;
            errorStatus.statusText = null;
            allConst.setCurrentUser(data);//добавление данных в LocalStorage
            this.setState({isLoading: false});
            allConst.redirect();
        }).catch((error) => {
            this.setState({isLoading: false});
            switch (errorStatus.statusText) {
                case 'Not Found':
                    this.setState({warning: true});
                    break;
                case 'Illegal Password':
                    this.setState({warning: true});
                    break;
                default:
                    console.log(error);
                    break;
            }
        });
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
                            {(this.state.isLoading) ? <div className="spinnerDanger"> <SpinnerDanger /> </div> : null}
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

export default LoginPage;