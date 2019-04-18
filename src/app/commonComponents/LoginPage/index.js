import './styles.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as allConst from '../Const'

class LoginPage extends Component {
    //отправка login и password на сервер
    btnLogin = (e) => {
        e.preventDefault();
        fetch(`${allConst.IP_HOST}` + '/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login: 'root', password: '1234'})
        }).then(function (response) {
            console.log("Ответ: response \n", response);
            return response.json()
        }).then(data => {
            console.log("Ответ: data \n", data);
        }).catch(function (error) {
            console.log('Не вышло... \n', error.message);
        });
        this.props.history.push(`/administrator`);
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
    console.log(store);
    return {
        user: store.user,
    }
};
export default connect(mapStateToProps)(LoginPage)