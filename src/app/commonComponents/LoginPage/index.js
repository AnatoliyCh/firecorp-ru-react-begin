import './styles.css';
import React, {Component} from 'react';
import { connect } from 'react-redux';

class LoginPage extends Component {
    //отправка login и password на сервер
    btnLogin = (e) => {
        e.preventDefault();
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
    console.log(store.token);
    return {
        token: store.token,
    }
};
export default connect(mapStateToProps)(LoginPage)