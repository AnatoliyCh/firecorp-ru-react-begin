import React, { Component } from 'react';
import './styles.css';
import {ButtonStandart} from "../ButtonStandart/ButtonStandart";

class LoginForm extends Component {
    onBtnClickHandler = (e) => {
        e.preventDefault()
    }
    render(){
        return (
            <div className="center-page container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card">
                            <div className="card-header text-center">
                                <label>Вход</label>
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
                                <ButtonStandart inscription="Войти" style="btn btn-outline-primary col-md-6"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginForm;
